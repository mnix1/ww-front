import React from 'react';
import {connect} from 'react-redux';
import TaskDescription from "../component/TaskDescription";
import {getText, TEXT_NO_ANSWER} from "../../../lang/langText";
import thumbDown from '../../../media/image/icon/thumbDown.svg';
import TaskMarkedAnswer from "../component/TaskMarkedAnswer";
import ActiveMembers from "../component/ActiveMembers";
import {RIVAL_TYPE_BATTLE, RIVAL_TYPE_CHALLENGE} from "../../../util/rivalHelper";
import Profiles from "../component/Profiles";
import {GREEN_COLOR} from "../../../util/style/constant";

class RivalPageAnsweringTimeout extends React.PureComponent {

    renderNoAnswer() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageCenterHorizontal whoAnswered'>
            <div className='pageCenterVertical'>
                {!battle &&
                <ActiveMembers addWidthStyle={false} className={content.opponent ? 'justifyBetween' : 'justifyCenter'}
                               memberClassName='wrongAnswer'/>}
                <div>{getText(TEXT_NO_ANSWER)}...</div>
                <img draggable="false" alt='' src={thumbDown} height={screen.rivalImgHeight}/>
            </div>
        </div>
    }

    render() {
        // console.log('RivalPageAnsweringTimeout render');
        const {content} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        const challenge = content.type === RIVAL_TYPE_CHALLENGE;
        return <div className='pageContent'>
            <TaskDescription
                task={content.task}
                taskCount={content.taskCount}
                renderScore={challenge}
                score={content.newScore}
                scoreColor={content.score < content.newScore ? GREEN_COLOR : undefined}
                renderTaskPoints={battle}
                renderTaskCount={battle}
                className='justifyCenter flexColumn contentHeader warTaskDescription'
            />
            {battle && <Profiles className='absolute'/>}
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
