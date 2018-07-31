import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {CHALLENGE_STATUS_IN_PROGRESS, CHALLENGE_STATUS_OPEN} from "../../../util/challengeHelper";
import ChallengeFriendInitPage from "./ChallengeFriendInit";
import ChallengeTask from "../task/ChallengeTask";
import ChallengeFriendStartFetch from "./fetch/ChallengeFriendStartFetch";
import ChallengeEndFetch from "../task/fetch/ChallengeEndFetch";
import ChallengeSolution from "../task/ChallengeSolution";

class ChallengeFriendPage extends React.PureComponent {

    renderPage() {
        const {status, challengeFriendStartRep, challengeEndRep} = this.props;
        if (_.isNil(status)) {
            return <ChallengeFriendInitPage/>;
        }
        if (status === CHALLENGE_STATUS_OPEN) {
            return <ChallengeTask rep={challengeFriendStartRep}/>;
        }
        if (status === CHALLENGE_STATUS_IN_PROGRESS) {
            const repValue = challengeFriendStartRep.value;
            return <ChallengeSolution questions={repValue.questions} challengeId={repValue.id} rep={challengeEndRep}/>;
        }
        return null;
    }

    render() {
        const {challengeFriendStartRep, challengeEndRep, tags, status, questionIdAnswerIdMap} = this.props;
        return <div>
            {this.renderPage()}
            <ChallengeFriendStartFetch
                challengeFriendStartRep={challengeFriendStartRep}
                tags={tags}
                status={status}
            />
            <ChallengeEndFetch
                challengeEndRep={challengeEndRep}
                challengeId={_.get(challengeFriendStartRep, 'value.id')}
                questionIdAnswerIdMap={questionIdAnswerIdMap}
                status={status}
            />
        </div>
    }
}

export default connect(
    (state) => ({
        tags: state.challenge.tags,
        status: state.challenge.status,
        questionIdAnswerIdMap: state.challenge.questionIdAnswerIdMap,
        challengeFriendStartRep: state.repository.challengeFriendStart,
        challengeEndRep: state.repository.challengeEnd
    }),
    (dispatch) => ({})
)(ChallengeFriendPage);
