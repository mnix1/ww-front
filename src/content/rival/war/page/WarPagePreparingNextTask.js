import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_QUESTION_PREPARING} from "../../../../lang/text";
import Timer from "../../../../component/timer/Timer";
import TaskDescription from "../../component/TaskDescription";
import Profiles from "../../component/Profiles";

class WarPagePreparingNextTask extends React.PureComponent {

    render() {
        const {content} = this.props;
        return <div className='pageContent warPagePreparingNextTask'>
            <TaskDescription content={content} className='pageHeader'/>
            <div className='pageHeader'>
                <div>{getText(TEXT_QUESTION_PREPARING) + ' '}
                <br/>
                    <Timer from={content.nextTaskInterval}/>
                </div>
            </div>
            <Profiles content={content} className='absolute'/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.war.content,
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(WarPagePreparingNextTask);
