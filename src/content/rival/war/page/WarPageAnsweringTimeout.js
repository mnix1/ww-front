import React from 'react';
import {connect} from 'react-redux';
import TaskDescription from "../../component/TaskDescription";
import {getText, TEXT_NO_ANSWER} from "../../../../lang/langText";
import thumbDown from '../../../../media/image/icon/thumbDown.svg';
import TaskMarkedAnswer from "../../component/TaskMarkedAnswer";
import ActiveMembers from "../../component/ActiveMembers";

class WarPageAnsweringTimeout extends React.PureComponent {

    renderNoAnswer() {
        const {content} = this.props;
        return <div className='pageCenterHorizontal whoAnswered'>
            {/*<div className='pageBackground absoluteBackgroundMix'/>*/}
            <div className='pageCenterVertical'>
                <ActiveMembers content={content} memberClassName='wrongAnswer'/>
                <div>{getText(TEXT_NO_ANSWER)}...</div>
                <img alt='' src={thumbDown} height={60}/>
            </div>
        </div>
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent warPageAnsweringTimeout'>
            <TaskDescription
                content={content}
                renderTaskPoints={false}
                renderTaskCount={false}
                className='justifyCenter flexColumn contentHeader warTaskDescription'
            />
            {this.renderNoAnswer()}
            <TaskMarkedAnswer content={content}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(WarPageAnsweringTimeout);
