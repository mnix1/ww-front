import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_START_FRIEND} from "../../../util/rivalHelper";
import {CHALLENGE_ROUTE} from "../../routes";
import {repFulfilled} from "../../../util/repositoryHelper";
import {responseIdChanged} from "../../../redux/reducer/challenge";
import _ from 'lodash';

class ChallengeResponseFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeResponseFetch, dispatch} = this.props;
        if (repFulfilled(challengeResponseFetch)) {
            dispatch(responseIdChanged(undefined));
            clearCampaignResponseFetch(dispatch);
        }
    }

    componentWillUnmount() {
        clearCampaignResponseFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, id, status, dispatchChallengeResponsePost} = this.props;
        if (path === CHALLENGE_ROUTE
            && !_.isNil(id)
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