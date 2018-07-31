import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_IN_PROGRESS} from "../../../../util/challengeHelper";

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
        const {challengeId, questionIdAnswerIdMap, challengeEndRep, status, dispatchChallengeEndPost} = this.props;
        if (!challengeEndRep && status === CHALLENGE_STATUS_IN_PROGRESS) {
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