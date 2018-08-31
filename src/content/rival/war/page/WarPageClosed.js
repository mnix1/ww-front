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
import trophy from '../../../../media/image/icon/trophy.svg';
import _ from 'lodash';
import Team from "../../component/Team";

class WarPageClosed extends React.PureComponent {

    render() {
        const {content, profile} = this.props;
        const {winnerTag, resigned} = content;
        if (_.isNil(winnerTag) || winnerTag === '') {
            return <div className='pageContent warPageClosed'>
                <div className='pageHeader'>
                    {getText(TEXT_WAR_OVER)}
                    {` ${getText(TEXT_DRAW)}`}
                </div>
            </div>;
        }
        const meWinner = winnerTag === profile.tag;
        const winnerProps = meWinner
            ? {profile, presentIndexes: content.presentIndexes, team: content.team}
            : {profile: content.opponent, presentIndexes: content.opponentPresentIndexes, team: content.opponentTeam};
        return <div className='pageContent warPageClosed'>
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
            <div className='pageHeader'>
                <img alt='' src={trophy} height={80}/>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.war.content,
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(WarPageClosed);
