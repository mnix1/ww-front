import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_OPEN} from "../../../../util/battleHelper";

class BattleFriendStartFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleFriendStartFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tags, battleFriendStartRep, status, dispatchBattleFriendStartPost} = this.props;
        if (!battleFriendStartRep && status === BATTLE_STATUS_OPEN) {
            dispatchBattleFriendStartPost(tags);
        }
    }

    render() {
        return null;
    }
}

export function clearBattleFriendStartFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleFriendStart'}});
}

export default connect([{
    resource: 'battleFriendStart',
    method: 'post',
    request: (tags) => ({
        url: `/battle/startFriend`,
        body: {tags}
    })
}])(BattleFriendStartFetch);