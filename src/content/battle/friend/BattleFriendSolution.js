import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import BattleFriendStartFetch from "./fetch/BattleFriendStartFetch";
import Task from "../../../component/task/Task";
import {
    questionIdAnswerIdMapChanged,
    questionIdSkipAnimationMapChanged,
    questionIndexChanged, statusChanged
} from "../../../redux/reducer/battle";
import {getText, TEXT_QUESTION} from "../../../lang";
import {BATTLE_STATUS_IN_PROGRESS} from "../../../util/battleHelper";
import BattleFriendEndFetch from "./fetch/BattleFriendEndFetch";

class BattleFriendTask extends React.PureComponent {

    renderTask(battle) {
    }

    render() {
        const {battleFriendEndRep} = this.props;
        const shouldRenderTask =  battleFriendEndRep && battleFriendEndRep.fulfilled;
        return <div>
            {shouldRenderTask && this.renderTask(battleFriendEndRep.value.battle)}

        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        battleFriendEndRep: state.repository.battleFriendEnd,
    }),
    (dispatch) => ({
    })
)(BattleFriendTask);
