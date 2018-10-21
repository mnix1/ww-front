import React from 'react';
import {connect} from 'react-redux';
import Task from "../../../../component/task/Task";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../../redux/reducer/rival";
import TaskDescription from "../../component/TaskDescription";
import ActiveMembers from "../../component/ActiveMembers";
import {isTeamMemberWisie} from "../../../../util/heroHelper";
import {RIVAL_CONTENT_STATUS_ANSWERING, RIVAL_TYPE_BATTLE, RIVAL_TYPE_CHALLENGE} from "../../../../util/rivalHelper";
import Profiles from "../../component/Profiles";
import RivalPageAnsweringTaskNotActive from "./RivalPageAnsweringTaskNotActive";
import {rivalScreen} from "../../../../util/screenHelper";

class RivalPageAnswering extends React.PureComponent {

    get imgHeight() {
        const {screen} = this.props;
        return screen.rivalImgHeight;
    }

    handleAnswerClick = (answerId) => {
        const {task, onAnswerClick, questionIdAnswerIdMap, communication} = this.props;
        communication.sendAnswer(answerId);
        onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
    };

    renderTask = (onAnswerClick, contentHeightCalculator) => {
        const {task, battle, onSkipAnimationChange, questionIdSkipAnimationMap, screen} = this.props;
        return <Task
            contentHeightCalculator={contentHeightCalculator}
            className={battle ? this.addTransitionClass : ''}
            screen={rivalScreen({screen, offsetHeight: screen.fontSizeRem * 2})}
            skipAnimation={questionIdSkipAnimationMap[task.id] === true}
            onSkipAnimationChange={() => onSkipAnimationChange({...questionIdSkipAnimationMap, [task.id]: true})}
            question={task}
            answers={task.answers}
            onAnswerClick={(answerId) => onAnswerClick(answerId)}
        />;
    };

    renderTaskActive() {
        return <div className='width100 height100 absolute'>
            <ActiveMembers>
                {this.renderWarTaskDescription()}
            </ActiveMembers>
            {this.renderTask(this.handleAnswerClick)}
        </div>;
    }

    renderContent() {
        const {battle, team, activeIndex} = this.props;
        if (battle) {
            return <div className='width100 height100 absolute'>
                <Profiles className='absolute'/>
                {this.renderTask(this.handleAnswerClick)}
            </div>;
        }
        const activeMember = team[activeIndex];
        const isMyWisieAnswering = isTeamMemberWisie(activeMember);
        return isMyWisieAnswering
            ? <RivalPageAnsweringTaskNotActive
                imgHeight={this.imgHeight}
                activeMember={activeMember}
                renderTaskFunction={this.renderTask}
                taskDescription={this.renderWarTaskDescription()}
            />
            : this.renderTaskActive();
    }

    get addTransitionClass() {
        const {status} = this.props;
        return status !== RIVAL_CONTENT_STATUS_ANSWERING ? 'answeringToAnswered' : '';
    }

    renderWarTaskDescription() {
        return <div className='justifyStart flexColumn'>{this.renderTaskDescription()}</div>
    }

    renderTaskDescription() {
        const {battle, challenge, score,task, taskCount, screen, endAnsweringInterval} = this.props;
        return <TaskDescription
            task={task}
            renderScore={challenge}
            score={score}
            taskCount={taskCount}
            renderTaskPoints={battle}
            renderTaskCount={battle}
            renderTimer={true}
            interval={endAnsweringInterval}
            small={!screen.isBigScreen}
            className={`justifyCenter flexColumn pageHeader ${battle ? this.addTransitionClass : ''}`}
        />;
    }

    render() {
        // console.log('RivalPageAnswering render');
        const {battle} = this.props;
        return <div
            className={`pageContent warPageAnswering ${!battle ? this.addTransitionClass : ''}`}>
            {battle && this.renderTaskDescription()}
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => {
        const {type, taskCount, status, score, task, team, activeIndex, endAnsweringInterval} = state.rival.content;
        const battle = type === RIVAL_TYPE_BATTLE;
        const challenge = type === RIVAL_TYPE_CHALLENGE;
        return {
            battle,
            challenge,
            score,
            task,
            taskCount,
            team,
            endAnsweringInterval,
            activeIndex,
            status,
            communication: state.socket.rivalCommunication,
            screen: state.screen,
            questionIdAnswerIdMap: state.rival.questionIdAnswerIdMap,
            questionIdSkipAnimationMap: state.rival.questionIdSkipAnimationMap,
        }
    },
    (dispatch) => ({
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap)),
        onSkipAnimationChange: questionIdSkipAnimationMap => dispatch(questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap))
    })
)(RivalPageAnswering);
