import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_CANCELED_FRIEND} from "../../../util/rivalHelper";
import {isRepFulfilled} from "../../../util/repositoryHelper";

class RivalCancelFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {rivalCancelFriendFetch, dispatch} = this.props;
        if (isRepFulfilled(rivalCancelFriendFetch)) {
            clearRivalCancelFriendFetch(dispatch);
        }
    }

    componentWillUnmount() {
        clearRivalCancelFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, dispatchRivalCancelFriendPost} = this.props;
        if (prevProps.status !== status && status === RIVAL_STATUS_CANCELED_FRIEND) {
            dispatchRivalCancelFriendPost();
        }
    }

    render() {
        return null;
    }
}

export function clearRivalCancelFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'rivalCancelFriend'}});
}

export default connect([{
    resource: 'rivalCancelFriend',
    method: 'post',
    request: () => ({
        url: `/rival/cancelFriend`,
    })
}])(RivalCancelFriendFetch);