import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_IN_PROGRESS} from "../../../util/challengeHelper";
import {CHALLENGE_FRIEND_ROUTE} from "../../routes";
import {inProgressIdChanged} from "../../../redux/reducer/challenge";
import _ from "lodash";

class ChallengeStartFriendFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const lastValue = _.get(prevProps.challengeStartFriendRep, 'value');
        const newValue = _.get(this.props.challengeStartFriendRep, 'value');
        if (lastValue !== newValue && !_.isNil(newValue)) {
            this.props.dispatch(inProgressIdChanged(newValue.id));
        }
    }

    componentWillUnmount() {
        clearChallengeStartFriendFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tags, path, status, dispatchChallengeStartFriendPost} = this.props;
        if (path === CHALLENGE_FRIEND_ROUTE
            && status === CHALLENGE_STATUS_IN_PROGRESS
            && (path !== prevProps.path || status !== prevProps.status)) {
            dispatchChallengeStartFriendPost(tags);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeStartFriendFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeStartFriend'}});
}

export default connect([{
    resource: 'challengeStartFriend',
    method: 'post',
    request: (tags) => ({
        url: `/challenge/startFriend`,
        body: {tags}
    })
}])(ChallengeStartFriendFetch);