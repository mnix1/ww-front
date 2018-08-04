import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_END_TASK} from "../../../util/challengeHelper";
import {CHALLENGE_FAST_ROUTE, CHALLENGE_FRIEND_ROUTE, CHALLENGE_RESPONSE_ROUTE} from "../../routes";

class ChallengeEndTaskTaskFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeEndTaskFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {challengeId, answerId, path, status, dispatchChallengeEndTaskPost} = this.props;
        if ((path === CHALLENGE_FRIEND_ROUTE || path === CHALLENGE_RESPONSE_ROUTE || path === CHALLENGE_FAST_ROUTE)
            && status === CHALLENGE_STATUS_END_TASK
            && (path !== prevProps.path || status !== prevProps.status)) {
            dispatchChallengeEndTaskPost(challengeId, answerId);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeEndTaskFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeEndTask'}});
}

export default connect([{
    resource: 'challengeEndTask',
    method: 'post',
    request: (challengeId, answerId) => ({
        url: `/challenge/endTask`,
        body: {challengeId, answerId}
    })
}])(ChallengeEndTaskTaskFetch);