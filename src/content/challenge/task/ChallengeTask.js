import React from 'react';
import {connect} from 'react-redux';
import Task from "../../../component/task/Task";
import {answerIdChanged, skipAnimationChanged, statusChanged, summaryIdChanged} from "../../../redux/reducer/challenge";
import {
    getText,
    TEXT_ANSWER_FOR_QUESTION,
    TEXT_CHALLENGE_ENDED, TEXT_CORRECT_ANSWER,
    TEXT_IS_CORRECT,
    TEXT_IS_WRONG,
    TEXT_NEXT,
    TEXT_POINTS,
    TEXT_QUESTION,
    TEXT_SUMMARY, TEXT_WRONG_ANSWER,
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
import FaListOl from 'react-icons/lib/fa/list-ol';
import {CHALLENGE_SUMMARY_ROUTE} from "../../routes";
import {push} from 'connected-react-router'
import {prepareAnswerIntervalMessage} from "../../../util/textHelper";
import './styles.css';
import ContentWithImage from "../../../component/content-with-image/ContentWithImage";
import {clearChallengeSummaryFetch} from "../fetch/ChallengeSummaryFetch";
import {getHero} from "../../../util/heroHelper";
import renderDifficultyLevelStars from "../../../util/taskDifficultyLevel";

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
        const {answerId, endTaskRep, screen} = this.props;
        const headerText = `${getText(TEXT_QUESTION)} ${taskIndex + 1}/${taskCount}`;
        if (!endTaskRep || !endTaskRep.fulfilled || _.isNil(answerId)) {
            return <div className="contentHeader">
                <div>{headerText}</div>
                {renderDifficultyLevelStars(question.taskDifficultyLevel)}
            </div>;
        }
        const {answerInterval, correctAnswerId, isAllTasksAnswered} = endTaskRep.value;
        const resultMessage = correctAnswerId === answerId ? getText(TEXT_CORRECT_ANSWER) : getText(TEXT_WRONG_ANSWER);
        const summary = isAllTasksAnswered ? this.renderSummary() : null;
        const className = screen.moreHeightThanWidth && screen.isNotBigHeight ? 'alignLeft' : 'alignCenter';
        return <div className="contentHeader">
            <div>
                <div className={className}>{resultMessage}</div>
                {isAllTasksAnswered ? null :
                    <div className={className}>{prepareAnswerIntervalMessage(answerInterval)}</div>}
                {summary}
            </div>
            {this.renderNextTaskButton()}
        </div>;
    }

    renderSummary() {
        const {endTaskRep, onChallengeSummaryClick, challengeId, profile} = this.props;
        const {challengeInterval, score} = endTaskRep.value;
        return <ContentWithImage imgSrc={getHero(profile.heroType)}
                                 onClick={() => onChallengeSummaryClick(challengeId)}
                                 id='summary'>
            <div>
                <div>{getText(TEXT_CHALLENGE_ENDED)}</div>
                <div>{`${getText(TEXT_YOUR_SCORE)}: ${score} ${getText(TEXT_POINTS)}`}</div>
                <div>{prepareAnswerIntervalMessage(challengeInterval)}</div>
            </div>
            <div>
                <Button
                    material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={<FaListOl/>}
                    onClick={() => onChallengeSummaryClick(challengeId)}
                >{getText(TEXT_SUMMARY)}</Button>
            </div>
        </ContentWithImage>;
    }

    renderNextTaskButton() {
        const {onNextTaskClick, endTaskRep, status, profile} = this.props;
        const renderNextTaskButton = (status === CHALLENGE_STATUS_END_TASK || status === CHALLENGE_STATUS_CLOSED) && !_.get(endTaskRep, 'value.isAllTasksAnswered', true);
        return renderNextTaskButton &&
            <ContentWithImage imgSrc={getHero(profile.heroType)} onClick={onNextTaskClick} id='nextTask'>
                <div className='flexColumn'>
                    <span>{getText(TEXT_NEXT)}</span>
                    <span>{getText(TEXT_QUESTION).toLowerCase()}</span>
                </div>
            </ContentWithImage>;

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
        profile: state.profile.profile,
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
            clearChallengeSummaryFetch(dispatch);
            dispatch(push(CHALLENGE_SUMMARY_ROUTE));
        }
    })
)(ChallengeTask);
