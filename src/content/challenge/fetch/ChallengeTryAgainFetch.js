import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {checkRepValueCode, isRepFulfilled, isRepValueCode1} from "../../../util/repositoryHelper";
import {tryAgainIdChanged} from "../../../redux/reducer/challenge";
import _ from 'lodash';
import {clearProfileFetch} from "../../app/fetch/ProfileFetch";
import {noticeError} from "../../../component/notification/noticeError";
import {ERROR_CHALLENGE_CLOSED, ERROR_NOT_ENOUGH_RESOURCES} from "../../../lang/langError";

class ChallengeTryAgainFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {challengeTryAgainFetch, dispatch} = this.props;
        if (isRepFulfilled(challengeTryAgainFetch)) {
            clearChallengeTryAgainFetch(dispatch);
            if (isRepValueCode1(challengeTryAgainFetch)) {
                clearProfileFetch(dispatch);
            } else if (checkRepValueCode(challengeTryAgainFetch, -2)) {
                noticeError(ERROR_CHALLENGE_CLOSED);
            } else if (checkRepValueCode(challengeTryAgainFetch, -3)) {
                noticeError(ERROR_NOT_ENOUGH_RESOURCES);
            }
            dispatch(tryAgainIdChanged(undefined));
        }
    }

    componentWillUnmount() {
        clearChallengeTryAgainFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {id, dispatchChallengeTryAgainPost} = this.props;
        if (!_.isNil(id) && prevProps.id !== id) {
            dispatchChallengeTryAgainPost(id);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeTryAgainFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeTryAgain'}});
}

export default connect([{
    resource: 'challengeTryAgain',
    method: 'post',
    request: (id) => ({
        url: `/challenge/tryAgain`,
        body: {id}
    })
}])(ChallengeTryAgainFetch);