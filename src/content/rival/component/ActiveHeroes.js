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

    renderProfile(profile) {
        return <Profile  blackBackground={true} renderDetailsHorizontal={true} {...profile} imgHeight={this.imgHeight}>
        </Profile>
    }

    renderHero(hero) {
        return <Hero
            isOwned={true}
            renderHobbies={false}
            key={hero.type}
            imgHeight={this.imgHeight}
            renderDetails={true}
            {...hero}>
        </Hero>;
    }

    renderProfileOrHero(profile, team, activeIndex) {
        if (activeIndex === 0) {
            return this.renderProfile(profile);
        }
        return this.renderHero(team[activeIndex - 1]);
    }

    render() {
        const {profile, content, className} = this.props;
        return <div className={`profiles width100 justifyBetween ${className}`}>
            <div className='profile'>
                {this.renderProfileOrHero(profile, content.team, content.activeIndex)}
            </div>
            <div className='opponentProfile'>
                {this.renderProfileOrHero(content.opponent, content.opponentTeam, content.opponentActiveIndex)}
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
