import React from 'react';
import connect from "react-redux/es/connect/connect";
import {creatorTagChanged, joinIdChanged, responseIdChanged, tryAgainIdChanged} from "../../../redux/reducer/challenge";
import {rivalCleared} from "../../../redux/reducer/rival";
import ScreenPage from "../../../component/page/ScreenPage";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";
import ChallengeGlobalFetch from "../fetch/ChallengeGlobalFetch";
import Challenge from "../../../component/challenge/Challenge";
import {getText, TEXT_GLOBAL_CHALLENGE, TEXT_POSITION, TEXT_REWARD, TEXT_WAITING} from "../../../lang/langText";
import {CHALLENGE_STATUS_CLOSED} from "../../../util/challengeHelper";
import {prepareAnswerIntervalMessage, prepareScoreMessage} from "../../../util/textHelper";
import {AvailableResourcesComponent} from "../../../component/resource/AvailableResources";
import {RESOURCE_VERY_SMALL} from "../../../component/resource/Resource";
import Profile from "../../../component/profile/Profile";
import _ from "lodash";
import {challengeCost} from "../../../util/resourceHelper";

class ChallengeGlobalPage extends React.PureComponent {

    renderContent() {
        const {challengeGlobalRep, onChallengeJoinClick, onChallengeResponseClick, onChallengeTryAgainClick, profile} = this.props;
        if (!isRepFulfilled(challengeGlobalRep) || _.isNil(profile.tag)) {
            return <Loading/>
        }
        const challenge = challengeGlobalRep.value;
        return <div>
            <div className="pageHeader">
                <span>{getText(TEXT_GLOBAL_CHALLENGE)}</span>
            </div>
            <div className='justifyCenter'>
                <Challenge
                    enoughResources={challengeCost(profile, challenge)}
                    renderId={false}
                    renderAccess={false}
                    renderCreationDate={false}
                    renderCreator={false}
                    {...challenge}
                    onJoinClick={challenge.joined ? undefined : () => onChallengeJoinClick(challenge.id)}
                    onTryAgainClick={challenge.canTryAgain ? () => onChallengeTryAgainClick(challenge.id) : undefined}
                    onResponseClick={challenge.canResponse ? () => onChallengeResponseClick(challenge.id) : undefined}
                />
            </div>
            {this.renderPositions(challenge.positions)}
        </div>;
    }

    renderPositions(positions) {
        return <div className='inlineBlock'>
            {positions.map((e, i) => this.renderPosition(e, i))}
        </div>
    }

    renderPosition(position, i) {
        let content;
        if (position.status !== CHALLENGE_STATUS_CLOSED) {
            content = <div className='position relative'>
                <div className='details'>{getText(TEXT_WAITING)}</div>
            </div>
        } else {
            content = <div className='position relative'>
                <div className='details'>{getText(TEXT_POSITION)}: {position.position}</div>
                <div className='details fontSize08Rem'>{prepareScoreMessage(position.score)}</div>
                <div className='details fontSize08Rem'>{prepareAnswerIntervalMessage(position.interval)}</div>
            </div>
        }
        const reward = position.reward.empty
            ? null
            : <AvailableResourcesComponent
                customTitle={<div className='relative fontSize08Rem'>{getText(TEXT_REWARD)}</div>}
                {...position.reward}
                autoHide0={true}
                size={RESOURCE_VERY_SMALL}
                styleBoxShadow={false}
                styleMargin={false}
                stylePadding={false}
            />;
        return <Profile active={position.me} blackBackground={true} childrenAfterContent={reward}
                        key={_.uniqueId('summaryProfile')} {...position.profile}>
            {content}
        </Profile>
    }

    render() {
        const {path, challengeJoinRep} = this.props;
        return <ScreenPage>
            {this.renderContent()}
            <ChallengeGlobalFetch challengeJoinRep={challengeJoinRep} path={path}/>
        </ScreenPage>;
    };
}

export default connect(
    (state) => ({
        challengeGlobalRep: state.repository.challengeGlobal,
        challengeJoinRep: state.repository.challengeJoin,
        profile: state.profile,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onChallengeResponseClick: (id) => {
            dispatch(responseIdChanged(id));
            dispatch(rivalCleared());
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
)(ChallengeGlobalPage);
