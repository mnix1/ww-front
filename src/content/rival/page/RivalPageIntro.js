import React from 'react';
import {connect} from 'react-redux';
import swordShield from '../../../media/image/menu/swordShield.svg';
import {getText} from "../../../lang/langText";
import Teams from "../component/Teams";
import {isRanking, renderBattleElo, RIVAL_TYPE_BATTLE, RIVAL_TYPE_WELCOME_MSG} from "../../../util/rivalHelper";
import Profile from "../../../component/profile/Profile";

class RivalPageIntro extends React.PureComponent {

    renderProfilesBig() {
        const {screen, content} = this.props;
        return <div className='profilesBig justifyCenter'>
            <Profile renderBattleElo={renderBattleElo(content)} imgHeight={screen.standardImgHeight} {...content.profile}/>
            <img alt='' src={swordShield} height={screen.standardImgHeight}/>
            <Profile renderBattleElo={renderBattleElo(content)}
                     imgHeight={screen.standardImgHeight} {...content.opponent}/>
        </div>;
    }

    renderTeamBig() {
        const {content, screen} = this.props;
        return <div className='team justifyCenter flexColumn'>
            <Teams renderElo={isRanking(content)} content={content}>
                {content.opponent && <img alt='' src={swordShield} height={screen.standardImgHeight}/>}
            </Teams>
        </div>;
    }

    render() {
        // console.log('RivalPageIntro render');
        const {content} = this.props;
        return <div className='pageContent warPageIntro'>
             <div>
                <div className='pageHeader title'>{getText(RIVAL_TYPE_WELCOME_MSG[content.type])}</div>
                {content.type === RIVAL_TYPE_BATTLE ? this.renderProfilesBig() : this.renderTeamBig()}
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
)(RivalPageIntro);
