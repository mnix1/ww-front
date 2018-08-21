import React from 'react';
import {connect} from 'react-redux';
import ProfileListBookFetch from "./ProfileListBookFetch";
import ProfileStartReadBookFetch from "./ProfileStartReadBookFetch";
import ProfileClaimRewardBookFetch from "./ProfileClaimRewardBookFetch";
import ProfileStopReadBookFetch from "./ProfileStopReadBookFetch";
import ProfileDiscardBookFetch from "./ProfileDiscardBookFetch";

class ProfileFetchContainer extends React.PureComponent {
    componentDidUpdate() {
    }

    render() {
        const {path, startReadBookId, stopReadBookId, discardBookId, claimRewardBookId} = this.props;
        return <div>
            <ProfileListBookFetch path={path}/>
            <ProfileStartReadBookFetch path={path} bookId={startReadBookId}/>
            <ProfileStopReadBookFetch path={path} bookId={stopReadBookId}/>
            <ProfileDiscardBookFetch path={path} bookId={discardBookId}/>
            <ProfileClaimRewardBookFetch path={path} bookId={claimRewardBookId}/>
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
