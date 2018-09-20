import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_REJECTED_FRIEND} from "../../../util/rivalHelper";
import {repFulfilled} from "../../../util/repositoryHelper";

class RivalRejectFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {rivalRejectFriendFetch, dispatch} = this.props;
        if (repFulfilled(rivalRejectFriendFetch)) {
            clearRivalRejectFriendFetch(dispatch);
        }
    }

    componentWillUnmount() {
        clearRivalRejectFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, dispatchRivalRejectFriendPost} = this.props;
        if (prevProps.status !== status && status === RIVAL_STATUS_REJECTED_FRIEND) {
            dispatchRivalRejectFriendPost();
        }
    }

    render() {
        return null;
    }
}

export function clearRivalRejectFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'rivalRejectFriend'}});
}

export default connect([{
    resource: 'rivalRejectFriend',
    method: 'post',
    request: () => ({
        url: `/rival/rejectFriend`,
    })
}])(RivalRejectFriendFetch);