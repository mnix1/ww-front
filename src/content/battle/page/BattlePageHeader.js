import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {
    getCategoryLabel,
    getText,
    TEXT_BATTLE_OVER,
    TEXT_CATEGORY,
    TEXT_CORRECT_ANSWER,
    TEXT_OPPONENT_CORRECT_ANSWER,
    TEXT_OPPONENT_WRONG_ANSWER,
    TEXT_QUESTION,
    TEXT_QUESTION_PREPARING,
    TEXT_THE_WINNER_IS,
    TEXT_WAIT,
    TEXT_WRONG_ANSWER
} from "../../../lang";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../redux/reducer/battle";
import Timer from "../../../component/timer/Timer";
import {renderDifficultyLevelStars} from "../../../util/taskDifficultyLevel";

class BattlePageHeader extends React.PureComponent {

    renderQuestionResult() {
        const {content} = this.props;
        const {correctAnswerId, markedAnswerId, meAnswered, winner} = content;
        return <div>
            {meAnswered &&
            <div>{markedAnswerId === correctAnswerId ? getText(TEXT_CORRECT_ANSWER) : getText(TEXT_WRONG_ANSWER)}</div>}
            {!meAnswered &&
            <div>{markedAnswerId === correctAnswerId ? getText(TEXT_OPPONENT_CORRECT_ANSWER) : getText(TEXT_OPPONENT_WRONG_ANSWER)}</div>}
            {!winner && <div>{`${getText(TEXT_WAIT)}, ${getText(TEXT_QUESTION_PREPARING).toLowerCase()} `}
                <Timer from={content.nextTaskInterval}/>
            </div>}
            {winner && <div>
                {getText(TEXT_BATTLE_OVER)}
                {` ${getText(TEXT_THE_WINNER_IS)}: ${winner}`}
            </div>}
        </div>
    }

    renderTaskDescription() {
        const {content} = this.props;
        const {task} = content;
        return <div>
            {`${getText(TEXT_QUESTION)} ${task.id}/${content.taskCount}`}
            <br/>
            {getCategoryLabel(task.category)}
            {renderDifficultyLevelStars(content.task.taskDifficultyLevel)}
        </div>;
    }

    render() {
        const {content} = this.props;
        return <div className="contentHeader">
            {this.renderTaskDescription()}
            {(content.status === 'ANSWERED') && this.renderQuestionResult()}
        </div>
    }
}

export default connect(
    (state) => ({
        content: state.battle.content,
    }),
    (dispatch) => ({
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap)),
        onSkipAnimationChange: questionIdSkipAnimationMap => dispatch(questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap))
    })
)(BattlePageHeader);
