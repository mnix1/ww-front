import React from 'react';
import '../battle/page/styles.css';
import {getText, TEXT_CATEGORY, TEXT_DIFFICULT, TEXT_QUESTION} from "../../../lang/langText";
import {getCategoryLabel} from "../../../lang/langCategory";
import Rating from "../../../component/rating/Rating";
import {getCategory} from "../../../util/categoryHelper";
import {prepareRatingPointsMessage} from "../../../util/textHelper";
import {connect} from "react-redux";

class TaskDescription extends React.PureComponent {

    static defaultProps = {
        renderTaskCount: true,
        renderTaskPoints: true
    };

    render() {
        const {content, className, children, taskId, renderTaskCount, renderTaskPoints, lang} = this.props;
        let {task} = content;
        if (!task) {
            task = {};
        }
        const taskCount = renderTaskCount ? `/${content.taskCount}` : '';
        return <div className={`${className}`}>
            <div>{`${getText(TEXT_QUESTION)} ${task.id || taskId}${taskCount}`}</div>
            {task.category && <div>{`${getText(TEXT_CATEGORY)}: ${getCategoryLabel(lang, task.category)} `}
                <img alt='' key={task.category} height={14}
                     src={getCategory(task.category)}/>
            </div>}
            {task.difficultyLevel && <div className='justifyCenter'>
                <div className='justifyCenter flexColumn'>{`${getText(TEXT_DIFFICULT)}:`}</div>
                &nbsp;<Rating valueString={task.difficultyLevel}/>&nbsp;
                {renderTaskPoints && <div className='justifyCenter flexColumn'>
                    {prepareRatingPointsMessage(task.points)}
                </div>}
            </div>}
            {children}
        </div>
    }
}

export default connect(
    (state) => ({
        lang: state.language.lang,
    }),
    (dispatch) => ({})
)(TaskDescription);
