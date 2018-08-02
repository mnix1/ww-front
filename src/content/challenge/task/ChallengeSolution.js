import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import _ from 'lodash';
import Task from "../../../component/task/Task";
import {challengeCleared, questionIndexChanged, summaryIdChanged} from "../../../redux/reducer/challenge";
import {
    getText,
    TEXT_ANSWER_FOR_QUESTION,
    TEXT_NEXT_QUESTION,
    TEXT_POINTS,
    TEXT_SUMMARY,
    TEXT_YOUR_SCORE
} from "../../../lang";
import FaArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right';
import FaListOl from 'react-icons/lib/fa/list-ol';
import {prepareAnswerIntervalMessage} from "../../../util/textHelper";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../component/button/Button";
import {idChanged} from "../../../redux/reducer/content";

class ChallengeSolution extends React.PureComponent {

    calculateResult(questionIdCorrectAnswerIdMap) {
        const {questionIdAnswerIdMap, questions} = this.props;
        let result = 0;
        questions.forEach(e => {
            if (questionIdCorrectAnswerIdMap[e.id] === questionIdAnswerIdMap[e.id]) {
                result++;
            }
        });
        return result;
    }

    prepareScreenForTask() {
        const {screen} = this.props;
        const contentHeight = Math.min(screen.contentHeight / 1.15, screen.contentHeight - 40);
        return {
            ...screen,
            contentHeight
        }
    }

    renderActions() {
        const {screen, questionIndex, onNavigateTaskClick, onChallengeSummaryClick, questions, challengeId} = this.props;
        const nextQuestionIndex = (questionIndex + 1) % questions.length;
        let className = 'actionsToRight';
        if (screen.moreHeightThanWidth) {
            className += ' marginTop';
        }
        return <div className={className}>
            <Button
                material={BUTTON_MATERIAL_BOX_SHADOW}
                icon={<FaArrowCircleRight/>}
                onClick={() => onNavigateTaskClick(nextQuestionIndex)}
            >{getText(TEXT_NEXT_QUESTION)}</Button>
            <br/>
            <Button
                material={BUTTON_MATERIAL_BOX_SHADOW}
                icon={<FaListOl/>}
                onClick={() => onChallengeSummaryClick(challengeId)}
            >{getText(TEXT_SUMMARY)}</Button>
        </div>;
    }

    renderHeader({answerInterval, questionIdCorrectAnswerIdMap}) {
        const {questionIndex} = this.props;
        return <div className="contentHeader">
            {`${getText(TEXT_YOUR_SCORE)}: ${this.calculateResult(questionIdCorrectAnswerIdMap)} ${getText(TEXT_POINTS)}, ${prepareAnswerIntervalMessage(answerInterval)}`}
            <br/>
            {`${getText(TEXT_ANSWER_FOR_QUESTION)} ${questionIndex + 1}:`}
            {this.renderActions()}
        </div>;
    }

    renderTask({questionIdCorrectAnswerIdMap}) {
        const {questionIndex, questionIdAnswerIdMap, questions} = this.props;
        const question = _.sortBy(questions, 'id')[questionIndex];
        return <Task
            style={{position: 'absolute', bottom: 0}}
            answerId={questionIdAnswerIdMap[question.id]}
            correctAnswerId={questionIdCorrectAnswerIdMap[question.id]}
            canChangeAnswer={false}
            screen={this.prepareScreenForTask()}
            skipAnimation={true}
            question={question}
            answers={question.answers}
            onAnswerClick={_.noop}
        />;
    }

    render() {
        const {rep} = this.props;
        if (!rep || !rep.fulfilled) {
            return null;
        }
        return <div className='challengeSolution'>
            {this.renderHeader(rep.value)}
            {this.renderTask(rep.value)}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        questionIndex: state.challenge.questionIndex,
        questionIdAnswerIdMap: state.challenge.questionIdAnswerIdMap,
    }),
    (dispatch) => ({
        onNavigateTaskClick: questionIndex => dispatch(questionIndexChanged(questionIndex)),
        onChallengeSummaryClick: challengeId => {
            dispatch(challengeCleared());
            dispatch(summaryIdChanged(challengeId));
            // dispatch(idChanged(OBJECT_APP_BATTLE));
        }
    })
)(ChallengeSolution);
