import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_IN_PROGRESS} from "../../../util/challengeHelper";

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
        const {challengeId, challengeStartResponseRep, status, dispatchChallengeStartResponsePost} = this.props;
        if (!challengeStartResponseRep && status === CHALLENGE_STATUS_IN_PROGRESS) {
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