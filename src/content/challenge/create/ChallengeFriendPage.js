import React from 'react';
import {connect} from 'react-redux';
import ChallengeFriendInit from "./ChallengeFriendInit";
import ChallengeTask from "../task/ChallengeTask";
import _ from 'lodash';

class ChallengeFriendPage extends React.PureComponent {

    renderContent() {
        const {status, challengeStartFriendRep} = this.props;
        if (!_.isNil(status)) {
            return <ChallengeTask startRep={challengeStartFriendRep} challengeId={_.get(challengeStartFriendRep, 'value.id')}/>;
        }
        // if (challengeStartFriendRep && challengeStartFriendRep.fulfilled) {
        //     const repValue = challengeStartFriendRep.value;
        //     return <ChallengeSolution questions={repValue.questions} challengeId={repValue.id} rep={challengeEndTaskRep}/>;
        // }
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
        challengeStartFriendRep: state.repository.challengeStartFriend,
    }),
    (dispatch) => ({})
)(ChallengeFriendPage);
