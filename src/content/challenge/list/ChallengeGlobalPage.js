import React from 'react';
import connect from "react-redux/es/connect/connect";
import {clearRivalStartRandomOpponentFetch} from "../../rival/fetch/RivalStartRandomOpponentFetch";
import {creatorTagChanged, joinIdChanged, responseIdChanged} from "../../../redux/reducer/challenge";
import {rivalCleared, rivalImportanceChanged, rivalTypeChanged, statusChanged} from "../../../redux/reducer/rival";
import {RIVAL_IMPORTANCE_FAST, RIVAL_STATUS_START_RANDOM_OPPONENT, RIVAL_TYPE_CHALLENGE} from "../../../util/rivalHelper";
import {push} from "connected-react-router";
import {CHALLENGE_ROUTE} from "../../routes";
import ScreenPage from "../../../component/page/ScreenPage";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";
import ChallengeGlobalFetch from "../fetch/ChallengeGlobalFetch";
import Challenge from "../../../component/challenge/Challenge";
import {
    getText,
    TEXT_GLOBAL_CHALLENGE,
    TEXT_POSITION,
    TEXT_REWARD,
    TEXT_SCORE,
    TEXT_WAITING
} from "../../../lang/langText";
import {CHALLENGE_STATUS_CLOSED} from "../../../util/challengeHelper";
import {prepareAnswerIntervalMessage, prepareScoreMessage} from "../../../util/textHelper";
import {AvailableResourcesComponent} from "../../../component/resource/AvailableResources";
import {RESOURCE_VERY_SMALL} from "../../../component/resource/Resource";
import Profile from "../../../component/profile/Profile";
import _ from "lodash";
import Elo from "../../../component/elo/Elo";

class ChallengeGlobalPage extends React.PureComponent {

    renderContent() {
        const {challengeGlobalRep, onChallengeJoinClick, onChallengeResponseClick} = this.props;
        if (!isRepFulfilled(challengeGlobalRep)) {
            return <Loading/>
        }
        const challenge = challengeGlobalRep.value;
        return <div>
            <div className="pageHeader">
                <span>{getText(TEXT_GLOBAL_CHALLENGE)}</span>
            </div>
            <div className='justifyCenter'>
                <Challenge
                    renderId={false}
                    renderAccess={false}
                    renderCreationDate={false}
                    renderCreator={false}
                    {...challenge}
                    onJoinClick={challenge.joined ? undefined : () => onChallengeJoinClick(challenge.id)}
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
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onChallengeResponseClick: (id) => {
            clearRivalStartRandomOpponentFetch(dispatch);
            dispatch(responseIdChanged(id));
            dispatch(rivalCleared());
            dispatch(rivalTypeChanged(RIVAL_TYPE_CHALLENGE));
            dispatch(rivalImportanceChanged(RIVAL_IMPORTANCE_FAST));
            dispatch(statusChanged(RIVAL_STATUS_START_RANDOM_OPPONENT));
            dispatch(push(CHALLENGE_ROUTE));
        },
        onChallengeJoinClick: (id) => {
            dispatch(joinIdChanged(id));
            dispatch(creatorTagChanged(''));
        },
    })
)(ChallengeGlobalPage);
