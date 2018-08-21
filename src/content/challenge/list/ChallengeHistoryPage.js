import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {CREAM_COLOR} from "../../../util/style/constant";
import FaListOl from "react-icons/lib/fa/list-ol";
import './styles.css';
import {getText, TEXT_CLOSED_CHALLENGES, TEXT_NONE_CLOSED_CHALLENGES, TEXT_SUMMARY} from "../../../lang";
import {challengeCleared, summaryIdChanged} from "../../../redux/reducer/challenge";
import Profile from "../../../component/profile/Profile";
import {push} from 'connected-react-router'
import {CHALLENGE_SUMMARY_ROUTE} from "../../routes";
import {clearChallengeSummaryFetch} from "../fetch/ChallengeSummaryFetch";

class ChallengeHistoryPage extends React.PureComponent {

    renderChallenges() {
        const {challengeListRep} = this.props;
        if (!challengeListRep || !challengeListRep.fulfilled) {
            return null;
        }
        const challenges = _.sortBy(challengeListRep.value, 'inProgressDate');
        return <div>
            <div className='contentFragment challengesContainer'>
                {challenges.map(e => this.renderChallenge(e))}
            </div>
        </div>;
    }

    renderChallenge(challenge) {
        const {onChallengeSummaryClick} = this.props;
        const creator = challenge.creatorProfile;
        const date = new Date(challenge.inProgressDate);
        return <div key={challenge.id} className='challenge'>
            <Profile {...creator} actions={<div className='actions'>
                <div onClick={() => onChallengeSummaryClick(challenge.id)}><span>{getText(TEXT_SUMMARY)}</span><FaListOl
                    color={CREAM_COLOR}/></div>
            </div>}>
                <div>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</div>
            </Profile>
        </div>
    }

    render() {
        const {challengeListRep} = this.props;
        return <div className="page">
            <div className="pageBackground absoluteBackgroundMix"/>
            <div className="pageContent">
                <div className="pageHeader">
                    <span>{getText(_.isEmpty(_.get(challengeListRep, 'value')) ? TEXT_NONE_CLOSED_CHALLENGES : TEXT_CLOSED_CHALLENGES)}</span>
                </div>
                {this.renderChallenges()}
            </div>
        </div>
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
