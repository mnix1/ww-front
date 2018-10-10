import React from 'react';
import '../page/styles.css';
import {getText, TEXT_CATEGORY, TEXT_DIFFICULT, TEXT_QUESTION, TEXT_TIME} from "../../../lang/langText";
import {getCategoryLabel} from "../../../lang/langCategory";
import Rating from "../../../component/rating/Rating";
import {getCategory} from "../../../util/categoryHelper";
import {prepareRatingPointsMessage} from "../../../util/textHelper";
import Timer from "../../../component/timer/Timer";
import connect from "react-redux/es/connect/connect";

class TaskDescription extends React.PureComponent {

    static defaultProps = {
        renderTask: true,
        renderTaskCount: true,
        renderTaskPoints: true,
        renderTimer: false,
        small: false,
        task: {},
    };

    renderTaskNumber() {
        const {task, taskCount, taskId, renderTaskCount, renderTask} = this.props;
        if (!renderTask) {
            return null;
        }
        return <div>
            {`${getText(TEXT_QUESTION)} ${task.id || taskId}${renderTaskCount ? `/${taskCount}` : ''}`}
        </div>;
    }

    renderTaskCategory() {
        const {task, small, screen} = this.props;
        if (!task.category) {
            return null;
        }
        return <div className='justifyCenter'>
            {small ? '' : `${getText(TEXT_CATEGORY)}: `} {`${getCategoryLabel(task.category)} `}
            <img alt='' className='marginLeftRem' key={task.category} height={screen.fontSizeRem}
                 src={getCategory(task.category)}/>
        </div>;
    }

    renderTaskDifficulty() {
        const {task, renderTaskPoints, small} = this.props;
        if (!task.difficultyLevel) {
            return null;
        }
        return <div className='justifyCenter'>
            {!small && <div className='justifyCenter flexColumn'>{`${getText(TEXT_DIFFICULT)}:`}</div>}
            &nbsp;<Rating valueString={task.difficultyLevel}/>&nbsp;
            {renderTaskPoints && <div className='justifyCenter flexColumn'>
                {prepareRatingPointsMessage(task.points)}
            </div>}
        </div>;
    }

    renderTimer() {
        const {renderTimer, interval, small} = this.props;
        if (!renderTimer) {
            return null;
        }
        return <div>{small ? '' : `${getText(TEXT_TIME)}: `}<Timer from={interval}/>
        </div>
    }

    render() {
        // console.log('TaskDescription render');
        const {className, children} = this.props;
        return <div className={`${className}`}>
            {this.renderTaskNumber()}
            {this.renderTaskCategory()}
            {this.renderTaskDifficulty()}
            {children}
            {this.renderTimer()}
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(TaskDescription);

