import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {
    RIVAL_STATUS_ERROR_FRIEND,
    RIVAL_STATUS_ERROR_RANDOM_OPPONENT,
    RIVAL_STATUS_START_FRIEND,
    RIVAL_STATUS_WAITING_FRIEND
} from "../../../util/rivalHelper";
import {isRepValueCode1} from "../../../util/repositoryHelper";
import {statusChanged} from "../../../redux/reducer/rival";
import {clearRivalStartRandomOpponentFetch} from "./RivalStartRandomOpponentFetch";

class RivalStartFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {rivalStartFriendFetch, dispatch, status} = this.props;
        if (!prevProps.rivalStartFriendFetch.fulfilled && rivalStartFriendFetch.fulfilled && status === RIVAL_STATUS_START_FRIEND) {
            if (isRepValueCode1(rivalStartFriendFetch)) {
                dispatch(statusChanged(RIVAL_STATUS_WAITING_FRIEND));
            } else {
                dispatch(statusChanged(RIVAL_STATUS_ERROR_FRIEND));
            }
            clearRivalStartFriendFetch(dispatch);
        }
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