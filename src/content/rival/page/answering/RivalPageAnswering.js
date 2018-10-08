import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
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
        const {content, onAnswerClick, questionIdAnswerIdMap, communication} = this.props;
        const {task} = content;
        communication.sendAnswer(answerId);
        onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
    };

    renderTask = (onAnswerClick) => {
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
    };

    renderTaskActive() {
        const {content} = this.props;
        return <div className='width100 height100 absolute'>
            <ActiveMembers content={content}>
                {this.renderWarTaskDescription()}
            </ActiveMembers>
            {this.renderTask(this.handleAnswerClick)}
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
        const {content} = this.props;
        return content.status !== RIVAL_CONTENT_STATUS_ANSWERING ? 'answeringToAnswered' : '';
    }

    renderWarTaskDescription() {
        const {screen} = this.props;
        return <div className='justifyStart flexColumn'
                    style={{width: screen.isSmallHeight ? '10rem' : '20rem'}}>{this.renderTaskDescription()}</div>
    }

    renderTaskDescription() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <TaskDescription
            task={content.task}
            taskCount={content.taskCount}
            renderTaskPoints={battle}
            renderTaskCount={battle}
            small={screen.isSmallHeight}
            className={`justifyCenter flexColumn pageHeader ${battle ? this.addTransitionClass : ''}`}
        />;
    }

    render() {
        console.log('RivalPageAnswering render');
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
        communication: state.socket.rivalCommunication,
        screen: state.screen,
        content: state.rival.content,
        questionIdAnswerIdMap: state.rival.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.rival.questionIdSkipAnimationMap,
    }),
    (dispatch) => ({
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap)),
        onSkipAnimationChange: questionIdSkipAnimationMap => dispatch(questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap))
    })
)(RivalPageAnswering);
