import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {getText, TEXT_CLOSED_CHALLENGES, TEXT_NONE_CLOSED_CHALLENGES} from "../../../lang/langText";
import {challengeCleared, summaryIdChanged} from "../../../redux/reducer/challenge";
import {push} from 'connected-react-router'
import {CHALLENGE_SUMMARY_ROUTE} from "../../routes";
import {clearChallengeSummaryFetch} from "../fetch/ChallengeSummaryFetch";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";
import ScreenPage from "../../../component/page/ScreenPage";
import Challenge from "../../../component/challenge/Challenge";

class ChallengeHistoryPage extends React.PureComponent {

    renderChallenges(challenges) {
        return <div>
            <div className='contentFragment challengesContainer'>
                {_.sortBy(challenges, 'creationDate').map(e => this.renderChallenge(e))}
            </div>
        </div>;
    }

    renderChallenge(challenge) {
        const {onChallengeSummaryClick} = this.props;
        return <div key={challenge.id} className='challenge'>
            <Challenge {...challenge} renderTimeoutInterval={false} renderCloseDate={true} onSummaryClick={() => onChallengeSummaryClick(challenge.id)}/>
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
                <span>{getText(_.isEmpty(challenges) ? TEXT_NONE_CLOSED_CHALLENGES : TEXT_CLOSED_CHALLENGES)}</span>
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
        challengeListRep: state.repository.challengeList
    }),
    (dispatch) => ({
        onChallengeSummaryClick: (id) => {
            dispatch(challengeCleared());
            dispatch(summaryIdChanged(id));
            clearChallengeSummaryFetch(dispatch);
            dispatch(push(CHALLENGE_SUMMARY_ROUTE));
        }
    })
)(ChallengeHistoryPage);
