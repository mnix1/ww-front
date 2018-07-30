import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {OBJECT_APP_FRIEND} from "../../object-group/objectsApp";
import {friendsChanged} from "../../../redux/reducer/friend";

class FriendListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
        this.store();
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        this.store();
    }

    componentWillUnmount() {
        clearFriendListFetch(this.props.dispatch);
    }

    store() {
        const {friendListRep} = this.props;
        if (friendListRep && friendListRep.value) {
            const value = friendListRep.value;
            this.props.dispatch(friendsChanged(value));
        }
    }

    maybeFetch(prevProps) {
        const {contentId, friendListRep, dispatchFriendListGet} = this.props;
        if (!friendListRep && contentId === OBJECT_APP_FRIEND) {
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