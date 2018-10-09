import React from 'react';
import {connect} from 'react-redux';
import Task from "../../../../component/task/Task";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../../redux/reducer/rival";
import TaskDescription from "../../component/TaskDescription";
import ActiveMembers from "../../component/ActiveMembers";
import {isTeamMemberWisie} from "../../../../util/heroHelper";
import {remToPixels} from "../../../../util/fontHelper";
import {RIVAL_CONTENT_STATUS_ANSWERING, RIVAL_TYPE_BATTLE} from "../../../../util/rivalHelper";
import Profiles from "../../component/Profiles";
import {rivalScreen} from "../../../../util/screenHelper";
import RivalPageAnsweringTaskNotActive from "./RivalPageAnsweringTaskNotActive";

class RivalPageAnswering extends React.PureComponent {

    get imgHeight() {
        const {screen, imgHeight} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.wisieImgHeight - 10;
    }

    handleAnswerClick = (answerId) => {
        const {task, onAnswerClick, questionIdAnswerIdMap, communication} = this.props;
        communication.sendAnswer(answerId);
        onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
    };

    renderTask = (onAnswerClick) => {
        const {task, battle, onSkipAnimationChange, questionIdSkipAnimationMap, screen} = this.props;
        return <Task
            className={battle ? this.addTransitionClass : ''}
            screen={rivalScreen({screen, offsetHeight: remToPixels(1.6)})}
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
        const {screen} = this.props;
        return <div className='justifyStart flexColumn'
                    style={{width: screen.isSmallHeight ? '10rem' : '20rem'}}>{this.renderTaskDescription()}</div>
    }

    renderTaskDescription() {
        const {battle, task, taskCount, screen, endAnsweringInterval} = this.props;
        return <TaskDescription
            task={task}
            taskCount={taskCount}
            renderTaskPoints={battle}
            renderTaskCount={battle}
            renderTimer={true}
            interval={endAnsweringInterval}
            small={screen.isSmallHeight}
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
        const {type, taskCount, status, task, team, activeIndex, endAnsweringInterval} = state.rival.content;
        const battle = type === RIVAL_TYPE_BATTLE;
        return {
            battle,
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
