import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_IN_PROGRESS} from "../../../util/challengeHelper";

class ChallengeFriendStartFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeFriendStartFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tags, challengeFriendStartRep, status, dispatchChallengeFriendStartPost} = this.props;
        if (!challengeFriendStartRep && status === CHALLENGE_STATUS_IN_PROGRESS) {
            dispatchChallengeFriendStartPost(tags);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeFriendStartFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeFriendStart'}});
}

export default connect([{
    resource: 'challengeFriendStart',
    method: 'post',
    request: (tags) => ({
        url: `/challenge/startFriend`,
        body: {tags}
    })
}])(ChallengeFriendStartFetch);