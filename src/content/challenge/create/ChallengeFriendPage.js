import React from 'react';
import {connect} from 'react-redux';
import {CHALLENGE_STATUS_CLOSED, CHALLENGE_STATUS_IN_PROGRESS,} from "../../../util/challengeHelper";
import ChallengeFriendInit from "./ChallengeFriendInit";
import ChallengeTask from "../task/ChallengeTask";
import ChallengeSolution from "../task/ChallengeSolution";

class ChallengeFriendPage extends React.PureComponent {

    renderContent() {
        const {status, challengeStartFriendRep, challengeEndRep} = this.props;
        if (status === CHALLENGE_STATUS_IN_PROGRESS) {
            return <ChallengeTask rep={challengeStartFriendRep}/>;
        }
        if (challengeStartFriendRep && challengeStartFriendRep.fulfilled) {
            const repValue = challengeStartFriendRep.value;
            return <ChallengeSolution questions={repValue.questions} challengeId={repValue.id} rep={challengeEndRep}/>;
        }
        return <ChallengeFriendInit/>;
    }

    render() {
        return <div className="page minHeight">
            <div className="pageBackground"/>
            <div className="pageContent">
                {this.renderContent()}
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        status: state.challenge.status,
        questionIdAnswerIdMap: state.challenge.questionIdAnswerIdMap,
        challengeStartFriendRep: state.repository.challengeStartFriend,
        challengeEndRep: state.repository.challengeEnd
    }),
    (dispatch) => ({})
)(ChallengeFriendPage);
