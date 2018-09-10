import React from 'react';
import {connect} from 'react-redux';
import ChallengeListFetch from "./ChallengeListFetch";
import ChallengeSummaryFetch from "./ChallengeSummaryFetch";
import ChallengeFriendInitFetch from "./ChallengeFriendInitFetch";
import ChallengeResponseFetch from "./ChallengeResponseFetch";

class ChallengeFetchContainer extends React.PureComponent {

    render() {
        const {path, summaryId, status, init, tags, responseId} = this.props;
        return <div>
            <ChallengeFriendInitFetch path={path} init={init} tags={tags}/>
            <ChallengeResponseFetch path={path} status={status} id={responseId}/>
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
        responseId: state.challenge.responseId,
        init: state.challenge.init,
        tags: state.challenge.tags,
    }),
    (dispatch) => ({})
)(ChallengeFetchContainer);
