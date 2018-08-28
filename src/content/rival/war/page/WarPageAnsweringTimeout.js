import React from 'react';
import {connect} from 'react-redux';
import TaskDescription from "../../component/TaskDescription";
import {getText, TEXT_NO_ANSWER} from "../../../../lang/text";
import thumbDown from '../../../../media/image/icon/thumbDown.svg';
import TaskMarkedAnswer from "../../component/TaskMarkedAnswer";
import TaskWithoutActions from "../../component/TaskWithoutActions";
import ActiveHeroes from "../../component/ActiveHeroes";
import WarTaskDescription from "../../component/WarTaskDescription";

class WarPageAnsweringTimeout extends React.PureComponent {

    renderNoAnswer() {
        return <div className='pageCenterHorizontal whoAnswered'>
            <div className='pageBackground absoluteBackgroundMix'/>
            <div className='pageCenterVertical'>
                <div>{getText(TEXT_NO_ANSWER)}...</div>
                <img alt='' src={thumbDown} height={60}/>
            </div>
        </div>
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent warPageAnsweringTimeout'>
            <WarTaskDescription content={content} className='contentHeader'/>
            <ActiveHeroes content={content} className='absolute'/>
            {this.renderNoAnswer()}
            <TaskWithoutActions content={content}/>
            <TaskMarkedAnswer content={content}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.war.content,
        socket: state.socket.socket,
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(WarPageAnsweringTimeout);
