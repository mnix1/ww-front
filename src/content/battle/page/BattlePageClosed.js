import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_BATTLE_OVER, TEXT_THE_WINNER_IS} from "../../../lang";
import Profiles from "./component/Profiles";

class BattlePageClosed extends React.PureComponent {

    render() {
        const {content, profile} = this.props;
        const {winnerTag} = content;
        const winner = winnerTag === profile.tag ? profile.name : content.opponent.name;
        return <div className='pageContent battlePageClosed'>
            <div className='pageHeader'>
                <div>
                    {getText(TEXT_BATTLE_OVER)}
                    {` ${getText(TEXT_THE_WINNER_IS)}: ${winner}`}
                </div>
            </div>
            <Profiles className={'profilesRelative'}/>
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
