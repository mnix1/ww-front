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
                grade={isRanking ? content.profileSeason.grade : undefined}
                imgHeight={screen.rivalImgHeight}
                renderGrade={isRanking}
                {...content.profile}
            />
            <img draggable="false" alt='' src={swordShield} height={screen.rivalImgHeight}/>
            <Profile
                renderElo={isRanking}
                elo={isRanking ? content.opponentSeason.elo : undefined}
                grade={isRanking ? content.opponentSeason.grade : undefined}
                imgHeight={screen.rivalImgHeight}
                renderGrade={isRanking}
                {...content.opponent}
            />
        </div>;
    }

    renderTeamBig() {
        const {content, screen, isRanking} = this.props;
        return <div className='team justifyCenter flexColumn'>
            <Teams renderElo={isRanking} content={content}>
                {content.opponent && <img draggable="false" alt='' src={swordShield} height={screen.rivalImgHeight}/>}
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
