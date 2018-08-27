import React from 'react';
import {connect} from 'react-redux';
import BattleStartFriendFetch from "./BattleStartFriendFetch";
import BattleCancelFriendFetch from "./BattleCancelFriendFetch";
import BattleRejectFriendFetch, {clearBattleRejectFriendFetch} from "./BattleRejectFriendFetch";
import BattleAcceptFriendFetch, {clearBattleAcceptFriendFetch} from "./BattleAcceptFriendFetch";
import {battleCleared, statusChanged} from "../../../../redux/reducer/battle";
import {
    BATTLE_STATUS_ACCEPTED_FRIEND,
    BATTLE_STATUS_CANCELED_FRIEND,
    BATTLE_STATUS_ERROR_FAST,
    BATTLE_STATUS_ERROR_FRIEND,
    BATTLE_STATUS_READY_TO_BEGIN_FRIEND,
    BATTLE_STATUS_REJECTED_FRIEND,
    BATTLE_STATUS_WAITING_FAST,
    BATTLE_STATUS_WAITING_FRIEND
} from "../../../../util/battleHelper";
import _ from 'lodash';
import {BATTLE_ROUTE} from "../../../routes";
import {push} from 'connected-react-router'
import BattleStartFastFetch from "./BattleStartFastFetch";
import BattleCancelFastFetch from "./BattleCancelFastFetch";

class BattleFetchContainer extends React.PureComponent {

    resolveFriend(){
        const {battleStartFriendRep, battleRejectFriendRep, battleCancelFriendRep, battleAcceptFriendRep, onStatusChange, status, onBattleFriendClear, onBattleFriendInProgress} = this.props;
        if (status === BATTLE_STATUS_WAITING_FRIEND) {
            return;
        }
        const code = _.get(battleStartFriendRep, 'value.code');
        if (code === -1) {
            onStatusChange(BATTLE_STATUS_ERROR_FRIEND);
        } else if (code === 1) {
            onStatusChange(BATTLE_STATUS_WAITING_FRIEND);
        }
        if (status === BATTLE_STATUS_REJECTED_FRIEND && battleRejectFriendRep && battleRejectFriendRep.fulfilled) {
            onBattleFriendClear();
        }
        if (status === BATTLE_STATUS_CANCELED_FRIEND && battleCancelFriendRep && battleCancelFriendRep.fulfilled) {
            onBattleFriendClear();
        }
        if (status === BATTLE_STATUS_ACCEPTED_FRIEND && battleAcceptFriendRep && battleAcceptFriendRep.fulfilled) {
            onBattleFriendInProgress();
        }
    }

    resolveFast(){
        const {battleStartFastRep, onStatusChange, status} = this.props;
        if (status === BATTLE_STATUS_WAITING_FAST) {
            return;
        }
        const code = _.get(battleStartFastRep, 'value.code');
        if (code === -1) {
            onStatusChange(BATTLE_STATUS_ERROR_FAST);
        } else if (code === 1) {
            onStatusChange(BATTLE_STATUS_WAITING_FAST);
        }
    }

    componentDidUpdate() {
       this.resolveFriend();
       this.resolveFast();
    }

    render() {
        const {tag, status} = this.props;
        return <div>
            <BattleStartFriendFetch status={status} tag={tag}/>
            <BattleCancelFriendFetch status={status}/>
            <BattleRejectFriendFetch status={status}/>
            <BattleAcceptFriendFetch status={status}/>

            <BattleStartFastFetch status={status}/>
            <BattleCancelFastFetch status={status}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        status: state.battle.status,
        tag: state.battle.tag,
        battleStartFriendRep: state.repository.battleStartFriend,
        battleRejectFriendRep: state.repository.battleRejectFriend,
        battleCancelFriendRep: state.repository.battleCancelFriend,
        battleAcceptFriendRep: state.repository.battleAcceptFriend,

        battleStartFastRep: state.repository.battleStartFast,
        battleCancelFastRep: state.repository.battleCancelFast,
    }),
    (dispatch) => ({
        onBattleFriendClear: () => {
            clearBattleRejectFriendFetch(dispatch);
            dispatch(battleCleared());
        },
        onBattleFriendInProgress: () => {
            clearBattleAcceptFriendFetch(dispatch);
            dispatch(battleCleared());
            dispatch(statusChanged(BATTLE_STATUS_READY_TO_BEGIN_FRIEND));
            dispatch(push(BATTLE_ROUTE));
        },
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
    })
)(BattleFetchContainer);
