import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import _ from 'lodash';
import {checkRepValueCode, isRepFulfilled, isRepValueCode1} from "../../../util/repositoryHelper";
import {joinIdChanged} from "../../../redux/reducer/challenge";
import {push} from "connected-react-router";
import {CHALLENGE_ACTIVE_ROUTE} from "../../routes";
import {clearChallengeListFetch} from "./ChallengeListFetch";
import {noticeError} from "../../../component/notification/noticeError";
import {ERROR_NOT_ENOUGH_RESOURCES} from "../../../lang/langError";

class ChallengeJoinFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeJoinFetch, dispatch, path, id} = this.props;
        if (isRepFulfilled(challengeJoinFetch) && !_.isNil(id)) {
            dispatch(joinIdChanged(undefined));
            if (isRepValueCode1(challengeJoinFetch)) {
                if (path !== CHALLENGE_ACTIVE_ROUTE) {
                    dispatch(push(CHALLENGE_ACTIVE_ROUTE));
                }
            } else if(checkRepValueCode(challengeJoinFetch, -3)) {
                noticeError(ERROR_NOT_ENOUGH_RESOURCES);
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