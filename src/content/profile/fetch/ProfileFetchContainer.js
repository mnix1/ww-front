import React from 'react';
import {connect} from 'react-redux';
import ProfileListBookFetch, {clearProfileListBookFetch} from "./ProfileListBookFetch";
import ProfileStartReadBookFetch from "./ProfileStartReadBookFetch";
import ProfileClaimRewardBookFetch from "./ProfileClaimRewardBookFetch";
import ProfileStopReadBookFetch from "./ProfileStopReadBookFetch";
import ProfileDiscardBookFetch from "./ProfileDiscardBookFetch";

class ProfileFetchContainer extends React.PureComponent {
    componentDidUpdate(prevProps) {
        const {
            profileStartReadBookRep, profileStopReadBookRep, profileDiscardBookRep, profileClaimRewardRep,
            clearListRep
        } = this.props;
        if ((profileStartReadBookRep.fulfilled &&
            !prevProps.profileStartReadBookRep.fulfilled)
            || (profileStopReadBookRep.fulfilled &&
                !prevProps.profileStopReadBookRep.fulfilled)
            || (profileDiscardBookRep.fulfilled &&
                !prevProps.profileDiscardBookRep.fulfilled)
            || (profileClaimRewardRep.fulfilled &&
                !prevProps.profileClaimRewardRep.fulfilled)) {
            clearListRep();
        }
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
        startReadBookId: state.profile.startReadBookId,
        stopReadBookId: state.profile.stopReadBookId,
        discardBookId: state.profile.discardBookId,
        claimRewardBookId: state.profile.claimRewardBookId,
        profileListBookRep: state.repository.profileListBook,
        profileStartReadBookRep: state.repository.profileStartReadBook || {},
        profileStopReadBookRep: state.repository.profileStopReadBook || {},
        profileDiscardBookRep: state.repository.profileDiscardBook || {},
        profileClaimRewardRep: state.repository.profileClaimReward || {},
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        clearListRep: () => clearProfileListBookFetch(dispatch)
    })
)(ProfileFetchContainer);
