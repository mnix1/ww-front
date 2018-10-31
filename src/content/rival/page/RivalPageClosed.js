import React from 'react';
import {connect} from 'react-redux';
import {
    getText,
    TEXT_DRAW,
    TEXT_EXIT,
    TEXT_OPPONENT_SURRENDER,
    TEXT_THE_WINNER_IS,
    TEXT_YOU_SURRENDER
} from "../../../lang/langText";
import Team from "../component/Team";
import {isRanking, RIVAL_TYPE_BATTLE, RIVAL_TYPE_CHALLENGE, RIVAL_TYPE_FAREWELL_MSG} from "../../../util/rivalHelper";
import {GREEN_COLOR, RED_COLOR} from "../../../util/style/constant";
import _ from "lodash";
import Profiles from "../component/Profiles";
import {Anime} from "../../../component/anime/Anime";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../component/button/Button";
import {goBack} from "connected-react-router";
import Profile from "../../../component/profile/Profile";
import {IoMdExit} from "react-icons/io";

class RivalPageClosed extends React.PureComponent {

    renderContent() {
        const {content, screen} = this.props;
        const {winnerTag, isDraw, resigned, profile} = content;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        const challenge = content.type === RIVAL_TYPE_CHALLENGE;
        if (isDraw) {
            if (challenge) {
                const props = {presentIndexes: content.presentIndexes, team: content.team};
                return <div className='justifyCenter flexColumn'>
                    <div className='pageHeader'>
                        {getText(RIVAL_TYPE_FAREWELL_MSG[content.type])}
                    </div>
                    <div className='pageHeader'>
                        <Team {...props}/>
                    </div>
                </div>
            }
            return <div className='justifyCenter flexColumn'>
                <div className='pageHeader'>
                    {getText(RIVAL_TYPE_FAREWELL_MSG[content.type])}
                </div>
                <div className='pageHeader'>
                    {getText(TEXT_DRAW)}
                </div>
            </div>;
        }
        const meWinner = winnerTag === profile.tag;
        return <div className='justifyCenter flexColumn'>
            {resigned && meWinner && <div className='pageHeader'>
                {getText(TEXT_OPPONENT_SURRENDER)}
            </div>}
            {resigned && !meWinner && <div className='pageHeader'>
                {getText(TEXT_YOU_SURRENDER)}
            </div>}
            <div className='pageHeader'>
                {getText(RIVAL_TYPE_FAREWELL_MSG[content.type])}

            </div>
            <div className='pageHeader'>
                {`${getText(TEXT_THE_WINNER_IS)}:`}
            </div>
            <div className='pageHeader'>
                {battle && <Profile
                    imgHeight={screen.rivalImgHeight} {...winnerTag === content.profile.tag ? content.profile : content.opponent}/>}
                {!battle && <Team
                    className='justifyCenter overflowHidden width100'
                    contentClassName='overflowXAuto overflowYHidden justifyStart'
                    {...meWinner
                        ? {presentIndexes: content.presentIndexes, team: content.team}
                        : {presentIndexes: content.opponentPresentIndexes, team: content.opponentTeam}}/>}
            </div>
        </div>;
    }

    renderProfilesWithNewScore() {
        const {content, screen} = this.props;
        if (!isRanking(content)) {
            return null;
        }
        const battle = content.type === RIVAL_TYPE_BATTLE;
        const oldProfileElo = content.profileSeason.previousElo;
        const newProfileElo = content.profileSeason.elo;
        const oldOpponentElo = content.opponentSeason.previousElo;
        const newOpponentElo = content.opponentSeason.elo;
        const scoreColor = newProfileElo === oldProfileElo ? undefined : (newProfileElo > oldProfileElo ? GREEN_COLOR : RED_COLOR);
        const opponentScoreColor = newOpponentElo === oldOpponentElo ? undefined : (newOpponentElo > oldOpponentElo ? GREEN_COLOR : RED_COLOR);
        return <Anime
            targetTransformer={t => ({
                content: {
                    ...content,
                    profile: {
                        ...content.profile,
                        renderGrade: t.points === newProfileElo,
                        grade: content.profileSeason.grade,
                        elo: _.round(t.points)
                    },
                    opponent: {
                        ...content.opponent,
                        renderGrade: t.opponentPoints === newOpponentElo,
                        grade: content.opponentSeason.grade,
                        elo: _.round(t.opponentPoints)
                    },
                },
            })}
            targetAsChildProp={null}
            from={{
                points: oldProfileElo,
                opponentPoints: oldOpponentElo,
            }}
            to={{
                points: {value: newProfileElo, duration: 1500, delay: 1000},
                opponentPoints: {value: newOpponentElo, duration: 1500, delay: 1000}
            }}>
            <Profiles
                renderScore={battle}
                renderElo={true}
                className='absolute'
                screen={screen}
                eloStyle={{color: scoreColor}}
                opponentEloStyle={{color: opponentScoreColor}}
            />
        </Anime>;
    }

    render() {
        // console.log('RivalPageClosed render');
        const {onExitClick} = this.props;
        return <div className='pageContent warPageClosed'>
            {this.renderProfilesWithNewScore()}
            <div className='height100 width100 justifyCenter flexColumn'>
                {this.renderContent()}
                <div className='paddingTopRem justifyCenter'>
                    <Button material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onExitClick}
                            icon={<IoMdExit/>}>{getText(TEXT_EXIT)} </Button>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({
        onExitClick: () => dispatch(goBack())
    })
)(RivalPageClosed);
