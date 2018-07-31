import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_REJECTED} from "../../../../util/battleHelper";

class BattleRejectFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleRejectFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, rep, dispatchBattleRejectPost} = this.props;
        if (prevProps.status !== status && status === BATTLE_STATUS_REJECTED) {
            dispatchBattleRejectPost();
        }
    }

    render() {
        return null;
    }
}

export function clearBattleRejectFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleReject'}});
}

export default connect([{
    resource: 'battleReject',
    method: 'post',
    request: () => ({
        url: `/battle/reject`,
    })
}])(BattleRejectFetch);