import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {TEXT_ANIMATION_TASK_RENDERER} from "../../util/taskRenderer";
import TaskObjectGroup from "./TaskObjectGroup";
import {prepareQuestionTiles} from "./objectsTaskQuestion";
import {prepareAnswerTiles} from "./objectsTaskAnswer";
import {prepareAnimationTiles} from "./objectsTaskAnimation";
import _ from 'lodash';
import AnimationObjectGroup from "./AnimationObjectGroup";

export default class Task extends React.PureComponent {

    static propTypes = {
        screen: PropTypes.object,
        question: PropTypes.object,
        answers: PropTypes.array,
        answerId: PropTypes.number,
        correctAnswerId: PropTypes.number,
        onAnswerClick: PropTypes.func,
        skipAnimation: PropTypes.bool,
        onSkipAnimationChange: PropTypes.func,
        canChangeAnswer: PropTypes.bool,
        header: PropTypes.node,
        style: PropTypes.object,
    };

    static defaultProps = {
        canChangeAnswer: false,
    };

    renderTaskHeader() {
        const {header} = this.props;
        return header;
    }

    renderTask() {
        const {onAnswerClick, answerId, screen, canChangeAnswer} = this.props;
        return <TaskObjectGroup
            questionObjects={prepareQuestionTiles(this)}
            answerObjects={prepareAnswerTiles(this)}
            onObjectClick={(e) => !_.isNil(e.id) && (canChangeAnswer || !answerId) && onAnswerClick(e.id)}
            screen={screen}
        />;
    }

    renderAnimation() {
        const {onSkipAnimationChange, screen} = this.props;
        return <AnimationObjectGroup
            onObjectClick={() => onSkipAnimationChange(true)}
            objects={prepareAnimationTiles(this)}
            screen={screen}
        />;
    }

    shouldShowAnimation() {
        const {question, skipAnimation} = this.props;
        return question.taskRenderer === TEXT_ANIMATION_TASK_RENDERER && !skipAnimation;
    }

    renderContent() {
        if (this.shouldShowAnimation()) {
            return this.renderAnimation();
        }
        return this.renderTask();
    }

    render() {
        const {style, screen} = this.props;
        return <div className='task' style={{height: screen.contentHeight,...style}}>
            {this.renderTaskHeader()}
            <div className='taskContent' >{this.renderContent()}</div>
        </div>
    }
}