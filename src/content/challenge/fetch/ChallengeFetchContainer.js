import React from 'react';
import {connect} from 'react-redux';
import ChallengeListFetch from "./ChallengeListFetch";
import ChallengeSummaryFetch from "./ChallengeSummaryFetch";
import ChallengeFriendInitFetch from "./ChallengeFriendInitFetch";

class ChallengeFetchContainer extends React.PureComponent {

    componentDidUpdate() {
    }

    render() {
        const {path, summaryId,status, tags} = this.props;
        return <div>
            <ChallengeFriendInitFetch path={path} status={status} tags={tags}/>
            <ChallengeListFetch path={path}/>
            <ChallengeSummaryFetch path={path} challengeId={summaryId}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        status: state.rival.status,
        summaryId: state.challenge.summaryId,
        tags: state.challenge.tags,
    }),
    (dispatch) => ({})
)(ChallengeFetchContainer);
