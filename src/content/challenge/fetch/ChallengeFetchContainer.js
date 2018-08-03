import React from 'react';
import {connect} from 'react-redux';
import ChallengeListFetch from "./ChallengeListFetch";
import ChallengeSummaryFetch from "./ChallengeSummaryFetch";
import _ from "lodash";
import ChallengeStartResponseFetch from "./ChallengeStartResponseFetch";
import ChallengeEndFetch from "./ChallengeEndFetch";
import ChallengeFriendStartFetch from "./ChallengeFriendStartFetch";
import {CHALLENGE_FRIEND_ROUTE, CHALLENGE_RESPONSE_ROUTE} from "../../routes";

class ChallengeFetchContainer extends React.PureComponent {

    componentDidUpdate() {
    }

    render() {
        const {path, summaryId, tags, inProgressId, status, questionIdAnswerIdMap, challengeStartResponseRep, challengeFriendStartRep, challengeEndRep} = this.props;
        return <div>
            <ChallengeListFetch path={path}/>
            <ChallengeSummaryFetch path={path} challengeId={summaryId}/>
            <ChallengeStartResponseFetch
                path={path}
                challengeStartResponseRep={challengeStartResponseRep}
                challengeId={inProgressId}
                status={status}
            />
            <ChallengeFriendStartFetch
                path={path}
                tags={tags}
                status={status}
            />
            <ChallengeEndFetch
                path={path}
                challengeEndRep={challengeEndRep}
                challengeId={path === CHALLENGE_FRIEND_ROUTE
                    ? _.get(challengeFriendStartRep, 'value.id')
                    : path === CHALLENGE_RESPONSE_ROUTE
                        ? _.get(challengeStartResponseRep, 'value.id')
                        : null}
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
        challengeFriendStartRep: state.repository.challengeFriendStart,
        challengeStartResponseRep: state.repository.challengeStartResponse,
        challengeEndRep: state.repository.challengeEnd,
    }),
    (dispatch) => ({})
)(ChallengeFetchContainer);
