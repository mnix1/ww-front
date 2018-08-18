import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_CANCELED_FAST} from "../../../util/battleHelper";

class BattleCancelFastFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleCancelFastFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, dispatchBattleCancelFastPost} = this.props;
        if (prevProps.status !== status && status === BATTLE_STATUS_CANCELED_FAST) {
            dispatchBattleCancelFastPost();
        }
    }

    render() {
        return null;
    }
}

export function clearBattleCancelFastFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleCancelFast'}});
}

export default connect([{
    resource: 'battleCancelFast',
    method: 'post',
    request: () => ({
        url: `/battle/cancelFast`,
    })
}])(BattleCancelFastFetch);