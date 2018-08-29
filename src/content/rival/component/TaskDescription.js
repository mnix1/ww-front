import React from 'react';
import '../battle/page/styles.css';
import {getText, TEXT_CATEGORY, TEXT_DIFFICULT, TEXT_POINTS, TEXT_QUESTION} from "../../../lang/text";
import {getCategoryLabel} from "../../../lang/category";
import Rating from "../../../component/rating/Rating";
import {getCategory} from "../../../util/categoryHelper";

export default class TaskDescription extends React.PureComponent {

    render() {
        const {content, className, children, taskId} = this.props;
        let {task} = content;
        if (!task) {
            task = {};
        }
        return <div className={className}>
            <div>{`${getText(TEXT_QUESTION)} ${task.id || taskId}/${content.taskCount}`}</div>
            {task.category && <div>{`${getText(TEXT_CATEGORY)}: ${getCategoryLabel(task.category)} `}
                <img alt='' key={task.category} height={20}
                      src={getCategory(task.category)}/>
            </div>}
            {task.difficultyLevel && <div>{`${getText(TEXT_DIFFICULT)}:`} <Rating
                valueString={task.difficultyLevel}/> {`(${task.points} ${getText(TEXT_POINTS)})`}</div>}
            {children}
        </div>
    }
}
