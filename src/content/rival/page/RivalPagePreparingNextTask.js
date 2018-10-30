import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_QUESTION_PREPARING} from "../../../lang/langText";
import Timer from "../../../component/timer/Timer";
import ActiveMembers from "../component/ActiveMembers";
import TaskDescription from "../component/TaskDescription";
import {RIVAL_TYPE_BATTLE, RIVAL_TYPE_CHALLENGE} from "../../../util/rivalHelper";
import Profiles from "../component/Profiles";

class RivalPagePreparingNextTask extends React.PureComponent {

    renderTaskDescription() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        const challenge = content.type === RIVAL_TYPE_CHALLENGE;
        return <TaskDescription
            task={content.task}
            taskCount={content.taskCount}
            renderScore={challenge}
            score={content.score}
            renderTaskPoints={battle}
            renderTaskCount={battle}
            small={!screen.isBigScreen}
            className='justifyCenter flexColumn pageHeader'>
            <div className='pageHeader'>
                <div>{getText(TEXT_QUESTION_PREPARING) + ' '}
                    <br/>
                    <Timer from={content.nextInterval}/>
                </div>
            </div>
        </TaskDescription>

    }

    render() {
        // console.log('RivalPagePreparingNextTask render');
        const {content} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageContent warPagePreparingNextTask'>
            {battle && this.renderTaskDescription()}

            {battle ? <Profiles className='absolute'/> :
                <ActiveMembers renderHobbies={false}>{this.renderTaskDescription()}</ActiveMembers>}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(RivalPagePreparingNextTask);
