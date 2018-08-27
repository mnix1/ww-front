import React from 'react';
import {connect} from 'react-redux';
import Task from "../../../component/task/Task";

class TaskWithoutActions extends React.PureComponent {

    render() {
        const {content, screen} = this.props;
        const {task} = content;
        return <Task
            className='emptyTask'
            anime={false}
            screen={screen}
            skipAnimation={true}
            question={task}
            answers={task.answers}
        />;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(TaskWithoutActions);
