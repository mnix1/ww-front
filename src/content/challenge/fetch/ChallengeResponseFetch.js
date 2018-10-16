import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {responseIdChanged} from "../../../redux/reducer/challenge";
import _ from 'lodash';

class ChallengeResponseFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeResponseFetch, dispatch} = this.props;
        if (isRepFulfilled(challengeResponseFetch)) {
            dispatch(responseIdChanged(undefined));
            clearChallengeResponseFetch(dispatch);
        }
    }

    componentWillUnmount() {
        clearChallengeResponseFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {id, dispatchChallengeResponsePost} = this.props;
        if (!_.isNil(id) && prevProps.id !== id) {
            dispatchChallengeResponsePost(id);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeResponseFetch(dispatch) {
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