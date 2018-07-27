import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Task from "../../../component/task/Task";
import {
    questionIdAnswerIdMapChanged,
    questionIdSkipAnimationMapChanged,
    questionIndexChanged,
    statusChanged
} from "../../../redux/reducer/battle";
import {getText, TEXT_QUESTION} from "../../../lang";
import {BATTLE_STATUS_IN_PROGRESS} from "../../../util/battleHelper";

class BattleFriendTask extends React.PureComponent {

    renderTask({questions}) {
        const {questionIndex, screen, onAnswerClick, questionIdAnswerIdMap, questionIdSkipAnimationMap, onSkipAnimationChange, onNavigateTaskClick, onLastQuestionAnswerClick} = this.props;
        const question = _.sortBy(questions, 'id')[questionIndex];
        const nextQuestionIndex = (questionIndex + 1) % questions.length;
        const headerText = `${getText(TEXT_QUESTION)} ${questionIndex + 1}/${questions.length}`;
        return <Task
            header={<div className="contentHeader">{headerText}</div>}
            answerId={questionIdAnswerIdMap[question.id]}
            canChangeAnswer={false}
            screen={screen}
            skipAnimation={questionIdSkipAnimationMap[question.id] === true}
            onSkipAnimationChange={() => onSkipAnimationChange({...onSkipAnimationChange, [question.id]: true})}
            question={question}
            answers={question.answers}
            onAnswerClick={(answerId) => {
                onAnswerClick({...questionIdAnswerIdMap, [question.id]: answerId});
                if (nextQuestionIndex > questionIndex) {
                    onNavigateTaskClick(nextQuestionIndex);
                } else {
                    onLastQuestionAnswerClick();
                }
            }}
        />;
    }

    render() {
        const {battleFriendStartRep} = this.props;
        const shouldRenderTask = battleFriendStartRep && battleFriendStartRep.fulfilled;
        return <div>
            {shouldRenderTask && this.renderTask(battleFriendStartRep.value)}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        questionIndex: state.battle.questionIndex,
        questionIdAnswerIdMap: state.battle.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.battle.questionIdSkipAnimationMap,
        battleFriendStartRep: state.repository.battleFriendStart,
    }),
    (dispatch) => ({
        onLastQuestionAnswerClick: () => {
            dispatch(statusChanged(BATTLE_STATUS_IN_PROGRESS));
            dispatch(questionIndexChanged(0));
        },
        onNavigateTaskClick: questionIndex => dispatch(questionIndexChanged(questionIndex)),
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap)),
        onSkipAnimationChange: questionIdSkipAnimationMap => dispatch(questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap))
    })
)(BattleFriendTask);
