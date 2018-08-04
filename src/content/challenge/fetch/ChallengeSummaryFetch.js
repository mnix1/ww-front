import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import _ from 'lodash';
import {CHALLENGE_SUMMARY_ROUTE} from "../../routes";
class ChallengeSummaryFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeSummaryFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {challengeId, path, dispatchChallengeSummaryPost} = this.props;
        if (!_.isNil(challengeId) && path === CHALLENGE_SUMMARY_ROUTE && prevProps.path !== path) {
            dispatchChallengeSummaryPost(challengeId);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeSummaryFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeSummary'}});
}

export default connect([{
    resource: 'challengeSummary',
    method: 'post',
    request: (challengeId) => ({
        url: `/challenge/summary`,
        body: {challengeId}
    })
}])(ChallengeSummaryFetch);