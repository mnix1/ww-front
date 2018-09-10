import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_START_FRIEND, RIVAL_STATUS_WAITING_FRIEND} from "../../../util/rivalHelper";
import {CHALLENGE_ROUTE} from "../../routes";
import {isRepValueCode1} from "../../../util/repositoryHelper";
import {statusChanged} from "../../../redux/reducer/rival";
import {responseIdChanged} from "../../../redux/reducer/challenge";

class ChallengeResponseFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeResponseFetch, dispatch, status} = this.props;
        if (!prevProps.challengeResponseFetch.fulfilled && challengeResponseFetch.fulfilled && status === RIVAL_STATUS_START_FRIEND) {
            if (isRepValueCode1(challengeResponseFetch)) {
                dispatch(statusChanged(RIVAL_STATUS_WAITING_FRIEND));
                dispatch(responseIdChanged(undefined));
            }
        }
    }

    componentWillUnmount() {
        clearCampaignResponseFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, id, status, dispatchChallengeResponsePost} = this.props;
        if (path === CHALLENGE_ROUTE
            && prevProps.status !== status
            && status === RIVAL_STATUS_START_FRIEND) {
            dispatchChallengeResponsePost(id);
        }
    }

    render() {
        return null;
    }
}

export function clearCampaignResponseFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeResponse'}});
}

export default connect([{
    resource: 'challengeResponse',
    method: 'post',
    request: (id) => ({
        url: `/challenge/response`,
        body: {id}
    })
}])(ChallengeResponseFetch);