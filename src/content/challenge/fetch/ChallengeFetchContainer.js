import React from 'react';
import {connect} from 'react-redux';
import ChallengeListFetch from "./ChallengeListFetch";
import ChallengeResponseFetch from "./ChallengeResponseFetch";
import ChallengeJoinFetch from "./ChallengeJoinFetch";

class ChallengeFetchContainer extends React.PureComponent {

    render() {
        const {path, challenge, status, challengeJoinRep} = this.props;
        const {responseId, joinId, creatorTag} = challenge;
        return <div>
            <ChallengeResponseFetch path={path} status={status} id={responseId}/>
            <ChallengeListFetch path={path} id={joinId} challengeJoinRep={challengeJoinRep}/>
            <ChallengeJoinFetch path={path} id={joinId} creatorTag={creatorTag}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        challengeJoinRep: state.repository.challengeJoin,
        status: state.rival.status,
        challenge: state.challenge,
    }),
    (dispatch) => ({})
)(ChallengeFetchContainer);
