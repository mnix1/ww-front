import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {CREAM_COLOR} from "../../../util/style/constant";
import {FaGavel, FaListOl} from "react-icons/fa";
import './styles.css';
import {
    getText,
    TEXT_ANSWER,
    TEXT_CONTINUE,
    TEXT_IN_PROGRESS_CHALLENGES,
    TEXT_NONE_IN_PROGRESS_CHALLENGES,
    TEXT_SUMMARY
} from "../../../lang/langText";
import {responseIdChanged, summaryIdChanged} from "../../../redux/reducer/challenge";
import Profile from "../../../component/profile/Profile";
import {push} from 'connected-react-router'
import {CHALLENGE_ROUTE, CHALLENGE_SUMMARY_ROUTE} from "../../routes";
import {clearChallengeSummaryFetch} from "../fetch/ChallengeSummaryFetch";
import {RIVAL_IMPORTANCE_FAST, RIVAL_STATUS_START_FRIEND, RIVAL_TYPE_CHALLENGE} from "../../../util/rivalHelper";
import {rivalCleared, rivalImportanceChanged, rivalTypeChanged, statusChanged} from "../../../redux/reducer/rival";
import {clearRivalStartRandomOpponentFetch} from "../../rival/fetch/RivalStartRandomOpponentFetch";
import MeshBackground from "../../../component/background/MeshBackground";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";

class ChallengeListPage extends React.PureComponent {

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
        const {onChallengeResponseClick, onChallengeSummaryClick, profile} = this.props;
        const creator = challenge.creatorProfile;
        const isProfileCreator = profile.tag === creator.tag;
        const date = new Date(challenge.inProgressDate);
        return <div key={challenge.id} className='challenge'>
            <Profile {...{
                ...creator,
                tag: creator.tag,
                name: creator.name
            }} actions={<div className='actions'>
                {challenge.canResponse &&
                <div onClick={() => onChallengeResponseClick(challenge.id)}>
                    <span>{getText(isProfileCreator ? TEXT_CONTINUE : TEXT_ANSWER)}</span><FaGavel
                    color={CREAM_COLOR}/></div>}
                <div onClick={() => onChallengeSummaryClick(challenge.id)}><span>{getText(TEXT_SUMMARY)}</span><FaListOl
                    color={CREAM_COLOR}/></div>
            </div>}>
                <div>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</div>
            </Profile>
        </div>
    }

    renderContent() {
        const {challengeListRep} = this.props;
        if (!isRepFulfilled(challengeListRep)) {
            return <Loading/>
        }
        return <div>
            <div className="pageHeader">
                <span>{getText(_.isEmpty(_.get(challengeListRep, 'value')) ? TEXT_NONE_IN_PROGRESS_CHALLENGES : TEXT_IN_PROGRESS_CHALLENGES)}</span>
            </div>
            {this.renderChallenges()}
        </div>;
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
        challengeListRep: state.repository.challengeList,
        profile: state.profile.profile
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
        }
    })
)(ChallengeListPage);
