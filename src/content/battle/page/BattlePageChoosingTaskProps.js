import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RandomTaskProps from "./component/RandomTaskProps";
import Profiles from "./component/Profiles";
import ChoosingTaskProps from "./component/ChoosingTaskProps";
import TaskDescription from "./component/TaskDescription";
import {getText, TEXT_OPPONENT_CHOOSING, TEXT_TIME} from "../../../lang";
import sleep from '../../../media/image/icon/sleep.svg';
import Timer from "../../../component/timer/Timer";

class BattlePageChoosingTaskProps extends React.PureComponent {

    renderOpponentChoosing(){
        const {content, screen} = this.props;
        return <div>
            <div className='pageHeader justifyCenter'>
                <div style={{width: screen.contentWidth / 3}}>
                    {getText(TEXT_OPPONENT_CHOOSING)}
                </div>
            </div>
            <div className='pageHeader'><img className='sleep' src={sleep} height={80}/></div>
            <div className='pageHeader'>{`${getText(TEXT_TIME)}: `}<Timer from={content.choosingTaskPropsInterval}/>
            </div>
        </div>
    }

    renderContent() {
        const {content, communication, profile, screen} = this.props;
        const {choosingTaskPropsTag} = content;
        if (_.isNil(choosingTaskPropsTag)) {
            return <RandomTaskProps/>;
        }
        if (choosingTaskPropsTag === profile.tag) {
            return <ChoosingTaskProps communication={communication}/>
        }
        return this.renderOpponentChoosing();
    }

    render() {
        const {content} = this.props;
        const {choosingTaskPropsTag} = content;
        return <div className='pageContent battlePageChoosingTaskProps'>
            <Profiles className='profilesAbsolute'/>
            {!_.isNil(choosingTaskPropsTag) && <TaskDescription className='pageHeader' taskId={content.taskId}/>}
            {this.renderContent()}
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
)(BattlePageChoosingTaskProps);
