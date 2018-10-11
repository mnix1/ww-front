import React from 'react';
import {connect} from 'react-redux';
import swordShield from '../../../media/image/menu/swordShield.svg';
import {getText} from "../../../lang/langText";
import Teams from "../component/Teams";
import {isRanking, RIVAL_TYPE_BATTLE, RIVAL_TYPE_WELCOME_MSG} from "../../../util/rivalHelper";
import Profile from "../../../component/profile/Profile";

class RivalPageIntro extends React.PureComponent {

    renderProfilesBig() {
        const {screen, content, isRanking} = this.props;
        return <div className='profilesBig justifyCenter'>
            <Profile
                renderElo={isRanking}
                elo={isRanking ? content.profileSeason.elo : undefined}
                imgHeight={screen.rivalImgHeight}
                {...content.profile}
            />
            <img alt='' src={swordShield} height={screen.rivalImgHeight}/>
            <Profile
                renderElo={isRanking}
                elo={isRanking ? content.opponentSeason.elo : undefined}
                imgHeight={screen.rivalImgHeight}
                {...content.opponent}
            />
        </div>;
    }

    renderTeamBig() {
        const {content, screen, isRanking} = this.props;
        return <div className='team justifyCenter flexColumn'>
            <Teams renderElo={isRanking} content={content}>
                {content.opponent && <img alt='' src={swordShield} height={screen.rivalImgHeight}/>}
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
        isRanking: isRanking(state.rival.content),
    }),
    (dispatch) => ({})
)(RivalPageIntro);
