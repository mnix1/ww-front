import React from 'react';
import styles from './styles.css';
import PropTypes from "prop-types";
import {TEXT_ANIMATION_TASK_RENDERER} from "../../util/taskRenderer";
import TaskObjectGroup from "./TaskObjectGroup";
import {prepareQuestionTiles} from "./objectsTaskQuestion";
import {prepareAnswerTiles} from "./objectsTaskAnswer";
import {prepareAnimationTiles} from "./objectsTaskAnimation";

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
        header: PropTypes.node
    };

    static defaultProps = {
        canChangeAnswer: false,
    };

    renderTaskHeader() {
        const {answerId, canChangeAnswer, header} = this.props;
        if (canChangeAnswer || !answerId) {
            return header;
        }
        return null;
    }

    renderTask() {
        const {onAnswerClick, answerId, screen, canChangeAnswer} = this.props;
        return <TaskObjectGroup
            objects={prepareQuestionTiles(this).concat(prepareAnswerTiles(this))}
            onObjectClick={(e) => e.id && (canChangeAnswer || !answerId) && onAnswerClick(e.id)}
            screen={screen}
        />;
    }

    renderAnimation() {
        const {onSkipAnimationChange, screen} = this.props;
        return <TaskObjectGroup
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
        return <div className={styles.rival}>
            {this.renderTaskHeader()}
            {this.renderContent()}
        </div>
    }
}