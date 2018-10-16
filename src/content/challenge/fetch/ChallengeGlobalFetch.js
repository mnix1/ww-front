import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_GLOBAL_ROUTE, CHALLENGE_PRIVATE_ROUTE} from "../../routes";
import {isRepValueCode1} from "../../../util/repositoryHelper";

class ChallengeGlobalFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeGlobalFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, dispatchChallengeGlobalPost, challengeJoinRep} = this.props;
        if (path === CHALLENGE_GLOBAL_ROUTE && ((isRepValueCode1(challengeJoinRep) && path !== CHALLENGE_PRIVATE_ROUTE) || prevProps.path !== path)) {
            dispatchChallengeGlobalPost();
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeGlobalFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeGlobal'}});
}

export default connect([{
    resource: 'challengeGlobal',
    method: 'post',
    request: () => ({
        url: `/challenge/global`,
        body: {},
    })
}])(ChallengeGlobalFetch);