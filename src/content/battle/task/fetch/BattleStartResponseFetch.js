import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_OPEN} from "../../../../util/battleHelper";

class BattleStartResponseFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleStartResponseFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {battleId, battleStartResponseRep, status, dispatchBattleStartResponsePost} = this.props;
        if (!battleStartResponseRep && status === BATTLE_STATUS_OPEN) {
            dispatchBattleStartResponsePost(battleId);
        }
    }

    render() {
        return null;
    }
}

export function clearBattleStartResponseFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleStartResponse'}});
}

export default connect([{
    resource: 'battleStartResponse',
    method: 'post',
    request: (battleId) => ({
        url: `/battle/startResponse`,
        body: {battleId}
    })
}])(BattleStartResponseFetch);