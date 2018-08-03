import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_IN_PROGRESS} from "../../../util/challengeHelper";
import {CHALLENGE_FRIEND_ROUTE} from "../../routes";

class ChallengeFriendStartFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeFriendStartFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tags, path, status, dispatchChallengeFriendStartPost} = this.props;
        if (path === CHALLENGE_FRIEND_ROUTE
            && status === CHALLENGE_STATUS_IN_PROGRESS
            && (path !== prevProps.path || status !== prevProps.status)) {
            dispatchChallengeFriendStartPost(tags);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeFriendStartFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeFriendStart'}});
}

export default connect([{
    resource: 'challengeFriendStart',
    method: 'post',
    request: (tags) => ({
        url: `/challenge/startFriend`,
        body: {tags}
    })
}])(ChallengeFriendStartFetch);