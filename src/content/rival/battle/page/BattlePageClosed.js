import React from 'react';
import {connect} from 'react-redux';
import {
    getText,
    TEXT_DRAW,
    TEXT_EXIT,
    TEXT_OPPONENT_SURRENDER,
    TEXT_THE_WINNER_IS,
    TEXT_YOU_SURRENDER
} from "../../../../lang/langText";
import Profiles from "../../component/Profiles";
import Profile from "../../../../component/profile/Profile";
import {GREEN_COLOR, RED_COLOR} from "../../../../util/style/constant";
import {Anime} from "../../../../component/anime/Anime";
import {getElo, getEloProp, RIVAL_IMPORTANCE_RANKING, RIVAL_TYPE_FAREWELL_MSG} from "../../../../util/rivalHelper";
import _ from 'lodash';
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../../component/button/Button";
import {goBack} from "connected-react-router";

class BattlePageClosed extends React.PureComponent {

    render() {
        const {content, screen, onExitClick} = this.props;
        const {winnerTag, isDraw, resigned, importance} = content;
        if (isDraw) {
            return <div className='pageContent battlePageClosed'>
                {this.renderProfilesWithNewScore(importance)}
                <div className='height100 width100 justifyCenter flexColumn'>
                    <div className='pageHeader'>
                        {getText(RIVAL_TYPE_FAREWELL_MSG[content.type])}
                    </div>
                    <div className='pageHeader'>
                       {getText(TEXT_DRAW)}
                    </div>
                </div>
            </div>;
        }
        const meWinner = winnerTag === content.profile.tag;
        const winnerProfile = winnerTag === content.profile.tag ? content.profile : content.opponent;
        return <div className='pageContent battlePageClosed'>
            {this.renderProfilesWithNewScore(importance)}
            <div className='height100 width100 justifyCenter flexColumn'>
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
                    <Profile imgHeight={screen.wisieImgHeight} {...winnerProfile}/>
                </div>
                <div className='paddingTopRem justifyCenter'>
                    <Button material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onExitClick}>{getText(TEXT_EXIT)}</Button>
                </div>
            </div>
        </div>;
    }

    renderProfilesWithNewScore(importance) {
        const {content, screen} = this.props;
        if (importance !== RIVAL_IMPORTANCE_RANKING) {
            return <Profiles content={content} className='absolute'/>;
        }
        const oldProfileElo = getElo(content.profile, content.type);
        const newProfileElo = getElo(content.newProfile, content.type);
        const oldOpponentElo = getElo(content.opponent, content.type);
        const newOpponentElo = getElo(content.newOpponent, content.type);
        const scoreColor = newProfileElo === oldProfileElo ? undefined : (newProfileElo > oldProfileElo ? GREEN_COLOR : RED_COLOR);
        const opponentScoreColor = newOpponentElo === oldOpponentElo ? undefined : (newOpponentElo > oldOpponentElo ? GREEN_COLOR : RED_COLOR);
        return <Anime
            targetTransformer={t => ({
                content: {
                    ...content,
                    profile: {...content.profile, [getEloProp(content.type)]: _.round(t.points)},
                    opponent: {...content.opponent, [getEloProp(content.type)]: _.round(t.opponentPoints)},
                }
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
                battleElo
                className='absolute'
                screen={screen}
                eloStyle={{color: scoreColor}}
                opponentEloStyle={{color: opponentScoreColor}}
            />
        </Anime>;
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
)(BattlePageClosed);
