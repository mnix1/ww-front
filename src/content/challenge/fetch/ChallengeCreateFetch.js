import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_ACTIVE_ROUTE, CHALLENGE_CREATE_ROUTE} from "../../routes";
import {checkRepValueCode, isRepFulfilled, isRepValueCode1} from "../../../util/repositoryHelper";
import {initChanged} from "../../../redux/reducer/challenge";
import {push} from 'connected-react-router'
import _ from "lodash";
import {noticeError} from "../../../component/notification/noticeError";
import {ERROR_NO_FRIENDS_SPECIFIED} from "../../../lang/langError";

class ChallengeCreateFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeCreateFetch, dispatch} = this.props;
        if (isRepFulfilled(challengeCreateFetch)) {
            dispatch(initChanged(undefined));
            if (isRepValueCode1(challengeCreateFetch)) {
                dispatch(push(CHALLENGE_ACTIVE_ROUTE));
            } else if(checkRepValueCode(challengeCreateFetch, -2)) {
                noticeError(ERROR_NO_FRIENDS_SPECIFIED);
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