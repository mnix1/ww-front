import React from 'react';
import {connect} from 'react-redux';
import ChallengeTask from "../task/ChallengeTask";
import _ from "lodash";

class ChallengeFastPage extends React.PureComponent {

    renderContent() {
        const {inProgressId, challengeStartFastRep} = this.props;
        if (_.isNil(inProgressId)) {
            return null;
        }
        return <ChallengeTask startRep={challengeStartFastRep} challengeId={_.get(challengeStartFastRep, 'value.id')}/>;
    }

    render() {
        return <div className="page minHeight">
            <div className="pageBackground"/>
            <div className="pageContent">
                {this.renderContent()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        inProgressId: state.challenge.inProgressId,
        status: state.challenge.status,
        challengeStartFastRep: state.repository.challengeStartFast,
    }),
    (dispatch) => ({})
)(ChallengeFastPage);
