import React from 'react';
import {connect} from 'react-redux';
import Profile from "../../../../component/profile/Profile";
import {Anime} from "../../../../component/anime/Anime";
import {ProfilesComponent} from "../../component/Profiles";
import TaskDescription from "../../component/TaskDescription";
import {getText, TEXT_ANSWERED, TEXT_CORRECT, TEXT_WRONG} from "../../../../lang/langText";
import thumbUp from '../../../../media/image/icon/thumbUp.svg';
import thumbDown from '../../../../media/image/icon/thumbDown.svg';
import TaskWithoutActions from "../../component/TaskWithoutActions";
import TaskMarkedAnswer from "../../component/TaskMarkedAnswer";
import {GREEN_COLOR, RED_COLOR} from "../../../../util/style/constant";

class BattlePageAnswered extends React.PureComponent {

    get isCorrectAnswer() {
        const {content,} = this.props;
        const {correctAnswerId, markedAnswerId} = content;
        return correctAnswerId === markedAnswerId;
    }

    get meAnswered() {
        const {content} = this.props;
        const {meAnswered} = content;
        return meAnswered;
    }

    renderWhoAnswered() {
        const {content, profile, screen} = this.props;
        const {opponent} = content;
        const answeredProfile = this.meAnswered ? profile : opponent;
        const imgHeight = screen.isSmallHeight ? 40 : 60;
        return <div className='pageCenterHorizontal whoAnswered'>
            <div className='pageBackground absoluteBackgroundMix'/>
            <div className='pageCenterVertical'>
                <Profile {...answeredProfile}/>
                <div>{getText(TEXT_ANSWERED)}...</div>
                <div className='result'>
                    {this.isCorrectAnswer
                        ? <div>
                            <div>{getText(TEXT_CORRECT)}</div>
                            <img alt='' src={thumbUp} height={imgHeight}/></div>
                        : <div>
                            <div>{getText(TEXT_WRONG)}</div>
                            <img alt='' src={thumbDown} height={imgHeight}/></div>}
                </div>
            </div>
        </div>
    }

    renderProfilesWithNewScore() {
        const {content, profile, screen} = this.props;
        const scoreColor = this.meAnswered ? (this.isCorrectAnswer ? GREEN_COLOR : RED_COLOR) : undefined;
        const opponentScoreColor = this.meAnswered ? undefined : (this.isCorrectAnswer ? GREEN_COLOR : RED_COLOR);
        return <Anime
            targetTransformer={t => ({
                content: {score: t.score, opponentScore: t.opponentScore, opponent: t.opponent},
                scoreColor: t.score !== content.score ? scoreColor : undefined,
                opponentScoreColor: t.opponentScore !== content.opponentScore ? opponentScoreColor : undefined,
            })}
            targetAsChildProp={null}
            from={{score: content.score, opponentScore: content.opponentScore, opponent: content.opponent}}
            to={{
                score: {value: content.newScore, duration: 1500, delay: 5000},
                opponentScore: {value: content.newOpponentScore, duration: 1500, delay: 5000}
            }}>
            <ProfilesComponent content={content} className={'absolute'} profile={profile} screen={screen} scoreColor={scoreColor}
                               opponentScoreColor={opponentScoreColor}/>
        </Anime>;
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent battlePageAnswered'>
            {this.renderWhoAnswered()}
            <TaskDescription content={content} className='pageHeader'/>
            {this.renderProfilesWithNewScore()}
            <TaskWithoutActions content={content}/>
            <TaskMarkedAnswer content={content}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socket: state.socket.socket,
        profile: state.profile.profile,
        content: state.rival.content,
        questionIdAnswerIdMap: state.rival.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.rival.questionIdSkipAnimationMap,
    }),
    (dispatch) => ({})
)(BattlePageAnswered);
