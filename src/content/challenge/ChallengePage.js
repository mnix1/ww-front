import React from 'react';
import {connect} from 'react-redux';
import {idChanged} from "../../redux/reducer/content";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";
import {OBJECTS_CHALLENGE} from "../object-group/objectsChallenge";
import ChallengeTask from "./task/ChallengeTask";
import {CHALLENGE_STATUS_IN_PROGRESS, CHALLENGE_STATUS_OPEN} from "../../util/challengeHelper";
import _ from "lodash";
import ChallengeStartResponseFetch from "./task/fetch/ChallengeStartResponseFetch";
import ChallengeEndFetch from "./task/fetch/ChallengeEndFetch";
import ChallengeSolution from "./task/ChallengeSolution";
import ChallengeSummaryPage from "./list/ChallengeSummaryPage";
import ChallengeSummaryFetch from "./task/fetch/ChallengeSummaryFetch";

class ChallengePage extends React.PureComponent {

    renderContent() {
        const {screen, onContentIdChange, summaryId, inProgressId, challengeStartResponseRep, challengeEndRep, challengeSummaryRep, status} = this.props;
        if (!_.isNil(summaryId)) {
            return <ChallengeSummaryPage rep={challengeSummaryRep}/>;
        }
        if (!_.isNil(inProgressId)) {
            if (status === CHALLENGE_STATUS_OPEN) {
                return <ChallengeTask rep={challengeStartResponseRep}/>;
            }
            if (status === CHALLENGE_STATUS_IN_PROGRESS) {
                const repValue = challengeStartResponseRep.value;
                return <ChallengeSolution questions={repValue.questions} challengeId={repValue.id} rep={challengeEndRep}/>;
            }
        }
        return <div>
            <SimpleObjectGroup
                objects={OBJECTS_CHALLENGE}
                onObjectClick={onContentIdChange}
                screen={screen}
            />
        </div>;
    }

    render() {
        const {challengeStartResponseRep, challengeEndRep, status, summaryId, questionIdAnswerIdMap, inProgressId} = this.props;
        return <div>
            {this.renderContent()}
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
            <ChallengeSummaryFetch
                challengeId={summaryId}
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
        challengeSummaryRep: state.repository.challengeSummary
    }),
    (dispatch) => ({
        onContentIdChange: (e) => dispatch(idChanged(e.id)),
    })
)(ChallengePage);
