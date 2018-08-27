import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_ACCEPTED_FRIEND} from "../../../../util/battleHelper";

class BattleAcceptFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleAcceptFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, dispatchBattleAcceptFriendPost} = this.props;
        if (prevProps.status !== status && status === BATTLE_STATUS_ACCEPTED_FRIEND) {
            dispatchBattleAcceptFriendPost();
        }
    }

    render() {
        return null;
    }
}

export function clearBattleAcceptFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleAcceptFriend'}});
}

export default connect([{
    resource: 'battleAcceptFriend',
    method: 'post',
    request: () => ({
        url: `/battle/acceptFriend`,
    })
}])(BattleAcceptFriendFetch);