import React from 'react';
import {connect} from 'react-redux';
import {statusChanged} from "../../../../redux/reducer/battle";
import {BATTLE_STATUS_ERROR_FAST, BATTLE_STATUS_WAITING_FAST} from "../../../../util/battleHelper";
import _ from 'lodash';
import BattleStartFastFetch from "./BattleStartFastFetch";
import BattleCancelFastFetch from "./BattleCancelFastFetch";

class BattleFetchContainer extends React.PureComponent {

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
       this.resolveFast();
    }

    render() {
        const {status} = this.props;
        return <div>
            <BattleStartFastFetch status={status}/>
            <BattleCancelFastFetch status={status}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        status: state.battle.status,
        battleStartFastRep: state.repository.battleStartFast,
        battleCancelFastRep: state.repository.battleCancelFast,
    }),
    (dispatch) => ({
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
    })
)(BattleFetchContainer);
