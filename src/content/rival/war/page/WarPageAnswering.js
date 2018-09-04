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

class WarPageAnswering extends React.PureComponent {

    get imgHeight() {
        const {screen, imgHeight} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        if (screen.isSmallHeight || screen.moreHeightThanWidth) {
            return 50;
        }
        return 70;
    }

    renderTaskActive() {
        const {content, onAnswerClick, rivalType, onSkipAnimationChange, questionIdAnswerIdMap, questionIdSkipAnimationMap, screen, communication} = this.props;
        const {task, correctAnswerId} = content;
        return <div className='width100 height100 absolute'>
            <ActiveMembers content={content} className='absolute'/>
            <Task
                screen={screen}
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
                    communication.send(`${rivalType}_^_ANSWER` + JSON.stringify({answerId}));
                    onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
                }}
            />
        </div>;
    }

    renderTaskNotActive(activeMember) {
        const {content, screen} = this.props;
        const {task, opponentTeam, opponentActiveIndex} = content;
        const opponentActiveMember = opponentTeam[opponentActiveIndex];
        const imgHeight = this.imgHeight;
        return <div className='width100 height100 absolute'>
            <div className='width100 justifyBetween absolute'>
                <div>
                    <Wisie imgHeight={imgHeight} {...activeMember.content}
                           renderDetails={true} isOwned={true}>
                        <WisieActions actions={content.wisieActions}/>
                    </Wisie>
                </div>
                <div>
                    {isTeamMemberWisie(opponentActiveMember)
                        ? <Wisie imgHeight={imgHeight} {...opponentActiveMember.content} renderDetails={true}
                                 isOwned={true}>
                            <WisieActions actions={content.opponentWisieActions}/>
                        </Wisie>
                        : <Profile imgHeight={imgHeight + 4} {...opponentActiveMember.content}/>}
                </div>
            </div>
            <Task
                screen={{...screen, contentHeight: screen.contentHeight - 40}}
                skipAnimation={true}
                question={task}
                answers={task.answers}
            />
        </div>;
    }

    render() {
        const {content} = this.props;
        const activeMember = content.team[content.activeIndex];
        const isMyWisieAnswering = isTeamMemberWisie(activeMember);
        return <div className='pageContent warPageAnswering'>
            <TaskDescription
                content={content}
                renderTaskPoints={false}
                renderTaskCount={false}
                className='justifyCenter flexColumn pageHeader'
            >
                <div>{`${getText(TEXT_TIME)}: `}<Timer from={content.endAnsweringInterval}/></div>
            </TaskDescription>
            {isMyWisieAnswering ? this.renderTaskNotActive(activeMember) : this.renderTaskActive()}
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
        rivalType: state.rival.rivalType,
        questionIdAnswerIdMap: state.rival.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.rival.questionIdSkipAnimationMap,
    }),
    (dispatch) => ({
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap)),
        onSkipAnimationChange: questionIdSkipAnimationMap => dispatch(questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap))
    })
)(WarPageAnswering);
