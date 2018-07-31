import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_CANCELED} from "../../../../util/battleHelper";

class BattleCancelFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleCancelFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, dispatchBattleCancelPost} = this.props;
        if (prevProps.status !== status && status === BATTLE_STATUS_CANCELED) {
            dispatchBattleCancelPost();
        }
    }

    render() {
        return null;
    }
}

export function clearBattleCancelFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleCancel'}});
}

export default connect([{
    resource: 'battleCancel',
    method: 'post',
    request: () => ({
        url: `/battle/cancel`,
    })
}])(BattleCancelFetch);