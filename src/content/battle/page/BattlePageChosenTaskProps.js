import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RandomTaskProps from "./component/RandomTaskProps";
import Profiles from "./component/Profiles";
import ChoosingTaskProps from "./component/ChoosingTaskProps";
import TaskDescription from "./component/TaskDescription";

class BattlePageChosenTaskProps extends React.PureComponent {

    renderContent() {
        const {content, communication, profile} = this.props;
        const {choosingTaskPropsTag} = content;
        if (_.isNil(choosingTaskPropsTag)) {
            return <RandomTaskProps/>;
        }
        if(choosingTaskPropsTag === profile.tag){
            return <ChoosingTaskProps communication={communication}/>
        }
        return <div style={{width: 120}}>
        </div>
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent battlePageChosenTaskProps'>
            <Profiles className='profilesAbsolute'/>
            <TaskDescription taskId={content.taskId}/>
            <div>
                Wybrano kategorię i trudność
            </div>
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
)(BattlePageChosenTaskProps);
