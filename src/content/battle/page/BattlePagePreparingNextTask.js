import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_QUESTION_PREPARING} from "../../../lang";
import Timer from "../../../component/timer/Timer";
import TaskDescription from "./component/TaskDescription";
import Profiles from "./component/Profiles";

class BattlePagePreparingNextTask extends React.PureComponent {

    render() {
        const {content} = this.props;
        return <div className='pageContent battlePagePreparingNextTask'>
            <TaskDescription className='pageHeader'/>
            <div className='pageHeader'>
                <div>{getText(TEXT_QUESTION_PREPARING) + ' '}
                <br/>
                    <Timer from={content.nextTaskInterval}/>
                </div>
            </div>
            <Profiles className='absolute'/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.battle.content,
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(BattlePagePreparingNextTask);
