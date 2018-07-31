import React from 'react';
import {connect} from 'react-redux';
import BattleStartFetch from "./fetch/BattleStartFetch";
import {idChanged} from "../../../redux/reducer/content";
import _ from 'lodash';
import {battleCleared, statusChanged} from "../../../redux/reducer/battle";
import {BATTLE_STATUS_CANCELED, BATTLE_STATUS_ERROR, BATTLE_STATUS_OPEN} from "../../../util/battleHelper";
import InviteToBattle from "../invite/InviteToBattle";
import BattleCancelFetch from "./fetch/BattleCancelFetch";

class BattlePage extends React.PureComponent {

    componentDidUpdate() {
        const {status, battleStartRep, onStatusChange, onContentIdChange, battleCancelRep} = this.props;
        if (status) {
            if (status === BATTLE_STATUS_CANCELED && battleCancelRep && battleCancelRep.fulfilled) {
                onContentIdChange(undefined)
            }
            return null;
        }
        const code = _.get(battleStartRep, 'value.code');
        if (code === -1) {
            onStatusChange(BATTLE_STATUS_ERROR);
        } else if (code === 1) {
            onStatusChange(BATTLE_STATUS_OPEN);
        }
    }

    renderContent() {
        const {status} = this.props;
        if (status === BATTLE_STATUS_ERROR) {
            return 'ERROR';
        }
        if (status === BATTLE_STATUS_OPEN) {
            return <InviteToBattle/>;
        }
        return null;
    }

    render() {
        const {tag, status, battleStartRep, battleCancelRep} = this.props;
        return <div>
            {this.renderContent()}
            <BattleStartFetch rep={battleStartRep} status={status} tag={tag}/>
            <BattleCancelFetch rep={battleCancelRep} status={status}/>
        </div>
    }
}

export default connect(
    (state) => ({
        tag: state.battle.tag,
        status: state.battle.status,
        battleStartRep: state.repository.battleStart,
        battleCancelRep: state.repository.battleCancel,
    }),
    (dispatch) => ({
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
        onContentIdChange: (id) => {
            dispatch(battleCleared());
            dispatch(idChanged(id));
        },
    })
)(BattlePage);
