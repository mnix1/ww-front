import React from 'react';
import {connect} from 'react-redux';
import Task from "../../../component/task/Task";
import {rivalScreen} from "../../../util/screenHelper";
import {remToPixels} from "../../../util/fontHelper";

class TaskMarkedAnswer extends React.PureComponent {

    render() {
        const {content, screen} = this.props;
        const {task, correctAnswerId, markedAnswerId} = content;
        return <Task
            className='taskWithAnswer'
            correctAnswerId={correctAnswerId}
            answerId={markedAnswerId}
            screen={rivalScreen({screen, offsetHeight: remToPixels(1.6)})}
            skipAnimation={true}
            question={task}
            answers={task.answers}
        />
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(TaskMarkedAnswer);
