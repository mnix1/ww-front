import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {
    RIVAL_STATUS_START_FRIEND,
    RIVAL_STATUS_START_RANDOM_OPPONENT,
    RIVAL_STATUS_WAITING_FRIEND
} from "../../../util/rivalHelper";
import {CHALLENGE_ROUTE} from "../../routes";
import {isRepValueCode1} from "../../../util/repositoryHelper";
import {statusChanged} from "../../../redux/reducer/rival";

class ChallengeFriendInitFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeFriendInitFetch, dispatch, status} = this.props;
        if (!prevProps.challengeFriendInitFetch.fulfilled && challengeFriendInitFetch.fulfilled && status === RIVAL_STATUS_START_FRIEND) {
            if (isRepValueCode1(challengeFriendInitFetch)) {
                dispatch(statusChanged(RIVAL_STATUS_WAITING_FRIEND));
            }
        }
    }

    componentWillUnmount() {
        clearCampaignFriendInitFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, tags, status, dispatchChallengeFriendInitPost} = this.props;
        if (path === CHALLENGE_ROUTE
            && prevProps.status !== status
            && status === RIVAL_STATUS_START_FRIEND) {
            dispatchChallengeFriendInitPost(tags);
        }
    }

    render() {
        return null;
    }
}

export function clearCampaignFriendInitFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeFriendInit'}});
}

export default connect([{
    resource: 'challengeFriendInit',
    method: 'post',
    request: (tags) => ({
        url: `/challenge/friendInit`,
        body: {tags}
    })
}])(ChallengeFriendInitFetch);