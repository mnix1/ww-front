import React from 'react';
import {connect} from 'react-redux';
import ChallengeTask from "../task/ChallengeTask";
import _ from "lodash";

class ChallengeResponsePage extends React.PureComponent {

    renderContent() {
        const {inProgressId, challengeStartResponseRep} = this.props;
        if (_.isNil(inProgressId)) {
            return;
            // if (challengeStartResponseRep && challengeStartResponseRep.fulfilled) {
            //     const repValue = challengeStartResponseRep.value;
            //     return <ChallengeSolution questions={repValue.questions}
            //                               challengeId={repValue.id}
            //                               rep={challengeEndTaskRep}/>;
            // }
        }
        return <ChallengeTask startRep={challengeStartResponseRep}
                              challengeId={_.get(challengeStartResponseRep, 'value.id')}/>;
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
        challengeStartResponseRep: state.repository.challengeStartResponse,
    }),
    (dispatch) => ({})
)(ChallengeResponsePage);
