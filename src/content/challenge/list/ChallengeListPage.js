import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {CREAM_COLOR} from "../../../util/style/constant";
import FaGavel from "react-icons/lib/fa/gavel";
import FaListOl from "react-icons/lib/fa/list-ol";
import './styles.css';
import {
    getText,
    TEXT_ANSWER,
    TEXT_CONTINUE,
    TEXT_IN_PROGRESS_CHALLENGES,
    TEXT_NONE_IN_PROGRESS_CHALLENGES,
    TEXT_SUMMARY
} from "../../../lang";
import {challengeCleared, inProgressIdChanged, statusChanged, summaryIdChanged} from "../../../redux/reducer/challenge";
import {CHALLENGE_STATUS_START} from "../../../util/challengeHelper";
import Profile from "../../../component/profile/Profile";
import {push} from 'connected-react-router'
import {CHALLENGE_RESPONSE_ROUTE, CHALLENGE_SUMMARY_ROUTE} from "../../routes";
import {clearChallengeSummaryFetch} from "../fetch/ChallengeSummaryFetch";

class ChallengeListPage extends React.PureComponent {

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
        const {onChallengeResponseClick, onChallengeSummaryClick, profile} = this.props;
        const creator = challenge.creatorProfile;
        const isProfileCreator = profile.tag === creator.tag;
        const date = new Date(challenge.inProgressDate);
        return <div key={challenge.id} className='challenge'>
            <Profile {...{
                ...creator,
                tag: isProfileCreator ? null : creator.tag,
                name: isProfileCreator ? null : creator.name
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

    render() {
        const {challengeListRep} = this.props;
        return <div className="page">
            <div className="pageBackground"/>
            <div className="pageContent">
                <div className="pageHeader">
                    <span>{getText(_.isEmpty(_.get(challengeListRep, 'value')) ? TEXT_NONE_IN_PROGRESS_CHALLENGES : TEXT_IN_PROGRESS_CHALLENGES)}</span>
                </div>
                {this.renderChallenges()}
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        challengeListRep: state.repository.challengeList,
        profile: state.profile.profile
    }),
    (dispatch) => ({
        onChallengeResponseClick: (id) => {
            dispatch(challengeCleared());
            dispatch(inProgressIdChanged(id));
            dispatch(statusChanged(CHALLENGE_STATUS_START));
            dispatch(push(CHALLENGE_RESPONSE_ROUTE));
        },
        onChallengeSummaryClick: (id) => {
            dispatch(summaryIdChanged(id));
            clearChallengeSummaryFetch(dispatch);
            dispatch(push(CHALLENGE_SUMMARY_ROUTE));
        }
    })
)(ChallengeListPage);
