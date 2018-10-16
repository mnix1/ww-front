import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import _ from 'lodash';
import {checkRepValueCode, isRepFulfilled, isRepValueCode1} from "../../../util/repositoryHelper";
import {creatorTagChanged, joinIdChanged} from "../../../redux/reducer/challenge";
import {push} from "connected-react-router";
import {CHALLENGE_ACTIVE_ROUTE, CHALLENGE_GLOBAL_ROUTE} from "../../routes";
import {noticeError} from "../../../component/notification/noticeError";
import {ERROR_CHALLENGE_CLOSED, ERROR_NOT_ENOUGH_RESOURCES, ERROR_WRONG_CREATOR_TAG} from "../../../lang/langError";
import {clearProfileFetch} from "../../app/fetch/ProfileFetch";

class ChallengeJoinFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeJoinFetch, dispatch, path, id, creatorTag} = this.props;
        if (isRepFulfilled(challengeJoinFetch) && !_.isNil(id) && !_.isNil(creatorTag)) {
            clearChallengeJoinFetch(dispatch);
            if (isRepValueCode1(challengeJoinFetch)) {
                if (path !== CHALLENGE_ACTIVE_ROUTE && path !== CHALLENGE_GLOBAL_ROUTE) {
                    dispatch(push(CHALLENGE_ACTIVE_ROUTE));
                }
                clearProfileFetch(dispatch);
            } else if (checkRepValueCode(challengeJoinFetch, -2)) {
                noticeError(ERROR_CHALLENGE_CLOSED);
            } else if (checkRepValueCode(challengeJoinFetch, -3)) {
                noticeError(ERROR_NOT_ENOUGH_RESOURCES);
            } else if (checkRepValueCode(challengeJoinFetch, -4)) {
                noticeError(ERROR_WRONG_CREATOR_TAG);
            }
            dispatch(joinIdChanged(undefined));
            dispatch(creatorTagChanged(undefined));
        }
    }

    componentWillUnmount() {
        clearChallengeJoinFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {id, creatorTag, dispatchChallengeJoinPost} = this.props;
        if (!_.isNil(id) && !_.isNil(creatorTag) && (id !== prevProps.id  || creatorTag !== prevProps.creatorTag)) {
            dispatchChallengeJoinPost(id, creatorTag);
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
    request: (id, creatorTag) => ({
        url: `/challenge/join`,
        body: {id, creatorTag}
    })
}])(ChallengeJoinFetch);