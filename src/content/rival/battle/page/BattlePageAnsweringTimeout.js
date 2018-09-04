import React from 'react';
import {connect} from 'react-redux';
import Profiles from "../../component/Profiles";
import TaskDescription from "../../component/TaskDescription";
import {getText, TEXT_NO_ANSWER} from "../../../../lang/langText";
import thumbDown from '../../../../media/image/icon/thumbDown.svg';
import TaskMarkedAnswer from "../../component/TaskMarkedAnswer";
import TaskWithoutActions from "../../component/TaskWithoutActions";

class BattlePageAnsweringTimeout extends React.PureComponent {

    renderNoAnswer() {
        const {screen} = this.props;
        return <div className='pageCenterHorizontal whoAnswered'>
            <div className='pageCenterVertical'>
                <div>{getText(TEXT_NO_ANSWER)}...</div>
                <img alt='' src={thumbDown} height={screen.wisieImgHeight}/>
            </div>
        </div>
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent battlePageAnsweringTimeout'>
            <TaskDescription content={content} className='justifyCenter flexColumn contentHeader'/>
            <Profiles content={content} className='absolute'/>
            {this.renderNoAnswer()}
            <TaskWithoutActions content={content}/>
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
)(BattlePageAnsweringTimeout);
