import React from 'react';
import {connect} from 'react-redux';
import {
    getText,
    TEXT_DRAW,
    TEXT_OPPONENT_SURRENDER,
    TEXT_THE_WINNER_IS,
    TEXT_WAR_OVER,
    TEXT_YOU_SURRENDER
} from "../../../../lang/langText";
import Team from "../../component/Team";
import {getElo, getEloProp, RIVAL_IMPORTANCE_RANKING} from "../../../../util/rivalHelper";
import {GREEN_COLOR, RED_COLOR} from "../../../../util/style/constant";
import _ from "lodash";
import Profiles from "../../component/Profiles";
import {Anime} from "../../../../component/anime/Anime";

class WarPageClosed extends React.PureComponent {

    render() {
        const {content} = this.props;
        const {winnerTag, isDraw, resigned, profile} = content;
        if (isDraw) {
            return <div className='pageContent warPageClosed'>
                {this.renderProfilesWithNewScore()}
                <div className='height100 width100 justifyCenter flexColumn'>
                    <div className='pageHeader'>
                        {getText(TEXT_WAR_OVER)}
                        {` ${getText(TEXT_DRAW)}`}
                    </div>
                </div>
            </div>;
        }
        const meWinner = winnerTag === profile.tag;
        const winnerProps = meWinner
            ? {presentIndexes: content.presentIndexes, team: content.team}
            : {presentIndexes: content.opponentPresentIndexes, team: content.opponentTeam};
        return <div className='pageContent warPageClosed'>
            {this.renderProfilesWithNewScore()}
            <div className='height100 width100 justifyCenter flexColumn'>
                {resigned && meWinner && <div className='pageHeader'>
                    {getText(TEXT_OPPONENT_SURRENDER)}
                </div>}
                {resigned && !meWinner && <div className='pageHeader'>
                    {getText(TEXT_YOU_SURRENDER)}
                </div>}
                <div className='pageHeader'>
                    {getText(TEXT_WAR_OVER)}
                    {` ${getText(TEXT_THE_WINNER_IS)}:`}
                </div>
                <div className='pageHeader'>
                    <Team {...winnerProps}/>
                </div>
            </div>
        </div>;
    }

    renderProfilesWithNewScore() {
        const {content, screen} = this.props;
        if (content.importance !== RIVAL_IMPORTANCE_RANKING) {
            return null;
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
                renderScore={false}
                warElo
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
    (dispatch) => ({})
)(WarPageClosed);
