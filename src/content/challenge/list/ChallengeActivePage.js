import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {getText, TEXT_IN_PROGRESS_CHALLENGES, TEXT_NONE_IN_PROGRESS_CHALLENGES} from "../../../lang/langText";
import {joinIdChanged, responseIdChanged, summaryIdChanged} from "../../../redux/reducer/challenge";
import {push} from 'connected-react-router'
import {CHALLENGE_ROUTE, CHALLENGE_SUMMARY_ROUTE} from "../../routes";
import {clearChallengeSummaryFetch} from "../fetch/ChallengeSummaryFetch";
import {RIVAL_IMPORTANCE_FAST, RIVAL_STATUS_START_FRIEND, RIVAL_TYPE_CHALLENGE} from "../../../util/rivalHelper";
import {rivalCleared, rivalImportanceChanged, rivalTypeChanged, statusChanged} from "../../../redux/reducer/rival";
import {clearRivalStartRandomOpponentFetch} from "../../rival/fetch/RivalStartRandomOpponentFetch";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";
import ScreenPage from "../../../component/page/ScreenPage";
import Challenge from "../../../component/challenge/Challenge";

class ChallengeActivePage extends React.PureComponent {

    renderChallenges(challenges) {
        return <div>
            <div className='contentFragment challengesContainer'>
                {_.sortBy(challenges, 'timeoutInterval').map(e => this.renderChallenge(e))}
            </div>
        </div>;
    }

    renderChallenge(challenge) {
        const {onChallengeJoinClick, onChallengeResponseClick, onChallengeSummaryClick} = this.props;
        return <div key={challenge.id} className='challenge'>
            <Challenge {...challenge}
                       onJoinClick={challenge.joined ? undefined : () => onChallengeJoinClick(challenge.id)}
                       onResponseClick={challenge.canResponse ? () => onChallengeResponseClick(challenge.id) : undefined}
                       onSummaryClick={() => onChallengeSummaryClick(challenge.id)}
            />
        </div>
    }

    renderContent() {
        const {challengeListRep} = this.props;
        if (!isRepFulfilled(challengeListRep)) {
            return <Loading/>
        }
        const challenges = challengeListRep.value;
        return <div>
            <div className="pageHeader">
                <span>{getText(_.isEmpty(challenges) ? TEXT_NONE_IN_PROGRESS_CHALLENGES : TEXT_IN_PROGRESS_CHALLENGES)}</span>
            </div>
            {this.renderChallenges(challenges)}
        </div>;
    }

    render() {
        return <ScreenPage>
            {this.renderContent()}
        </ScreenPage>;
    }
}

export default connect(
    (state) => ({
        challengeListRep: state.repository.challengeList,
    }),
    (dispatch) => ({
        onChallengeResponseClick: (id) => {
            clearRivalStartRandomOpponentFetch(dispatch);
            dispatch(responseIdChanged(id));
            dispatch(rivalCleared());
            dispatch(rivalTypeChanged(RIVAL_TYPE_CHALLENGE));
            dispatch(rivalImportanceChanged(RIVAL_IMPORTANCE_FAST));
            dispatch(statusChanged(RIVAL_STATUS_START_FRIEND));
            dispatch(push(CHALLENGE_ROUTE));
        },
        onChallengeSummaryClick: (id) => {
            dispatch(summaryIdChanged(id));
            clearChallengeSummaryFetch(dispatch);
            dispatch(push(CHALLENGE_SUMMARY_ROUTE));
        },
        onChallengeJoinClick: (id) => {
            dispatch(joinIdChanged(id));
            // dispatch(push(CHALLENGE_ACTIVE_ROUTE));
        },
    })
)(ChallengeActivePage);
