import React from 'react';
import Hero from "../../../component/hero/Hero";
import Profile from "../../../component/profile/Profile";
import {connect} from "react-redux";

class ActiveHero extends React.PureComponent {

    get imgHeight() {
        const {imgHeight, screen} = this.props;
        if(imgHeight) {
            return imgHeight;
        }
        return screen.heroImgHeight;
    }

    renderProfile(profile) {
        return <Profile blackBackground={true} renderDetailsHorizontal={true} {...profile} imgHeight={this.imgHeight}/>;
    }

    renderHero(hero) {
        return <Hero
            isOwned={true}
            renderHobbies={true}
            key={hero.type}
            imgHeight={this.imgHeight}
            imgHobbyHeight={this.imgHeight / 3}
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
        const {profile, team, activeIndex, className} = this.props;
        return <div className={className}>
            {this.renderProfileOrHero(profile, team, activeIndex)}
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(ActiveHero);
