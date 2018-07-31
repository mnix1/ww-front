import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import ChallengeListFetch from "./fetch/ChallengeListFetch";
import {CREAM_COLOR} from "../../../util/style/constant";
import FaGavel from "react-icons/lib/fa/gavel";
import FaListOl from "react-icons/lib/fa/list-ol";
import './styles.css';
import {getText, TEXT_IN_PROGRESS_CHALLENGES, TEXT_NONE_IN_PROGRESS_CHALLENGES} from "../../../lang";
import Challenge from "../../../component/challenge/Challenge";
import {inProgressIdChanged, statusChanged, summaryIdChanged} from "../../../redux/reducer/challenge";
import {CHALLENGE_STATUS_OPEN} from "../../../util/challengeHelper";
import {idChanged} from "../../../redux/reducer/content";
import {OBJECT_APP_CHALLENGE} from "../../object-group/objectsApp";

class ChallengeListPage extends React.PureComponent {

    renderChallenges() {
        const {challengeListRep} = this.props;
        if (!challengeListRep || !challengeListRep.fulfilled) {
            return null;
        }
        const challenges = _.sortBy(challengeListRep.value, 'inProgressDate');
        return <div>
            <div className='pageInsideContainer challengesContainer'>
                {challenges.map(e => this.renderChallenge(e))}
            </div>
        </div>;
    }

    renderChallenge(challenge) {
        const {onChallengeResponseClick, onChallengeSummaryClick} = this.props;
        return <div key={challenge.id} className='challenge'>
            <Challenge challenge={challenge} actions={<div className='actions'>
                <FaGavel color={CREAM_COLOR} onClick={() => onChallengeResponseClick(challenge.id)}/>
                <FaListOl color={CREAM_COLOR} onClick={() => onChallengeSummaryClick(challenge.id)}/>
            </div>}/>
        </div>
    }

    render() {
        const {challengeListRep} = this.props;
        return <div>
            <div className="pageHeader" style={{position: 'relative'}}>
                <span>{getText(_.isEmpty(_.get(challengeListRep, 'value')) ? TEXT_NONE_IN_PROGRESS_CHALLENGES : TEXT_IN_PROGRESS_CHALLENGES)}</span>
            </div>
            {this.renderChallenges()}
            <ChallengeListFetch challengeListRep={challengeListRep}/>
        </div>
    }
}

export default connect(
    (state) => ({
        challengeListRep: state.repository.challengeList
    }),
    (dispatch) => ({
        onChallengeResponseClick: (id) => {
            dispatch(inProgressIdChanged(id));
            dispatch(statusChanged(CHALLENGE_STATUS_OPEN));
            dispatch(idChanged(OBJECT_APP_CHALLENGE));
        },
        onChallengeSummaryClick: (id) => {
            dispatch(summaryIdChanged(id));
            dispatch(idChanged(OBJECT_APP_CHALLENGE));
        }
    })
)(ChallengeListPage);
