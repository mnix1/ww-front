import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_ACTIVE_ROUTE, CHALLENGE_CREATE_ROUTE} from "../../routes";
import {isRepFulfilled, isRepValueCode1} from "../../../util/repositoryHelper";
import {initChanged} from "../../../redux/reducer/challenge";
import {push} from 'connected-react-router'
import _ from "lodash";

class ChallengeCreateFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeCreateFetch, dispatch} = this.props;
        if (isRepFulfilled(challengeCreateFetch)) {
            if (isRepValueCode1(challengeCreateFetch)) {
                dispatch(push(CHALLENGE_ACTIVE_ROUTE));
                dispatch(initChanged(undefined));
            }
            clearChallengeCreateFetch(dispatch);
        }
    }

    componentWillUnmount() {
        clearChallengeCreateFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, tags, init, access, resourceCost, resourceType, duration, dispatchChallengeCreatePost} = this.props;
        if (path === CHALLENGE_CREATE_ROUTE
            && !_.isNil(init)
            && (prevProps.path !== path || prevProps.init !== init)) {
            dispatchChallengeCreatePost({tags, access, resourceCost, resourceType, duration});
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeCreateFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeCreate'}});
}

export default connect([{
    resource: 'challengeCreate',
    method: 'post',
    request: (data) => ({
        url: `/challenge/create`,
        body: data
    })
}])(ChallengeCreateFetch);