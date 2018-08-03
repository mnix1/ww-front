import React from 'react';
import {connect} from 'react-redux';
import ChallengeListFetch from "./ChallengeListFetch";
import ChallengeSummaryFetch from "./ChallengeSummaryFetch";
import ChallengeStartResponseFetch from "./ChallengeStartResponseFetch";
import ChallengeEndFetch from "./ChallengeEndFetch";
import ChallengeStartFriendFetch from "./ChallengeStartFriendFetch";
import ChallengeStartFastFetch from "./ChallengeStartFastFetch";

class ChallengeFetchContainer extends React.PureComponent {

    componentDidUpdate() {
    }

    render() {
        const {path, summaryId, tags, inProgressId, status, questionIdAnswerIdMap, challengeStartResponseRep, challengeStartFriendRep, challengeStartFastRep, challengeEndRep} = this.props;
        return <div>
            <ChallengeListFetch path={path}/>
            <ChallengeSummaryFetch path={path} challengeId={summaryId}/>
            <ChallengeStartResponseFetch
                path={path}
                challengeStartResponseRep={challengeStartResponseRep}
                challengeId={inProgressId}
                status={status}
            />
            <ChallengeStartFriendFetch
                path={path}
                challengeStartFriendRep={challengeStartFriendRep}
                tags={tags}
                status={status}
            />
            <ChallengeStartFastFetch
                path={path}
                challengeStartFastRep={challengeStartFastRep}
                status={status}
            />
            <ChallengeEndFetch
                path={path}
                challengeEndRep={challengeEndRep}
                challengeId={inProgressId}
                questionIdAnswerIdMap={questionIdAnswerIdMap}
                status={status}
            />
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        inProgressId: state.challenge.inProgressId,
        summaryId: state.challenge.summaryId,
        tags: state.challenge.tags,
        status: state.challenge.status,
        questionIdAnswerIdMap: state.challenge.questionIdAnswerIdMap,
        challengeListRep: state.repository.challengeList,
        challengeSummaryRep: state.repository.challengeSummary,
        challengeStartFriendRep: state.repository.challengeStartFriend,
        challengeStartResponseRep: state.repository.challengeStartResponse,
        challengeStartFastRep: state.repository.challengeStartFast,
        challengeEndRep: state.repository.challengeEnd,
    }),
    (dispatch) => ({})
)(ChallengeFetchContainer);
