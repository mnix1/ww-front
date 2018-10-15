import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import _ from 'lodash';
import {isRepFulfilled, isRepValueCode1} from "../../../util/repositoryHelper";
import {joinIdChanged} from "../../../redux/reducer/challenge";

class ChallengeJoinFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeJoinFetch, dispatch} = this.props;
        if (isRepFulfilled(challengeJoinFetch)) {
            dispatch(joinIdChanged(undefined));
            if (isRepValueCode1(challengeJoinFetch)) {
                dispatch(joinIdChanged(undefined));
            }
        }
    }

    componentWillUnmount() {
        clearChallengeJoinFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {id, dispatchChallengeJoinPost} = this.props;
        if (!_.isNil(id) && id !== prevProps.id) {
            dispatchChallengeJoinPost(id);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeJoinFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeJoin'}});
}

export default connect([{
    resource: 'challengeJoin',
    method: 'post',
    request: (id) => ({
        url: `/challenge/join`,
        body: {id}
    })
}])(ChallengeJoinFetch);