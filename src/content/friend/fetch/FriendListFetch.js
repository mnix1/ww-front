import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {friendsChanged} from "../../../redux/reducer/friend";
import {FRIEND_ROUTE} from "../../routes";

class FriendListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
        this.store({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        this.store(prevProps);
    }

    componentWillUnmount() {
        clearFriendListFetch(this.props.dispatch);
    }

    store(prevProps) {
        const {friendListRep} = this.props;
        if (friendListRep !== prevProps.friendListRep && friendListRep && friendListRep.value) {
            const value = friendListRep.value;
            this.props.dispatch(friendsChanged(value));
        }
    }

    maybeFetch(prevProps) {
        const {path, friendListRep, dispatchFriendListGet} = this.props;
        if (!friendListRep && path === FRIEND_ROUTE) {
            dispatchFriendListGet();
        }
    }

    render() {
        return null;
    }
}

export function clearFriendListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'friendList'}});
}

export default connect([{
    resource: 'friendList',
    request: () => ({
        url: `/friend/list`
    })
}])(FriendListFetch);