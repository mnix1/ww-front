import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_QUESTION_PREPARING} from "../../../../lang/langText";
import Timer from "../../../../component/timer/Timer";
import ActiveHeroes from "../../component/ActiveHeroes";
import TaskDescription from "../../component/TaskDescription";

class WarPagePreparingNextTask extends React.PureComponent {

    render() {
        const {content} = this.props;
        return <div className='pageContent warPagePreparingNextTask'>
            <TaskDescription
                content={content}
                renderTaskPoints={false}
                renderTaskCount={false}
                className='justifyCenter flexColumn pageHeader'
            />
            <div className='pageHeader'>
                <div>{getText(TEXT_QUESTION_PREPARING) + ' '}
                    <br/>
                    <Timer from={content.nextTaskInterval}/>
                </div>
            </div>
            <ActiveHeroes content={content} className='absolute'/>
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
