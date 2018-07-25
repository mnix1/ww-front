import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";

class FriendListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        if (!this.props.list) {
            this.maybeFetch(prevProps);
        }
    }

    componentWillUnmount() {
        clearFriendListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        this.props.dispatchFriendListGet();
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