import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_ANSWERED, TEXT_CORRECT, TEXT_WRONG} from "../../../../lang/langText";
import thumbUp from '../../../../media/image/icon/thumbUp.svg';
import thumbDown from '../../../../media/image/icon/thumbDown.svg';
import TaskWithoutActions from "../../component/TaskWithoutActions";
import TaskMarkedAnswer from "../../component/TaskMarkedAnswer";
import ActiveMember from "../../component/ActiveMember";
import TaskDescription from "../../component/TaskDescription";
import {RIVAL_TYPE_BATTLE} from "../../../../util/rivalHelper";
import {GREEN_COLOR, RED_COLOR} from "../../../../util/style/constant";
import {Anime} from "../../../../component/anime/Anime";
import Profiles from "../../component/Profiles";
import Profile from "../../../../component/profile/Profile";

class RivalPageAnswered extends React.PureComponent {

    get isCorrectAnswer() {
        const {content} = this.props;
        const {correctAnswerId, markedAnswerId} = content;
        return correctAnswerId === markedAnswerId;
    }

    get meAnswered() {
        const {content} = this.props;
        const {meAnswered} = content;
        return meAnswered;
    }

    prepareAnsweredProps(forAnswered) {
        const {content} = this.props;
        let meAnswered = this.meAnswered;
        if (!forAnswered) {
            meAnswered = !meAnswered;
        }
        return meAnswered
            ? {activeIndex: content.activeIndex, team: content.team}
            : {activeIndex: content.opponentActiveIndex, team: content.opponentTeam};
    }

    renderWhoAnsweredWar() {
        const {screen, content} = this.props;
        const imgHeight = screen.isSmallHeight ? 40 : 60;
        return <div className='whoAnswered textAlignCenter'>
            <div className='justifyCenter'>
                <div className='justifyCenter flexColumn'>
                    <ActiveMember
                        className={this.isCorrectAnswer ? '' : 'wrongAnswer'}
                        {...this.prepareAnsweredProps(true)}
                    />
                    <div>{getText(TEXT_ANSWERED)}...</div>
                    <div className='result'>
                        {this.isCorrectAnswer
                            ? <div>
                                <div>{getText(TEXT_CORRECT)}</div>
                                <img alt='' src={thumbUp} height={imgHeight}/>
                            </div>
                            : <div>
                                <div>{getText(TEXT_WRONG)}</div>
                                <img alt='' src={thumbDown} height={imgHeight}/>
                            </div>}
                    </div>
                </div>
                {content.opponent && this.isCorrectAnswer && <div className='opponentWisieFadeOut'>
                    <ActiveMember className='wrongAnswer' {...this.prepareAnsweredProps(false)}/>
                </div>}
            </div>
        </div>
    }

    renderWhoAnsweredBattle() {
        const {content, screen} = this.props;
        const {opponent, profile} = content;
        const answeredProfile = this.meAnswered ? profile : opponent;
        const imgHeight = screen.wisieImgHeight;
        return <div className='pageCenterHorizontal whoAnswered'>
            <div className='pageCenterVertical'>
                <Profile {...answeredProfile}/>
                <div>{getText(TEXT_ANSWERED)}...</div>
                <div className='result'>
                    {this.isCorrectAnswer
                        ? <div>
                            <div>{getText(TEXT_CORRECT)}</div>
                            <img alt='' src={thumbUp} height={imgHeight}/>
                        </div>
                        : <div>
                            <div>{getText(TEXT_WRONG)}</div>
                            <img alt='' src={thumbDown} height={imgHeight}/>
                        </div>}
                </div>
            </div>
        </div>
    }

    renderProfilesWithNewScore() {
        const {content, screen} = this.props;
        const scoreColor = this.meAnswered ? (this.isCorrectAnswer ? GREEN_COLOR : RED_COLOR) : undefined;
        const opponentScoreColor = this.meAnswered ? undefined : (this.isCorrectAnswer ? GREEN_COLOR : RED_COLOR);
        return <Anime
            targetTransformer={t => ({
                content: {score: t.score, opponentScore: t.opponentScore, opponent: t.opponent, profile: t.profile},
                scoreColor: t.score !== content.score ? scoreColor : undefined,
                opponentScoreColor: t.opponentScore !== content.opponentScore ? opponentScoreColor : undefined,
            })}
            targetAsChildProp={null}
            from={{
                score: content.score,
                opponentScore: content.opponentScore,
                opponent: content.opponent,
                profile: content.profile
            }}
            to={{
                score: {value: content.newScore, duration: 1500, delay: 5000},
                opponentScore: {value: content.newOpponentScore, duration: 1500, delay: 5000}
            }}>
            <Profiles content={content} className={'absolute'} screen={screen}
                      scoreColor={scoreColor}
                      opponentScoreColor={opponentScoreColor}/>
        </Anime>;
    }

    render() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageContent warPageAnswered'>
            {battle && this.renderWhoAnsweredBattle()}
            <TaskDescription
                content={content}
                renderTaskPoints={battle}
                renderTaskCount={battle}
                small={screen.isSmallHeight}
                className='pageHeader warTaskDescription'/>
            {battle ? this.renderProfilesWithNewScore() : this.renderWhoAnsweredWar()}
            <TaskWithoutActions content={content}/>
            <TaskMarkedAnswer content={content}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(RivalPageAnswered);
