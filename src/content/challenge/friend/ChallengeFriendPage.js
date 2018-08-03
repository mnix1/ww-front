import React from 'react';
import {connect} from 'react-redux';
import {CHALLENGE_STATUS_CLOSED, CHALLENGE_STATUS_IN_PROGRESS,} from "../../../util/challengeHelper";
import ChallengeFriendInit from "./ChallengeFriendInit";
import ChallengeTask from "../task/ChallengeTask";
import ChallengeSolution from "../task/ChallengeSolution";

class ChallengeFriendPage extends React.PureComponent {

    renderContent() {
        const {status, challengeFriendStartRep, challengeEndRep} = this.props;
        if (status === CHALLENGE_STATUS_IN_PROGRESS) {
            return <ChallengeTask rep={challengeFriendStartRep}/>;
        }
        if (status === CHALLENGE_STATUS_CLOSED && challengeFriendStartRep && challengeFriendStartRep.fulfilled) {
            const repValue = challengeFriendStartRep.value;
            return <ChallengeSolution questions={repValue.questions} challengeId={repValue.id} rep={challengeEndRep}/>;
        }
        return <ChallengeFriendInit/>;
    }

    render() {
        return <div className="page">
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
        challengeFriendStartRep: state.repository.challengeFriendStart,
        challengeEndRep: state.repository.challengeEnd
    }),
    (dispatch) => ({})
)(ChallengeFriendPage);
