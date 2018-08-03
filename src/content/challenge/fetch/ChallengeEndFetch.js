import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_CLOSED, CHALLENGE_STATUS_IN_PROGRESS} from "../../../util/challengeHelper";
import {CHALLENGE_FRIEND_ROUTE, CHALLENGE_RESPONSE_ROUTE} from "../../routes";

class ChallengeEndFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeEndFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {challengeId, questionIdAnswerIdMap, path, status, dispatchChallengeEndPost} = this.props;
        if ((path === CHALLENGE_FRIEND_ROUTE || path === CHALLENGE_RESPONSE_ROUTE)
            && status === CHALLENGE_STATUS_CLOSED
            && (path !== prevProps.path || status !== prevProps.status)) {
            dispatchChallengeEndPost(challengeId, questionIdAnswerIdMap);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeEndFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeEnd'}});
}

export default connect([{
    resource: 'challengeEnd',
    method: 'post',
    request: (challengeId, questionIdAnswerIdMap) => ({
        url: `/challenge/end`,
        body: {challengeId, questionIdAnswerIdMap}
    })
}])(ChallengeEndFetch);