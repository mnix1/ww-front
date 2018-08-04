import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_IN_PROGRESS, CHALLENGE_STATUS_START} from "../../../util/challengeHelper";
import {CHALLENGE_FRIEND_ROUTE, CHALLENGE_RESPONSE_ROUTE} from "../../routes";

class ChallengeStartResponseFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeStartResponseFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {challengeId, path, status, dispatchChallengeStartResponsePost} = this.props;
        if (path !== prevProps.path && path === CHALLENGE_RESPONSE_ROUTE
            && status !== prevProps.status && status === CHALLENGE_STATUS_START) {
            dispatchChallengeStartResponsePost(challengeId);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeStartResponseFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeStartResponse'}});
}

export default connect([{
    resource: 'challengeStartResponse',
    method: 'post',
    request: (challengeId) => ({
        url: `/challenge/startResponse`,
        body: {challengeId}
    })
}])(ChallengeStartResponseFetch);