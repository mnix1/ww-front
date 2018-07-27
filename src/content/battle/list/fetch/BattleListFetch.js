import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_OPEN} from "../../../../util/battleHelper";

class BattleListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {battleListRep, dispatchBattleListGet} = this.props;
        if (!battleListRep) {
            dispatchBattleListGet();
        }
    }

    render() {
        return null;
    }
}

export function clearBattleListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleList'}});
}

export default connect([{
    resource: 'battleList',
    request: () => ({
        url: `/battle/list`,
    })
}])(BattleListFetch);