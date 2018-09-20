import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_ACCEPTED_FRIEND} from "../../../util/rivalHelper";
import {repFulfilled} from "../../../util/repositoryHelper";

class RivalAcceptFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {rivalAcceptFriendFetch, dispatch} = this.props;
        if (repFulfilled(rivalAcceptFriendFetch)) {
            clearRivalAcceptFriendFetch(dispatch);
        }
    }

    componentWillUnmount() {
        clearRivalAcceptFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, dispatchRivalAcceptFriendPost} = this.props;
        if (prevProps.status !== status && status === RIVAL_STATUS_ACCEPTED_FRIEND) {
            dispatchRivalAcceptFriendPost();
        }
    }

    render() {
        return null;
    }
}

export function clearRivalAcceptFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'rivalAcceptFriend'}});
}

export default connect([{
    resource: 'rivalAcceptFriend',
    method: 'post',
    request: () => ({
        url: `/rival/acceptFriend`,
    })
}])(RivalAcceptFriendFetch);