import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_CANCELED_FRIEND} from "../../../util/battleHelper";

class BattleCancelFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleCancelFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, dispatchBattleCancelFriendPost} = this.props;
        if (prevProps.status !== status && status === BATTLE_STATUS_CANCELED_FRIEND) {
            dispatchBattleCancelFriendPost();
        }
    }

    render() {
        return null;
    }
}

export function clearBattleCancelFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleCancelFriend'}});
}

export default connect([{
    resource: 'battleCancelFriend',
    method: 'post',
    request: () => ({
        url: `/battle/cancelFriend`,
    })
}])(BattleCancelFriendFetch);