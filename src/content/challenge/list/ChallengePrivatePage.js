import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {
    getText, TEXT_ENTER_TAG_HERE,
    TEXT_ENTER_CREATOR_PROFILE_TAG_TO_JOIN,
    TEXT_NO_PRIVATE_CHALLENGES,
    TEXT_PRIVATE_CHALLENGES
} from "../../../lang/langText";
import {creatorTagChanged, joinIdChanged} from "../../../redux/reducer/challenge";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {FaCheckCircle} from "react-icons/fa";
import {Loading} from "../../../component/loading/Loading";
import ScreenPage from "../../../component/page/ScreenPage";
import Challenge from "../../../component/challenge/Challenge";
import Modal from "../../../component/modal/Modal";
import {CHALLENGE_ACCESS_LOCK} from "../../../util/challengeHelper";
import {challengeCost} from "../../../util/resourceHelper";

class ChallengePrivatePage extends React.PureComponent {

    creatorTagInputRef = React.createRef();

    renderChallenges(challenges) {
        return <div>
            <div className='contentFragment challengesContainer'>
                {_.sortBy(challenges, 'creationDate').map(e => this.renderChallenge(e))}
            </div>
        </div>;
    }

    renderChallenge(challenge) {
        const {onChallengeJoinClick, profile} = this.props;
        return <div key={challenge.id} className='challenge'>
            <Challenge
                {...challenge}
                enoughResources={challengeCost(profile, challenge)}
                onJoinClick={() => onChallengeJoinClick(challenge)}
            />
        </div>
    }

    renderCreatorTag() {
        const {onCreatorTagChange, onChallengeJoinCancel, joinId, creatorTag} = this.props;
        return !_.isNil(joinId) && _.isNil(creatorTag) && <Modal
            onExitClick={onChallengeJoinCancel}
            style={{padding: '0.5rem'}}
        >
            <div>
                <div className='justifyCenter fontSize08Rem'>{getText(TEXT_ENTER_CREATOR_PROFILE_TAG_TO_JOIN)}</div>
                <div className='justifyCenter'>
                    <input ref={this.creatorTagInputRef}
                           placeholder={getText(TEXT_ENTER_TAG_HERE)}
                           type='text'
                           maxLength={8}
                           style={{width: 120}}/>
                    <FaCheckCircle className='pointer'
                                   onClick={() => onCreatorTagChange(this.creatorTagInputRef.current.value)}/>
                </div>
            </div>
        </Modal>
    }

    renderContent() {
        const {challengeListRep} = this.props;
        if (!isRepFulfilled(challengeListRep)) {
            return <Loading/>
        }
        const challenges = challengeListRep.value;
        return <div>
            {this.renderCreatorTag()}
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
        joinId: state.challenge.joinId,
        profile: state.profile,
        creatorTag: state.challenge.creatorTag,
    }),
    (dispatch) => ({
        onChallengeJoinClick: (challenge) => {
            dispatch(joinIdChanged(challenge.id));
            if (challenge.access !== CHALLENGE_ACCESS_LOCK) {
                dispatch(creatorTagChanged(''));
            }
        },
        onChallengeJoinCancel: () => {
            dispatch(joinIdChanged(undefined));
            dispatch(creatorTagChanged(undefined));
        },
        onCreatorTagChange: (creatorTag) => {
            dispatch(creatorTagChanged(creatorTag));
        },
    })
)(ChallengePrivatePage);
