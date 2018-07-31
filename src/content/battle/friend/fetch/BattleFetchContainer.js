import React from 'react';
import {connect} from 'react-redux';
import {socketCreated} from "../../../../redux/reducer/socket";
import BattleStartFetch from "./BattleStartFetch";
import BattleCancelFetch from "./BattleCancelFetch";
import BattleRejectFetch, {clearBattleRejectFetch} from "./BattleRejectFetch";
import BattleAcceptFetch from "./BattleAcceptFetch";
import {battleCleared, statusChanged} from "../../../../redux/reducer/battle";
import {
    BATTLE_STATUS_CANCELED,
    BATTLE_STATUS_ERROR,
    BATTLE_STATUS_REJECTED,
    BATTLE_STATUS_WAITING
} from "../../../../util/battleHelper";
import _ from 'lodash';

class BattleFetchContainer extends React.PureComponent {

    componentDidUpdate() {
        const {battleStartRep, battleRejectRep,  battleCancelRep, onStatusChange, status, onClear} = this.props;
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
            onClear();
        }
        if (status === BATTLE_STATUS_CANCELED && battleCancelRep && battleCancelRep.fulfilled) {
            onClear();
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
    }),
    (dispatch) => ({
        onClear: () => {
            clearBattleRejectFetch(dispatch);
            dispatch(battleCleared())
        },
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
        onInit: (socket) => {
            socket.setDispatch(dispatch);
            dispatch(socketCreated(socket));
        }
    })
)(BattleFetchContainer);
