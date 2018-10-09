import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {TEXT_ANIMATION} from "../../util/taskRenderer";
import TaskObjectGroup from "./TaskObjectGroup";
import {prepareQuestionTiles} from "./objectsTaskQuestion";
import {prepareAnswerTiles} from "./objectsTaskAnswer";
import {prepareAnimationDescription, prepareAnimationTiles} from "./objectsTaskAnimation";
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
        style: PropTypes.object,
        className: PropTypes.string,
        contentHeightCalculator: PropTypes.func,
    };

    static defaultProps = {
        canChangeAnswer: false,
        onAnswerClick: _.noop,
        onSkipAnimationChange: _.noop
    };

    renderTask() {
        const {onAnswerClick, contentHeightCalculator, answerId, screen} = this.props;
        return <TaskObjectGroup
            contentHeightCalculator={contentHeightCalculator}
            questionObjects={prepareQuestionTiles(this)}
            answerObjects={prepareAnswerTiles(this)}
            onObjectClick={(e) => !_.isNil(e.id) && !answerId && onAnswerClick(e.id)}
            screen={screen}
        />;
    }

    renderAnimation() {
        const {onSkipAnimationChange, screen, contentHeightCalculator} = this.props;
        return <AnimationObjectGroup
            contentHeightCalculator={contentHeightCalculator}
            onObjectClick={() => onSkipAnimationChange(true)}
            questionObjects={prepareAnimationDescription(this)}
            animationObjects={prepareAnimationTiles(this)}
            screen={screen}
        />;
    }

    shouldShowAnimation() {
        const {question, skipAnimation} = this.props;
        return question.questionRenderer === TEXT_ANIMATION && !skipAnimation;
    }

    renderContent() {
        if (this.shouldShowAnimation()) {
            return this.renderAnimation();
        }
        return this.renderTask();
    }

    render() {
        const {style, className} = this.props;
        return <div className={`${className ? className : ''} task`} style={{...style}}>
            {this.renderContent()}
        </div>
    }
}