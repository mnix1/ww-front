import React from 'react';
import {connect} from 'react-redux';
import '../styles.css';
import {getCategoryLabel, getText, TEXT_CATEGORY, TEXT_DIFFICULT, TEXT_POINTS, TEXT_QUESTION} from "../../../../lang";
import {renderDifficultyLevelStars} from "../../../../util/taskDifficultyLevel";

export class TaskDescription extends React.PureComponent {

    render() {
        const {content, className, children, taskId} = this.props;
        let {task} = content;
        if(!task){
            task = {};
        }
        return  <div className={className}>
            <div>{`${getText(TEXT_QUESTION)} ${task.id || taskId}/${content.taskCount}`}</div>
            {task.category && <div>{`${getText(TEXT_CATEGORY)}: ${getCategoryLabel(task.category)}`}</div>}
            {task.taskDifficultyLevel &&<div>{`${getText(TEXT_DIFFICULT)}:`} {renderDifficultyLevelStars(task.taskDifficultyLevel)} {`(${task.points} ${getText(TEXT_POINTS)})`}</div>}
            {children}
        </div>
    }
}

export default connect(
    (state) => ({
        content: state.battle.content,
    }),
    (dispatch) => ({})
)(TaskDescription);
