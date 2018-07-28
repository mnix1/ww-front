import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_IN_PROGRESS} from "../../../../util/battleHelper";

class BattleEndFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleEndFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {battleId, questionIdAnswerIdMap, battleEndRep, status, dispatchBattleEndPost} = this.props;
        if (!battleEndRep && status === BATTLE_STATUS_IN_PROGRESS) {
            dispatchBattleEndPost(battleId, questionIdAnswerIdMap);
        }
    }

    render() {
        return null;
    }
}

export function clearBattleEndFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleEnd'}});
}

export default connect([{
    resource: 'battleEnd',
    method: 'post',
    request: (battleId, questionIdAnswerIdMap) => ({
        url: `/battle/end`,
        body: {battleId, questionIdAnswerIdMap}
    })
}])(BattleEndFetch);