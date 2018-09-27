import React from 'react';
import {connect} from 'react-redux';
import TaskDescription from "../../component/TaskDescription";
import {getText, TEXT_NO_ANSWER} from "../../../../lang/langText";
import thumbDown from '../../../../media/image/icon/thumbDown.svg';
import TaskMarkedAnswer from "../../component/TaskMarkedAnswer";
import ActiveMembers from "../../component/ActiveMembers";
import {RIVAL_TYPE_BATTLE} from "../../../../util/rivalHelper";
import Profiles from "../../component/Profiles";

class RivalPageAnsweringTimeout extends React.PureComponent {

    renderNoAnswer() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageCenterHorizontal whoAnswered'>
            <div className='pageCenterVertical'>
                {!battle &&
                <ActiveMembers content={content} className={content.opponent ? 'justifyBetween' : 'justifyCenter'}
                               memberClassName='wrongAnswer'/>}
                <div>{getText(TEXT_NO_ANSWER)}...</div>
                <img alt='' src={thumbDown} height={screen.wisieImgHeight}/>
            </div>
        </div>
    }

    render() {
        const {content} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageContent warPageAnsweringTimeout'>
            <TaskDescription
                content={content}
                renderTaskPoints={battle}
                renderTaskCount={battle}
                className='justifyCenter flexColumn contentHeader warTaskDescription'
            />
            {battle && <Profiles content={content} className='absolute'/>}
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
)(RivalPageAnsweringTimeout);
