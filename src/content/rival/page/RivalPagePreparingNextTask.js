import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_QUESTION_PREPARING} from "../../../lang/langText";
import Timer from "../../../component/timer/Timer";
import ActiveMembers from "../component/ActiveMembers";
import TaskDescription from "../component/TaskDescription";
import {RIVAL_TYPE_BATTLE} from "../../../util/rivalHelper";
import Profiles from "../component/Profiles";

class RivalPagePreparingNextTask extends React.PureComponent {

    renderTaskDescription() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <TaskDescription
            content={content}
            renderTaskPoints={battle}
            renderTaskCount={battle}
            small={screen.isSmallHeight}
            className='justifyCenter flexColumn pageHeader'>
            <div className='pageHeader'>
                <div>{getText(TEXT_QUESTION_PREPARING) + ' '}
                    <br/>
                    <Timer from={content.nextTaskInterval}/>
                </div>
            </div>
        </TaskDescription>

    }

    render() {
        console.log('RivalPagePreparingNextTask render');
        const {content} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageContent warPagePreparingNextTask'>
            {battle && this.renderTaskDescription()}

            {battle ? <Profiles content={content} className='absolute'/> :
                <ActiveMembers renderHobbies={false} content={content}>{this.renderTaskDescription()}</ActiveMembers>}
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
