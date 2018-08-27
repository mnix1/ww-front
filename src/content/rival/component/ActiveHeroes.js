import React from 'react';
import Hero from "../../../component/hero/Hero";
import Profile from "../../../component/profile/Profile";
import {prepareScoreMessage} from "../../../util/textHelper";
import {connect} from "react-redux";

class ActiveHeroes extends React.PureComponent {

    get imgHeight() {
        const {screen} = this.props;
        if (screen.isSmallHeight || screen.moreHeightThanWidth) {
            return 40;
        }
        return 60;
    }

    renderProfile(profile, score, color) {
        return <Profile {...profile} imgHeight={this.imgHeight}>
        </Profile>
    }

    renderHero(hero, score, color) {
        return <Hero
            key={hero.type}
            imgHeight={this.imgHeight}
            renderDetails={false}
            {...hero}>
        </Hero>;
    }

    renderProfileOrHero(profile, team, activeIndex, score, color) {
        if (activeIndex === 0) {
            return this.renderProfile(profile, score, color);
        }
        return this.renderHero(team[activeIndex - 1], score, color);
    }

    render() {
        const {profile, content, className, scoreColor, opponentScoreColor} = this.props;
        return <div className={`profiles width100 justifyBetween ${className}`}>
            <div className='profile'>
                {this.renderProfileOrHero(profile, content.team, content.activeIndex, content.score, scoreColor)}
            </div>
            <div className='opponentProfile'>
                {this.renderProfileOrHero(content.opponent, content.opponentTeam, content.opponentActiveIndex, content.opponentScore, opponentScoreColor)}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        profile: state.profile.profile,
        screen: state.screen,
    }),
    (dispatch) => ({})
)(ActiveHeroes);
