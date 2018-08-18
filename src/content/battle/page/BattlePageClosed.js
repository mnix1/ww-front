import React from 'react';
import {connect} from 'react-redux';
import {
    getText,
    TEXT_BATTLE_OVER,
    TEXT_OPPONENT_SURRENDER,
    TEXT_THE_WINNER_IS,
    TEXT_YOU_SURRENDER
} from "../../../lang";
import Profiles from "./component/Profiles";
import Profile from "../../../component/profile/Profile";
import trophy from '../../../media/image/icon/trophy.svg';
class BattlePageClosed extends React.PureComponent {

    render() {
        const {content, profile} = this.props;
        const {winnerTag, resigned} = content;
        const meWinner = winnerTag === profile.tag;
        const winnerProfile = winnerTag === profile.tag ? profile : content.opponent;
        return <div className='pageContent battlePageClosed'>
            {resigned && meWinner && <div className='pageHeader'>
                {getText(TEXT_OPPONENT_SURRENDER)}
            </div>}
            {resigned && !meWinner && <div className='pageHeader'>
                {getText(TEXT_YOU_SURRENDER)}
            </div>}
            <div className='pageHeader'>
                {getText(TEXT_BATTLE_OVER)}
                {` ${getText(TEXT_THE_WINNER_IS)}:`}
            </div>
            <div className='pageHeader'>
                <Profile {...winnerProfile}/>
            </div>
            <div className='pageHeader'>
                <img alt='' src={trophy} height={80}/>
            </div>
            <Profiles className={'profilesAbsolute'}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.battle.content,
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(BattlePageClosed);
