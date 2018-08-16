import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {
    getCategoryLabel,
    getText,
    TEXT_BATTLE_OVER,
    TEXT_CATEGORY,
    TEXT_CORRECT_ANSWER, TEXT_DIFFICULT, TEXT_FOR,
    TEXT_OPPONENT_CORRECT_ANSWER,
    TEXT_OPPONENT_WRONG_ANSWER, TEXT_POINTS,
    TEXT_QUESTION,
    TEXT_QUESTION_PREPARING,
    TEXT_THE_WINNER_IS,
    TEXT_WAIT,
    TEXT_WRONG_ANSWER
} from "../../../lang";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../redux/reducer/battle";
import Timer from "../../../component/timer/Timer";
import {renderDifficultyLevelStars} from "../../../util/taskDifficultyLevel";

class BattlePageTaskDescription extends React.PureComponent {

    render() {
        const {content, className, children} = this.props;
        const {task} = content;
        return  <div className={className}>
            <div>{`${getText(TEXT_QUESTION)} ${task.id}/${content.taskCount}`}</div>
            <div>{`${getText(TEXT_CATEGORY)}: ${getCategoryLabel(task.category)}`}</div>
            <div>{`${getText(TEXT_DIFFICULT)}:`} {renderDifficultyLevelStars(content.task.taskDifficultyLevel)} {`(${task.points} ${getText(TEXT_POINTS)})`}</div>
            {children}
        </div>
    }
}

export default connect(
    (state) => ({
        content: state.battle.content,
    }),
    (dispatch) => ({})
)(BattlePageTaskDescription);
