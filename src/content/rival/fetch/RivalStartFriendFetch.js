import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_START_FRIEND,} from "../../../util/rivalHelper";
import {isRepValueCode1, repFulfilled} from "../../../util/repositoryHelper";
import {noticeError} from "../../../component/notification/noticeError";
import {ERROR_FRIEND_CANT_PLAY_RIGHT_NOW} from "../../../lang/langError";
import {rivalCleared} from "../../../redux/reducer/rival";

class RivalStartFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {rivalStartFriendFetch, dispatch} = this.props;
        if (repFulfilled(rivalStartFriendFetch)) {
            if (!isRepValueCode1(rivalStartFriendFetch)) {
                noticeError(ERROR_FRIEND_CANT_PLAY_RIGHT_NOW);
                dispatch(rivalCleared());
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