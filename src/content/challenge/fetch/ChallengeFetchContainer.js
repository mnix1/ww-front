import React from 'react';
import {connect} from 'react-redux';
import ChallengeListFetch from "./ChallengeListFetch";
import ChallengeSummaryFetch from "./ChallengeSummaryFetch";
import ChallengeResponseFetch from "./ChallengeResponseFetch";
import ChallengeJoinFetch from "./ChallengeJoinFetch";

class ChallengeFetchContainer extends React.PureComponent {

    render() {
        const {path, challenge, status} = this.props;
        const { responseId,joinId, summaryId} = challenge;
        return <div>
            <ChallengeResponseFetch path={path} status={status} id={responseId}/>
            <ChallengeListFetch path={path}/>
            <ChallengeSummaryFetch path={path} challengeId={summaryId}/>
            <ChallengeJoinFetch id={joinId}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        status: state.rival.status,
        challenge: state.challenge,
    }),
    (dispatch) => ({})
)(ChallengeFetchContainer);
