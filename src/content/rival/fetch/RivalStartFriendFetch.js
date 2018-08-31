import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_START_FRIEND} from "../../../util/rivalHelper";

class RivalStartFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearRivalStartFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tag, rivalType, status, dispatchRivalStartFriendPost} = this.props;
        if (prevProps.status !== status && status === RIVAL_STATUS_START_FRIEND) {
            dispatchRivalStartFriendPost(tag, rivalType);
        }
    }

    render() {
        return null;
    }
}

export function clearRivalStartFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'rivalStartFriend'}});
}

export default connect([{
    resource: 'rivalStartFriend',
    method: 'post',
    request: (tag, type) => ({
        url: `/rival/startFriend`,
        body: {tag, type}
    })
}])(RivalStartFriendFetch);