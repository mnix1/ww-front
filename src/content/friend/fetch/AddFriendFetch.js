import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";

class AddFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearAddFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tag, dispatchAddFriendPost} = this.props;
        if (tag !== undefined && prevProps.tag !== tag) {
            dispatchAddFriendPost(tag);
        }
    }

    render() {
        return null;
    }
}

export function clearAddFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'addFriend'}});
}

export default connect([{
    resource: 'addFriend',
    method:'post',
    request: (tag) => ({
        url: `/friend/add`,
        body: {tag}
    })
}])(AddFriendFetch);