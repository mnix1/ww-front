import React from 'react';
import {connect} from 'react-redux';
import Task from "../../../component/task/Task";
import {rivalScreen} from "../../../util/screenHelper";
import {remToPixels} from "../../../util/fontHelper";

class TaskWithoutActions extends React.PureComponent {

    render() {
        const {content, screen} = this.props;
        const {task} = content;
        return <Task
            className='emptyTask'
            anime={false}
            screen={rivalScreen({screen, offsetHeight: remToPixels(1.6)})}
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
