import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {getText, TEXT_NO_PRIVATE_CHALLENGES, TEXT_PRIVATE_CHALLENGES} from "../../../lang/langText";
import {joinIdChanged} from "../../../redux/reducer/challenge";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";
import ScreenPage from "../../../component/page/ScreenPage";
import Challenge from "../../../component/challenge/Challenge";

class ChallengePrivatePage extends React.PureComponent {

    renderChallenges(challenges) {
        return <div>
            <div className='contentFragment challengesContainer'>
                {_.sortBy(challenges, 'creationDate').map(e => this.renderChallenge(e))}
            </div>
        </div>;
    }

    renderChallenge(challenge) {
        const {onChallengeJoinClick} = this.props;
        return <div key={challenge.id} className='challenge'>
            <Challenge {...challenge} onJoinClick={() => onChallengeJoinClick(challenge.id)}/>
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
                <span>{getText(_.isEmpty(challenges) ? TEXT_NO_PRIVATE_CHALLENGES : TEXT_PRIVATE_CHALLENGES)}</span>
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
        onChallengeJoinClick: (id) => {
            dispatch(joinIdChanged(id));
            // dispatch(push(CHALLENGE_ACTIVE_ROUTE));
        },
    })
)(ChallengePrivatePage);
