import React from 'react';
import {connect} from 'react-redux';
import Task from "../../../component/task/Task";

class TaskMarkedAnswer extends React.PureComponent {

    render() {
        const {content, screen} = this.props;
        const {task, correctAnswerId, markedAnswerId} = content;
        return <Task
            className='taskWithAnswer'
            correctAnswerId={correctAnswerId}
            answerId={markedAnswerId}
            screen={screen}
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
