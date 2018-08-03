import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_HISTORY_ROUTE, CHALLENGE_LIST_ROUTE} from "../../routes";
import {CHALLENGE_STATUS_CLOSED, CHALLENGE_STATUS_IN_PROGRESS} from "../../../util/challengeHelper";

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
        const {path, dispatchChallengeListPost} = this.props;
        if (prevProps.path !== path && path === CHALLENGE_HISTORY_ROUTE) {
            dispatchChallengeListPost(CHALLENGE_STATUS_CLOSED);
        } else if (prevProps.path !== path && path === CHALLENGE_LIST_ROUTE) {
            dispatchChallengeListPost(CHALLENGE_STATUS_IN_PROGRESS);
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
    request: (status) => ({
        url: `/challenge/list`,
        body: status ? {status} : {}
    })
}])(ChallengeListFetch);