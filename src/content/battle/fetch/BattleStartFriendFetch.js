import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_START_FRIEND} from "../../../util/battleHelper";

class BattleStartFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleStartFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tag, status, dispatchBattleStartFriendPost} = this.props;
        if (prevProps.status !== status && status === BATTLE_STATUS_START_FRIEND) {
            dispatchBattleStartFriendPost(tag);
        }
    }

    render() {
        return null;
    }
}

export function clearBattleStartFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleStartFriend'}});
}

export default connect([{
    resource: 'battleStartFriend',
    method: 'post',
    request: (tag) => ({
        url: `/battle/startFriend`,
        body: {tag}
    })
}])(BattleStartFriendFetch);