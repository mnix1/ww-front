import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE} from "../../routes";
import _ from 'lodash';

class ProfileStartReadBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearProfileClaimRewardBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, claimRewardBookId, dispatchProfileClaimRewardBookPost} = this.props;
        if (path === PROFILE_ROUTE
            && !_.isNil(claimRewardBookId)
            && (prevProps.path !== path || prevProps.claimRewardBookId !== claimRewardBookId)) {
            dispatchProfileClaimRewardBookPost(claimRewardBookId);
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
}])(ProfileStartReadBookFetch);