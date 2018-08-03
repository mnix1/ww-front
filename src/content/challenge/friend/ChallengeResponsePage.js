import React from 'react';
import {connect} from 'react-redux';
import ChallengeTask from "../task/ChallengeTask";
import {CHALLENGE_STATUS_CLOSED, CHALLENGE_STATUS_IN_PROGRESS} from "../../../util/challengeHelper";
import _ from "lodash";
import ChallengeStartResponseFetch from "../fetch/ChallengeStartResponseFetch";
import ChallengeEndFetch from "../fetch/ChallengeEndFetch";
import ChallengeSolution from "../task/ChallengeSolution";

class ChallengeResponsePage extends React.PureComponent {

    renderContent() {
        const {inProgressId, challengeStartResponseRep, challengeEndRep, status} = this.props;
        if (!_.isNil(inProgressId)) {
            if (status === CHALLENGE_STATUS_IN_PROGRESS) {
                return <ChallengeTask rep={challengeStartResponseRep}/>;
            }
            if (status === CHALLENGE_STATUS_CLOSED) {
                const repValue = challengeStartResponseRep.value;
                return <ChallengeSolution questions={repValue.questions} challengeId={repValue.id}
                                          rep={challengeEndRep}/>;
            }
        }
        return null;
    }

    render() {
        const {challengeStartResponseRep, challengeEndRep, status, questionIdAnswerIdMap, inProgressId} = this.props;
        return <div className="page">
            <div className="pageBackground"/>
            <div className="pageContent">
                {this.renderContent()}
            </div>
            <ChallengeStartResponseFetch
                challengeStartResponseRep={challengeStartResponseRep}
                challengeId={inProgressId}
                status={status}
            />
            <ChallengeEndFetch
                challengeEndRep={challengeEndRep}
                challengeId={_.get(challengeStartResponseRep, 'value.id')}
                questionIdAnswerIdMap={questionIdAnswerIdMap}
                status={status}
            />
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        summaryId: state.challenge.summaryId,
        inProgressId: state.challenge.inProgressId,
        status: state.challenge.status,
        questionIdAnswerIdMap: state.challenge.questionIdAnswerIdMap,
        challengeStartResponseRep: state.repository.challengeStartResponse,
        challengeEndRep: state.repository.challengeEnd,
    }),
    (dispatch) => ({})
)(ChallengeResponsePage);
