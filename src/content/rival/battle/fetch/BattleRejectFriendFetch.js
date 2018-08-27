import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_REJECTED_FRIEND} from "../../../../util/battleHelper";

class BattleRejectFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleRejectFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, dispatchBattleRejectFriendPost} = this.props;
        if (prevProps.status !== status && status === BATTLE_STATUS_REJECTED_FRIEND) {
            dispatchBattleRejectFriendPost();
        }
    }

    render() {
        return null;
    }
}

export function clearBattleRejectFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleRejectFriend'}});
}

export default connect([{
    resource: 'battleRejectFriend',
    method: 'post',
    request: () => ({
        url: `/battle/rejectFriend`,
    })
}])(BattleRejectFriendFetch);