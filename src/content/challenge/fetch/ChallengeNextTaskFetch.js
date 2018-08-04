import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_CLOSED, CHALLENGE_STATUS_NEXT_TASK} from "../../../util/challengeHelper";
import {CHALLENGE_FAST_ROUTE, CHALLENGE_FRIEND_ROUTE, CHALLENGE_RESPONSE_ROUTE} from "../../routes";

class ChallengeNextTaskTaskFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeNextTaskFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {challengeId, path, status, dispatchChallengeNextTaskPost} = this.props;
        if ((path === CHALLENGE_FRIEND_ROUTE || path === CHALLENGE_RESPONSE_ROUTE || path === CHALLENGE_FAST_ROUTE)
            && status === CHALLENGE_STATUS_NEXT_TASK
            && (path !== prevProps.path || status !== prevProps.status)) {
            dispatchChallengeNextTaskPost(challengeId);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeNextTaskFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeNextTask'}});
}

export default connect([{
    resource: 'challengeNextTask',
    method: 'post',
    request: (challengeId) => ({
        url: `/challenge/nextTask`,
        body: {challengeId}
    })
}])(ChallengeNextTaskTaskFetch);