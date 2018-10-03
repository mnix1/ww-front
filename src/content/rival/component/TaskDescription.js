import React from 'react';
import '../page/styles.css';
import {getText, TEXT_CATEGORY, TEXT_DIFFICULT, TEXT_QUESTION} from "../../../lang/langText";
import {getCategoryLabel} from "../../../lang/langCategory";
import Rating from "../../../component/rating/Rating";
import {getCategory} from "../../../util/categoryHelper";
import {prepareRatingPointsMessage} from "../../../util/textHelper";
import {remToPixels} from "../../../util/fontHelper";

export default class TaskDescription extends React.PureComponent {

    static defaultProps = {
        renderTask: true,
        renderTaskCount: true,
        renderTaskPoints: true,
        small: false
    };

    render() {
        const {content, className, children, taskId, renderTaskCount, renderTask, renderTaskPoints, small} = this.props;
        let {task} = content;
        if (!task) {
            task = {};
        }
        const taskCount = renderTaskCount ? `/${content.taskCount}` : '';
        const taskNumber = renderTask && <div>{`${getText(TEXT_QUESTION)} ${task.id || taskId}${taskCount}`}</div>;
        const taskCategory = task.category &&
            <div className='justifyCenter flexWrap'>{small ? '' : `${getText(TEXT_CATEGORY)}: `} {`${getCategoryLabel(task.category)} `}
                <img alt='' className='marginLeftRem' key={task.category} height={remToPixels(1)}
                     src={getCategory(task.category)}/>
            </div>;
        const taskDifficulty = task.difficultyLevel && <div className='justifyCenter'>
            {!small && <div className='justifyCenter flexColumn'>{`${getText(TEXT_DIFFICULT)}:`}</div>}
            &nbsp;<Rating valueString={task.difficultyLevel}/>&nbsp;
            {renderTaskPoints && <div className='justifyCenter flexColumn'>
                {prepareRatingPointsMessage(task.points)}
            </div>}
        </div>;
        return <div className={`${className}`}>
            {taskNumber}
            {taskCategory}
            {taskDifficulty}
            {children}
        </div>
    }
}
