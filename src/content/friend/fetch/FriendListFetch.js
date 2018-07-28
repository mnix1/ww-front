import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {OBJECT_APP_FRIEND} from "../../object-group/objectsApp";

class FriendListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearFriendListFetch(this.props.dispatch);
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