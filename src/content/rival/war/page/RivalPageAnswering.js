import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Task from "../../../../component/task/Task";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../../redux/reducer/rival";
import TaskDescription from "../../component/TaskDescription";
import Timer from "../../../../component/timer/Timer";
import {getText, TEXT_TIME} from "../../../../lang/langText";
import ActiveMembers from "../../component/ActiveMembers";
import Wisie from "../../../../component/wisie/Wisie";
import Profile from "../../../../component/profile/Profile";
import WisieActions from "../../../../component/wisie/WisieActions";
import {isTeamMemberWisie} from "../../../../util/heroHelper";
import {remToPixels} from "../../../../util/fontHelper";
import {RIVAL_TYPE_BATTLE} from "../../../../util/rivalHelper";
import Profiles from "../../component/Profiles";
import {rivalScreen} from "../../../../util/screenHelper";

class RivalPageAnswering extends React.PureComponent {

    get imgHeight() {
        const {screen, imgHeight} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.wisieImgHeight - 10;
    }

    renderTask() {
        const {content, onAnswerClick, onSkipAnimationChange, questionIdAnswerIdMap, questionIdSkipAnimationMap, screen, communication} = this.props;
        const {task, correctAnswerId} = content;
        return <Task
            screen={rivalScreen({screen, offsetHeight: remToPixels(1.6)})}
            skipAnimation={!_.isNil(correctAnswerId) || questionIdSkipAnimationMap[task.id] === true}
            onSkipAnimationChange={() => {
                if (!_.isNil(correctAnswerId)) {
                    return;
                }
                onSkipAnimationChange({...questionIdSkipAnimationMap, [task.id]: true})
            }}
            question={task}
            answers={task.answers}
            onAnswerClick={(answerId) => {
                if (!_.isNil(correctAnswerId)) {
                    return;
                }
                communication.sendAnswer(content.type, answerId);
                onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
            }}
        />
    }

    renderTaskActive() {
        const {content} = this.props;
        return <div className='width100 height100 absolute'>
            <ActiveMembers content={content}/>
            {this.renderTask()}
        </div>;
    }

    renderTaskNotActive(activeMember) {
        const {content, screen, questionIdSkipAnimationMap, onSkipAnimationChange} = this.props;
        const {task, correctAnswerId, opponentTeam, opponentActiveIndex} = content;
        const opponentActiveMember = opponentTeam && opponentTeam[opponentActiveIndex];
        const imgHeight = this.imgHeight;
        return <div className='width100 height100 absolute'>
            <div className='width100 justifyBetween absolute'>
                <div>
                    <Wisie imgHeight={imgHeight} {...activeMember.content}
                           renderDetails={true} isOwned={true}>
                        <WisieActions actions={content.wisieActions}/>
                    </Wisie>
                </div>
                {content.opponent && <div>
                    {isTeamMemberWisie(opponentActiveMember)
                        ? <Wisie imgHeight={imgHeight} {...opponentActiveMember.content} renderDetails={true}
                                 isOwned={true}>
                            <WisieActions actions={content.opponentWisieActions}/>
                        </Wisie>
                        : <Profile imgHeight={imgHeight + remToPixels(0.85)} {...opponentActiveMember.content}/>}
                </div>}
            </div>
            <Task
                onSkipAnimationChange={() => {
                    if (!_.isNil(correctAnswerId)) {
                        return;
                    }
                    onSkipAnimationChange({...questionIdSkipAnimationMap, [task.id]: true})
                }}
                screen={rivalScreen({screen, offsetHeight: remToPixels(1.6)})}
                skipAnimation={!_.isNil(correctAnswerId) || questionIdSkipAnimationMap[task.id] === true}
                question={task}
                answers={task.answers}
            />
        </div>;
    }

    renderContent() {
        const {content} = this.props;
        if (content.type === RIVAL_TYPE_BATTLE) {
            return <div className='width100 height100 absolute'>
                <Profiles content={content} className='absolute'/>
                {this.renderTask()}
            </div>;
        }
        const activeMember = content.team[content.activeIndex];
        const isMyWisieAnswering = isTeamMemberWisie(activeMember);
        return isMyWisieAnswering ? this.renderTaskNotActive(activeMember) : this.renderTaskActive();
    }

    render() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageContent warPageAnswering'>
            <TaskDescription
                content={content}
                renderTaskPoints={battle}
                renderTaskCount={battle}
                small={screen.isSmallHeight}
                className='justifyCenter flexColumn pageHeader'
            >
                <div>{screen.isSmallHeight ? '' : `${getText(TEXT_TIME)}: `}<Timer from={content.endAnsweringInterval}/>
                </div>
            </TaskDescription>
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socket: state.socket.socket,
        // opponentProfile: state.war.opponent,
        profile: state.profile.profile,
        content: state.rival.content,
        questionIdAnswerIdMap: state.rival.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.rival.questionIdSkipAnimationMap,
    }),
    (dispatch) => ({
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap)),
        onSkipAnimationChange: questionIdSkipAnimationMap => dispatch(questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap))
    })
)(RivalPageAnswering);
