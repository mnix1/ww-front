import React from 'react';
import {connect} from 'react-redux';
import Task from "../../../component/task/Task";
import {answerIdChanged, skipAnimationChanged, statusChanged, summaryIdChanged} from "../../../redux/reducer/challenge";
import {
    getText,
    TEXT_ANSWER_FOR_QUESTION,
    TEXT_CHALLENGE_ENDED,
    TEXT_IS_CORRECT,
    TEXT_IS_WRONG,
    TEXT_NEXT_QUESTION,
    TEXT_POINTS,
    TEXT_QUESTION,
    TEXT_SUMMARY,
    TEXT_YOUR_SCORE
} from "../../../lang";
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
import {prepareAnswerIntervalMessage} from "../../../util/textHelper";
import './styles.css';

class ChallengeTask extends React.PureComponent {

    renderTask({question}) {
        const {screen, onAnswerClick, answerId, skipAnimation, onSkipAnimationChange, endTaskRep} = this.props;
        const correctAnswerId = _.get(endTaskRep, 'value.correctAnswerId', null);
        return <Task
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

    renderHeader({question, taskIndex, taskCount}) {
        const {answerId, endTaskRep} = this.props;
        if (!endTaskRep || !endTaskRep.fulfilled || _.isNil(answerId)) {
            const headerText = `${getText(TEXT_QUESTION)} ${taskIndex + 1}/${taskCount}`;
            return <div className="contentHeader">
                <div>{headerText}</div>
            </div>;
        }
        const {challengeInterval, answerInterval, score, correctAnswerId, isAllTasksAnswered} = endTaskRep.value;
        const summary = isAllTasksAnswered ? <div className='challengeSummary'>
            <div>
                <div>{getText(TEXT_CHALLENGE_ENDED)}</div>
                <div>{`${getText(TEXT_YOUR_SCORE)}: ${score} ${getText(TEXT_POINTS)}, ${prepareAnswerIntervalMessage(challengeInterval)}`}</div>
            </div>
            {this.renderSummaryButton()}
        </div> : null;
        return <div className="contentHeader">
            <div>
                <div>{`${getText(TEXT_ANSWER_FOR_QUESTION)} ${taskIndex + 1} ${answerId === correctAnswerId ? getText(TEXT_IS_CORRECT) : getText(TEXT_IS_WRONG)}`}</div>
                {isAllTasksAnswered ? null : <div>{prepareAnswerIntervalMessage(answerInterval)}</div>}
                {summary}
            </div>
            {this.renderNextTaskButton()}
        </div>;
    }

    renderSummaryButton() {
        const {endTaskRep, status, onChallengeSummaryClick, challengeId} = this.props;
        const renderSummaryButton = (status === CHALLENGE_STATUS_END_TASK || status === CHALLENGE_STATUS_CLOSED)&& _.get(endTaskRep, 'value.isAllTasksAnswered', false);
        return renderSummaryButton && <Button
            material={BUTTON_MATERIAL_BOX_SHADOW}
            icon={<FaListOl/>}
            onClick={() => onChallengeSummaryClick(challengeId)}
        >{getText(TEXT_SUMMARY)}</Button>
    }

    renderNextTaskButton() {
        const {onNextTaskClick, endTaskRep, status} = this.props;
        const renderNextTaskButton = (status === CHALLENGE_STATUS_END_TASK || status === CHALLENGE_STATUS_CLOSED) && !_.get(endTaskRep, 'value.isAllTasksAnswered', true);
        return renderNextTaskButton &&
            <Button className='nextTaskButton' material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={<FaArrowCircleRight/>}
                    onClick={onNextTaskClick}>{getText(TEXT_NEXT_QUESTION)}</Button>

    }

    render() {
        const {status, startRep, nextTaskRep} = this.props;
        const rep = status === CHALLENGE_STATUS_START || !nextTaskRep ? startRep : nextTaskRep;
        if (!rep || !rep.fulfilled) {
            return null;
        }
        return <div className='challengeTask'>
            {this.renderHeader(rep.value)}
            {this.renderTask(rep.value)}
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
