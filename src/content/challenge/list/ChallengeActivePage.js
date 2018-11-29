import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {
    getText,
    TEXT_CREATED,
    TEXT_IN_PROGRESS,
    TEXT_IN_PROGRESS_CHALLENGES,
    TEXT_INVITES,
    TEXT_NONE_IN_PROGRESS_CHALLENGES
} from "../../../lang/langText";
import {
    creatorTagChanged,
    joinIdChanged,
    responseIdChanged,
    summaryIdChanged,
    tryAgainIdChanged
} from "../../../redux/reducer/challenge";
import {push} from 'connected-react-router'
import {CHALLENGE_SUMMARY_ROUTE} from "../../routes";
import {clearChallengeSummaryFetch} from "../fetch/ChallengeSummaryFetch";
import {rivalCleared} from "../../../redux/reducer/rival";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";
import ScreenPage from "../../../component/page/ScreenPage";
import Challenge from "../../../component/challenge/Challenge";
import {challengeCost} from "../../../util/resourceHelper";

class ChallengeActivePage extends React.PureComponent {

    renderChallenges(challenges, title) {
        return !_.isEmpty(challenges) && <div className=''>
            <div className='title marginRem'>{getText(title)}</div>
            <div className='contentFragment challengesContainer'>
                {_.sortBy(challenges, 'timeoutInterval').map(e => this.renderChallenge(e))}
            </div>
        </div>;
    }

    renderChallenge(challenge) {
        const {onChallengeJoinClick, onChallengeResponseClick, onChallengeSummaryClick, onChallengeTryAgainClick, profile} = this.props;
        return <div key={challenge.id} className='challenge'>
            <Challenge
                enoughResources={challengeCost(profile, challenge)}
                {...challenge}
                onJoinClick={challenge.joined ? undefined : () => onChallengeJoinClick(challenge.id)}
                onResponseClick={challenge.canResponse ? () => onChallengeResponseClick(challenge.id) : undefined}
                onTryAgainClick={challenge.canTryAgain ? () => onChallengeTryAgainClick(challenge.id) : undefined}
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
            {this.renderChallenges(challenges.filter(e => !e.joined && e.type === 'CREATOR'), TEXT_CREATED)}
            {this.renderChallenges(challenges.filter(e => !e.joined && e.type === 'INVITED'), TEXT_INVITES)}
            {this.renderChallenges(challenges.filter(e => e.joined), TEXT_IN_PROGRESS)}
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
        profile: state.profile,
    }),
    (dispatch) => ({
        onChallengeResponseClick: (id) => {
            dispatch(rivalCleared());
            dispatch(responseIdChanged(id));
        },
        onChallengeSummaryClick: (id) => {
            dispatch(summaryIdChanged(id));
            clearChallengeSummaryFetch(dispatch);
            dispatch(push(CHALLENGE_SUMMARY_ROUTE));
        },
        onChallengeJoinClick: (id) => {
            dispatch(joinIdChanged(id));
            dispatch(creatorTagChanged(''));
        },
        onChallengeTryAgainClick: (id) => {
            dispatch(rivalCleared());
            dispatch(tryAgainIdChanged(id));
        },
    })
)(ChallengeActivePage);
