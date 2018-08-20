import React from 'react';
import {connect} from 'react-redux';
import ProfileListBookFetch from "./ProfileListBookFetch";
import ProfileStartReadBookFetch from "./ProfileStartReadBookFetch";
import ProfileClaimRewardBookFetch from "./ProfileClaimRewardBookFetch";

class ProfileFetchContainer extends React.PureComponent {
    componentDidUpdate() {
    }

    render() {
        const {path, readBookId, claimRewardBookId} = this.props;
        return <div>
            <ProfileListBookFetch path={path}/>
            <ProfileStartReadBookFetch path={path} readBookId={readBookId}/>
            <ProfileClaimRewardBookFetch path={path} claimRewardBookId={claimRewardBookId}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        readBookId: state.profile.readBookId,
        claimRewardBookId: state.profile.claimRewardBookId,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({})
)(ProfileFetchContainer);
