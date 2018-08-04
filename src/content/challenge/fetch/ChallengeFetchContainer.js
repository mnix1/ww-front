import React from 'react';
import {connect} from 'react-redux';
import ChallengeListFetch from "./ChallengeListFetch";
import ChallengeSummaryFetch from "./ChallengeSummaryFetch";
import ChallengeStartResponseFetch, {clearChallengeStartResponseFetch} from "./ChallengeStartResponseFetch";
import ChallengeEndTaskFetch, {clearChallengeEndTaskFetch} from "./ChallengeEndTaskFetch";
import ChallengeStartFriendFetch, {clearChallengeStartFriendFetch} from "./ChallengeStartFriendFetch";
import ChallengeStartFastFetch, {clearChallengeStartFastFetch} from "./ChallengeStartFastFetch";
import ChallengeNextTaskFetch, {clearChallengeNextTaskFetch} from "./ChallengeNextTaskFetch";

class ChallengeFetchContainer extends React.PureComponent {

    componentDidUpdate() {
    }

    render() {
        const {path, summaryId, tags, inProgressId, status, answerId, challengeStartResponseRep, challengeStartFriendRep, challengeStartFastRep, challengeEndRep} = this.props;
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
            <ChallengeEndTaskFetch
                path={path}
                challengeId={inProgressId}
                answerId={answerId}
                status={status}
            />
            <ChallengeNextTaskFetch
                path={path}
                challengeId={inProgressId}
                answerId={answerId}
                status={status}
            />
        </div>;
    }
}

export function clearChallengeTaskAndStartFetch(dispatch){
    clearChallengeEndTaskFetch(dispatch);
    clearChallengeNextTaskFetch(dispatch);
    clearChallengeStartFastFetch(dispatch);
    clearChallengeStartFriendFetch(dispatch);
    clearChallengeStartResponseFetch(dispatch);
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        inProgressId: state.challenge.inProgressId,
        summaryId: state.challenge.summaryId,
        tags: state.challenge.tags,
        status: state.challenge.status,
        answerId: state.challenge.answerId,
        challengeStartFriendRep: state.repository.challengeStartFriend,
        challengeStartResponseRep: state.repository.challengeStartResponse,
        challengeStartFastRep: state.repository.challengeStartFast,
    }),
    (dispatch) => ({})
)(ChallengeFetchContainer);
