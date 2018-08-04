import React from 'react';
import {connect} from 'react-redux';
import Task from "../../../component/task/Task";
import {
    answerIdChanged,
    skipAnimationChanged, statusChanged, summaryIdChanged
} from "../../../redux/reducer/challenge";
import {getText, TEXT_NEXT_QUESTION, TEXT_QUESTION, TEXT_SUMMARY} from "../../../lang";
import {
    CHALLENGE_STATUS_CLOSED,
    CHALLENGE_STATUS_END_TASK,
    CHALLENGE_STATUS_NEXT_TASK,
    CHALLENGE_STATUS_START
} from "../../../util/challengeHelper";
import _ from 'lodash';
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../component/button/Button";
import FaArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right';
import FaListOl from 'react-icons/lib/fa/list-ol';
import {CHALLENGE_SUMMARY_ROUTE} from "../../routes";
import {push} from 'connected-react-router'

class ChallengeTask extends React.PureComponent {

    renderTask({question, taskIndex, taskCount}) {
        const {screen, onAnswerClick, answerId, skipAnimation, onSkipAnimationChange, endTaskRep} = this.props;
        const correctAnswerId = _.get(endTaskRep, 'value.correctAnswerId', null);
        const headerText = `${getText(TEXT_QUESTION)} ${taskIndex + 1}/${taskCount}`;
        return <Task
            header={<div className="contentHeader">{headerText}</div>}
            answerId={answerId}
            correctAnswerId={correctAnswerId}
            canChangeAnswer={false}
            screen={screen}
            skipAnimation={skipAnimation}
            onSkipAnimationChange={onSkipAnimationChange}
            question={question}
            answers={question.answers}
            onAnswerClick={onAnswerClick}
        />;
    }

    renderActions() {
        const {onNextTaskClick, endTaskRep, status, onChallengeSummaryClick, challengeId} = this.props;
        const renderNextTaskButton = status === CHALLENGE_STATUS_END_TASK && !_.get(endTaskRep, 'value.isAllTasksAnswered', true);
        const renderSummaryButton = status === CHALLENGE_STATUS_END_TASK && _.get(endTaskRep, 'value.isAllTasksAnswered', false);
        return <div>
            {renderNextTaskButton &&
            <Button material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={<FaArrowCircleRight/>}
                    onClick={onNextTaskClick}>{getText(TEXT_NEXT_QUESTION)}</Button>}
            {renderSummaryButton &&
            <Button
                material={BUTTON_MATERIAL_BOX_SHADOW}
                icon={<FaListOl/>}
                onClick={() => onChallengeSummaryClick(challengeId)}
            >{getText(TEXT_SUMMARY)}</Button>}
        </div>
    }

    render() {
        const {status, startRep, nextTaskRep} = this.props;
        const rep = status === CHALLENGE_STATUS_START || !nextTaskRep ? startRep : nextTaskRep;
        const shouldRenderTask = rep && rep.fulfilled;
        return <div>
            {this.renderActions()}
            {shouldRenderTask && this.renderTask(rep.value)}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        status: state.challenge.status,
        answerId: state.challenge.answerId,
        skipAnimation: state.challenge.skipAnimation,
        endTaskRep: state.repository.challengeEndTask,
        nextTaskRep: state.repository.challengeNextTask,
    }),
    (dispatch) => ({
        onNextTaskClick: () => {
            dispatch(answerIdChanged(undefined));
            dispatch(skipAnimationChanged(false));
            dispatch(statusChanged(CHALLENGE_STATUS_NEXT_TASK))
        },
        onAnswerClick: answerId => {
            dispatch(answerIdChanged(answerId));
            dispatch(statusChanged(CHALLENGE_STATUS_END_TASK));
        },
        onSkipAnimationChange: skipAnimation => dispatch(skipAnimationChanged(skipAnimation)),
        onChallengeSummaryClick: challengeId => {
            dispatch(statusChanged(CHALLENGE_STATUS_CLOSED));
            dispatch(summaryIdChanged(challengeId));
            dispatch(push(CHALLENGE_SUMMARY_ROUTE));
        }
    })
)(ChallengeTask);
