import React from 'react';
import {connect} from 'react-redux';
import BattleStartFetch from "./BattleStartFetch";
import BattleCancelFetch from "./BattleCancelFetch";
import BattleRejectFetch, {clearBattleRejectFetch} from "./BattleRejectFetch";
import BattleAcceptFetch, {clearBattleAcceptFetch} from "./BattleAcceptFetch";
import {battleCleared, statusChanged} from "../../../../redux/reducer/battle";
import {
    BATTLE_STATUS_ACCEPTED,
    BATTLE_STATUS_CANCELED,
    BATTLE_STATUS_ERROR,
    BATTLE_STATUS_IN_PROGRESS,
    BATTLE_STATUS_REJECTED,
    BATTLE_STATUS_WAITING
} from "../../../../util/battleHelper";
import _ from 'lodash';
import {BATTLE_ROUTE} from "../../../app/appRoutes";
import {push} from 'connected-react-router'

class BattleFetchContainer extends React.PureComponent {

    componentDidUpdate() {
        const {battleStartRep, battleRejectRep, battleCancelRep, battleAcceptRep, onStatusChange, status, onBattleClear, onBattleInProgress} = this.props;
        if (status === BATTLE_STATUS_WAITING) {
            return;
        }
        const code = _.get(battleStartRep, 'value.code');
        if (code === -1) {
            onStatusChange(BATTLE_STATUS_ERROR);
        } else if (code === 1) {
            onStatusChange(BATTLE_STATUS_WAITING);
        }
        if (status === BATTLE_STATUS_REJECTED && battleRejectRep && battleRejectRep.fulfilled) {
            onBattleClear();
        }
        if (status === BATTLE_STATUS_CANCELED && battleCancelRep && battleCancelRep.fulfilled) {
            onBattleClear();
        }
        if (status === BATTLE_STATUS_ACCEPTED && battleAcceptRep && battleAcceptRep.fulfilled) {
            onBattleInProgress();
        }
    }

    render() {
        const {tag, status} = this.props;
        return <div>
            <BattleStartFetch status={status} tag={tag}/>
            <BattleCancelFetch status={status}/>
            <BattleRejectFetch status={status}/>
            <BattleAcceptFetch status={status}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        status: state.battle.status,
        tag: state.battle.tag,
        battleStartRep: state.repository.battleStart,
        battleRejectRep: state.repository.battleReject,
        battleCancelRep: state.repository.battleCancel,
        battleAcceptRep: state.repository.battleAccept,
    }),
    (dispatch) => ({
        onBattleClear: () => {
            clearBattleRejectFetch(dispatch);
            dispatch(battleCleared());
        },
        onBattleInProgress: () => {
            clearBattleAcceptFetch(dispatch);
            dispatch(battleCleared());
            dispatch(statusChanged(BATTLE_STATUS_IN_PROGRESS));
            dispatch(push(BATTLE_ROUTE));
        },
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        }
    })
)(BattleFetchContainer);
