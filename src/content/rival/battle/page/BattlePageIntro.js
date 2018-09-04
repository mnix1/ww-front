import React from 'react';
import {connect} from 'react-redux';
import Profile from "../../../../component/profile/Profile";
import swordShield from '../../../../media/image/menu/swordShield.svg';
import {getText, TEXT_BATTLE} from "../../../../lang/langText";
import {renderBattleElo} from "../../../../util/rivalHelper";

class BattlePageIntro extends React.PureComponent {

    renderProfilesBig() {
        const {screen, content} = this.props;
        return <div className='profilesBig justifyCenter'>
            <Profile renderBattleElo={renderBattleElo(content)} imgHeight={screen.wisieImgHeight} {...content.profile}/>
            <img alt='' src={swordShield} height={screen.wisieImgHeight}/>
            <Profile renderBattleElo={renderBattleElo(content)}
                     imgHeight={screen.wisieImgHeight} {...content.opponent}/>
        </div>;
    }

    render() {
        return <div className='pageContent battlePageIntro'>
            <div>
                <div className='pageHeader title'>{getText(TEXT_BATTLE)}</div>
                {this.renderProfilesBig()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(BattlePageIntro);
