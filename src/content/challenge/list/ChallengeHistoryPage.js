import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {CREAM_COLOR} from "../../../util/style/constant";
import {FaListOl} from "react-icons/fa";
import './styles.css';
import {getText, TEXT_CLOSED_CHALLENGES, TEXT_NONE_CLOSED_CHALLENGES, TEXT_SUMMARY} from "../../../lang/langText";
import {challengeCleared, summaryIdChanged} from "../../../redux/reducer/challenge";
import Profile from "../../../component/profile/Profile";
import {push} from 'connected-react-router'
import {CHALLENGE_SUMMARY_ROUTE} from "../../routes";
import {clearChallengeSummaryFetch} from "../fetch/ChallengeSummaryFetch";
import {repFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";
import MeshBackground from "../../../component/background/MeshBackground";

class ChallengeHistoryPage extends React.PureComponent {

    renderChallenges() {
        const {challengeListRep} = this.props;
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

    renderContent() {
        const {challengeListRep} = this.props;
        if (!repFulfilled(challengeListRep)) {
            return <Loading/>
        }
        return <div>
            <div className="pageHeader">
                <span>{getText(_.isEmpty(_.get(challengeListRep, 'value')) ? TEXT_NONE_CLOSED_CHALLENGES : TEXT_CLOSED_CHALLENGES)}</span>
            </div>
            {this.renderChallenges()}
        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className="page" style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <MeshBackground/>
            <div className="pageContent overflowAuto">
                {this.renderContent()}
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
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
