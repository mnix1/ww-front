import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_HISTORY_ROUTE, CHALLENGE_ACTIVE_ROUTE, CHALLENGE_PRIVATE_ROUTE} from "../../routes";
import {CHALLENGE_STATUS_CLOSED, CHALLENGE_STATUS_IN_PROGRESS} from "../../../util/challengeHelper";
import _ from 'lodash';

class ChallengeListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, id, dispatchChallengeListPost} = this.props;
        if ((_.isNil(id) && prevProps.id !== id) || prevProps.path !== path) {
            if (path === CHALLENGE_HISTORY_ROUTE) {
                dispatchChallengeListPost(CHALLENGE_STATUS_CLOSED, true);
            } else if (path === CHALLENGE_ACTIVE_ROUTE) {
                dispatchChallengeListPost(CHALLENGE_STATUS_IN_PROGRESS, true);
            } else if (path === CHALLENGE_PRIVATE_ROUTE) {
                dispatchChallengeListPost(CHALLENGE_STATUS_IN_PROGRESS, false);
            }
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeList'}});
}

export default connect([{
    resource: 'challengeList',
    method: 'post',
    request: (status, participant) => ({
        url: `/challenge/list`,
        body: {status, participant}
    })
}])(ChallengeListFetch);