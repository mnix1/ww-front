import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE} from "../../routes";
import _ from 'lodash';
import {claimRewardBookIdChanged} from "../../../redux/reducer/profile";
import {clearProfileFetch} from "../../app/ProfileFetch";

class ProfileClaimRewardBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {profileClaimRewardBookFetch, dispatch} = this.props;
        if (!prevProps.profileClaimRewardBookFetch.fulfilled && profileClaimRewardBookFetch.fulfilled) {
            dispatch(claimRewardBookIdChanged(undefined));
            if(profileClaimRewardBookFetch.value.code === 1){
                clearProfileFetch(dispatch);
            }
        }
    }

    componentWillUnmount() {
        clearProfileClaimRewardBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, bookId, dispatchProfileClaimRewardBookPost} = this.props;
        if (path === PROFILE_ROUTE
            && !_.isNil(bookId)
            && (prevProps.path !== path || prevProps.bookId !== bookId)) {
            dispatchProfileClaimRewardBookPost(bookId);
        }
    }

    render() {
        return null;
    }
}

export function clearProfileClaimRewardBookFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profileClaimRewardBook'}});
}

export default connect([{
    method: 'post',
    resource: 'profileClaimRewardBook',
    request: (id) => ({
        url: `/profile/claimRewardBook`,
        body: {id}
    })
}])(ProfileClaimRewardBookFetch);