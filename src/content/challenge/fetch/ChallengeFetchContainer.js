import React from 'react';
import {connect} from 'react-redux';
import ChallengeListFetch from "./ChallengeListFetch";
import ChallengeSummaryFetch from "./ChallengeSummaryFetch";

class ChallengeFetchContainer extends React.PureComponent {

    componentDidUpdate() {
    }

    render() {
        const {path, summaryId} = this.props;
        return <div>
            <ChallengeListFetch path={path}/>
            <ChallengeSummaryFetch path={path} challengeId={summaryId}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        summaryId: state.challenge.summaryId,
        challengeListRep: state.repository.challengeList,
        challengeSummaryRep: state.repository.challengeSummary,
    }),
    (dispatch) => ({})
)(ChallengeFetchContainer);
