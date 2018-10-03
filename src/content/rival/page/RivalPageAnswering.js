import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Task from "../../../component/task/Task";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../redux/reducer/rival";
import TaskDescription from "../component/TaskDescription";
import Timer from "../../../component/timer/Timer";
import {getText, TEXT_TIME} from "../../../lang/langText";
import ActiveMembers from "../component/ActiveMembers";
import Wisie from "../../../component/wisie/Wisie";
import Profile from "../../../component/profile/Profile";
import WisieActions from "../../../component/wisie/WisieActions";
import {isTeamMemberWisie} from "../../../util/heroHelper";
import {remToPixels} from "../../../util/fontHelper";
import {RIVAL_CONTENT_STATUS_ANSWERING, RIVAL_TYPE_BATTLE} from "../../../util/rivalHelper";
import Profiles from "../component/Profiles";
import {rivalScreen} from "../../../util/screenHelper";
import AvailableSkills from "../../../component/skill/AvailableSkills";
import {SKILL_KIDNAPPING, SKILL_WATER_PISTOL} from "../../../util/skillHelper";

class RivalPageAnswering extends React.PureComponent {

    get imgHeight() {
        const {screen, imgHeight} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.wisieImgHeight - 10;
    }

    handleAnswerClick = (answerId) => {
        const {content, onAnswerClick, questionIdAnswerIdMap, communication} = this.props;
        const {task} = content;
        communication.sendAnswer(answerId);
        onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
    };

    handleHintClick = (answerId) => {
        const {communication} = this.props;
        communication.sendHint(answerId);
    };

    handleWaterPistolClick = () => {
        const {communication} = this.props;
        communication.sendWaterPistol();
    };

    handleKidnappingClick = () => {
        const {communication} = this.props;
        communication.sendKidnapping();
    };

    renderTask(onAnswerClick) {
        const {content, onSkipAnimationChange, questionIdSkipAnimationMap, screen} = this.props;
        const {task, type, correctAnswerId} = content;
        const battle = type === RIVAL_TYPE_BATTLE;
        return <Task
            className={battle ? this.addTransitionClass : ''}
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
                onAnswerClick(answerId);
            }}
        />;
    }

    renderTaskActive() {
        const {content} = this.props;
        return <div className='width100 height100 absolute'>
            <ActiveMembers content={content}>
                {this.renderWarTaskDescription()}
            </ActiveMembers>
            {this.renderTask(this.handleAnswerClick)}
        </div>;
    }

    renderTaskNotActive(activeMember) {
        const {content} = this.props;
        const {opponentTeam, opponentActiveIndex} = content;
        const opponentActiveMember = opponentTeam && opponentTeam[opponentActiveIndex];
        const imgHeight = this.imgHeight;
        return <div className='width100 height100 absolute'>
            <div className='width100 justifyBetween absolute'>
                <div style={{width: '12rem'}}>
                    <Wisie
                        className='justifyStart'
                        detailsClassName='justifyStart'
                        nearImgChildren={<WisieActions
                            className='textAlignStart paddingLeftRem'
                            actions={content.wisieActions}/>}
                        imgHeight={imgHeight}
                        {...activeMember.content}
                        renderDetails={true}/>
                    <AvailableSkills className='justifyStart' skills={content.skills} skillClickHandlers={{
                      [SKILL_WATER_PISTOL]: this.handleWaterPistolClick,
                      [SKILL_KIDNAPPING]: this.handleKidnappingClick,
                    }}/>
                </div>
                {this.renderWarTaskDescription()}
                <div style={{width: '12rem'}}>
                    {content.opponent && (isTeamMemberWisie(opponentActiveMember)
                        ? [<Wisie
                            key='w'
                            detailsClassName='justifyEnd'
                            nearImgChildrenAfter={false}
                            nearImgChildren={<WisieActions
                                className='textAlignEnd paddingRightRem'
                                actions={content.opponentWisieActions}/>}
                            className='pointer justifyEnd'
                            onClick={this.handleWaterPistolClick}
                            imgHeight={imgHeight}
                            {...opponentActiveMember.content}
                            renderDetails={true}/>,
                            <AvailableSkills key='a' className='justifyEnd' skills={content.opponentSkills}/>]
                        : <Profile className='justifyEnd'
                                   imgHeight={imgHeight + remToPixels(0.85)} {...opponentActiveMember.content}/>)}
                </div>
            </div>
            {this.renderTask(this.handleHintClick)}
        </div>;
    }

    renderContent() {
        const {content} = this.props;
        if (content.type === RIVAL_TYPE_BATTLE) {
            return <div className='width100 height100 absolute'>
                <Profiles content={content} className='absolute'/>
                {this.renderTask(this.handleAnswerClick)}
            </div>;
        }
        const activeMember = content.team[content.activeIndex];
        const isMyWisieAnswering = isTeamMemberWisie(activeMember);
        return isMyWisieAnswering ? this.renderTaskNotActive(activeMember) : this.renderTaskActive();
    }

    get addTransitionClass() {
        const {content} = this.props;
        return content.status !== RIVAL_CONTENT_STATUS_ANSWERING ? 'answeringToAnswered' : '';
    }

    renderWarTaskDescription(){
        const {screen} = this.props;
        return <div className='justifyStart flexColumn'
             style={{width: screen.isSmallHeight ? '10rem' : '20rem'}}>{this.renderTaskDescription()}</div>
    }

    renderTaskDescription() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <TaskDescription
            content={content}
            renderTaskPoints={battle}
            renderTaskCount={battle}
            small={screen.isSmallHeight}
            className={`justifyCenter flexColumn pageHeader ${battle ? this.addTransitionClass : ''}`}
        >
            <div>{screen.isSmallHeight ? '' : `${getText(TEXT_TIME)}: `}<Timer from={content.endAnsweringInterval}/>
            </div>
        </TaskDescription>
    }

    render() {
        const {content} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div
            className={`pageContent warPageAnswering ${!battle ? this.addTransitionClass : ''}`}>
            {battle && this.renderTaskDescription()}
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socket: state.socket.socket,
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
