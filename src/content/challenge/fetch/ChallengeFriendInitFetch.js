import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_FRIEND_INIT_ROUTE, CHALLENGE_LIST_ROUTE} from "../../routes";
import {isRepValueCode1} from "../../../util/repositoryHelper";
import {initChanged} from "../../../redux/reducer/challenge";
import {push} from 'connected-react-router'
import _ from "lodash";

class ChallengeFriendInitFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeFriendInitFetch, dispatch, init} = this.props;
        if (!prevProps.challengeFriendInitFetch.fulfilled && challengeFriendInitFetch.fulfilled && init) {
            if (isRepValueCode1(challengeFriendInitFetch)) {
                dispatch(push(CHALLENGE_LIST_ROUTE));
                dispatch(initChanged(undefined));
            }
        }
    }

    componentWillUnmount() {
        clearCampaignFriendInitFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, tags, init, dispatchChallengeFriendInitPost} = this.props;
        if (path === CHALLENGE_FRIEND_INIT_ROUTE
            && !_.isNil(init)
            && (prevProps.path !== path || prevProps.init !== init)) {
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