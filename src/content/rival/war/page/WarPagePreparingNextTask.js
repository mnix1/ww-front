import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_QUESTION_PREPARING} from "../../../../lang/langText";
import Timer from "../../../../component/timer/Timer";
import ActiveMembers from "../../component/ActiveMembers";
import TaskDescription from "../../component/TaskDescription";
import {RIVAL_TYPE_BATTLE} from "../../../../util/rivalHelper";
import Profiles from "../../component/Profiles";

class WarPagePreparingNextTask extends React.PureComponent {
    render() {
        const {content} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageContent warPagePreparingNextTask'>
            <TaskDescription
                content={content}
                renderTaskPoints={battle}
                renderTaskCount={battle}
                className='justifyCenter flexColumn pageHeader'
            />
            <div className='pageHeader'>
                <div>{getText(TEXT_QUESTION_PREPARING) + ' '}
                    <br/>
                    <Timer from={content.nextTaskInterval}/>
                </div>
            </div>
            {battle ? <Profiles content={content} className='absolute'/> : <ActiveMembers content={content}/>}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(WarPagePreparingNextTask);
