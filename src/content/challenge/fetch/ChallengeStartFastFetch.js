import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_IN_PROGRESS, CHALLENGE_STATUS_START} from "../../../util/challengeHelper";
import {CHALLENGE_FAST_ROUTE} from "../../routes";
import {inProgressIdChanged} from "../../../redux/reducer/challenge";
import _ from 'lodash';

class ChallengeStartFastFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const lastValue = _.get(prevProps.challengeStartFastRep, 'value');
        const newValue = _.get(this.props.challengeStartFastRep, 'value');
        if (lastValue !== newValue && !_.isNil(newValue)) {
            this.props.dispatch(inProgressIdChanged(newValue.id));
        }
    }

    componentWillUnmount() {
        clearChallengeStartFastFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, status, dispatchChallengeStartFastPost} = this.props;
        if (status === CHALLENGE_STATUS_START && path === CHALLENGE_FAST_ROUTE
            && (status !== prevProps.status || path !== prevProps.path)) {
            dispatchChallengeStartFastPost();
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeStartFastFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeStartFast'}});
}

export default connect([{
    resource: 'challengeStartFast',
    method: 'post',
    request: () => ({
        url: `/challenge/startFast`,
        body: {}
    })
}])(ChallengeStartFastFetch);