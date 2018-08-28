import React from 'react';
import Hero from "../../../component/hero/Hero";
import Profile from "../../../component/profile/Profile";
import _ from 'lodash';
import {connect} from "react-redux";

class Team extends React.PureComponent {

    get imgHeight() {
        const {screen} = this.props;
        if (screen.isSmallHeight || screen.moreHeightThanWidth) {
            return 60;
        }
        return 80;
    }

    renderHeroes(heroes, activeIndex, presentIndexes) {
        return heroes.map((e, i) => this.renderHero(e, i + 1 === activeIndex, !_.includes(presentIndexes, i + 1)));
    }

    renderHero(hero, isActive, isDisabled) {
        return <Hero
            className={isDisabled ? 'disabled' : ''}
            key={hero.type}
            isActive={isActive}
            imgHeight={this.imgHeight}
            renderDetails={true}
            renderHobbies={false}
            isOwned={true}
            {...hero}/>;
    }

    render() {
        const {profile, team, activeIndex, presentIndexes} = this.props;
        return <div className='justifyCenter'>
            <div className='justifyCenter'>
                <Profile blackBackground={true} renderDetailsHorizontal={true} isActive={activeIndex === 0} {...profile}
                         imgHeight={this.imgHeight + 4}
                         className={_.head(presentIndexes) === 0 ? '' : 'disabled'}/>
                {this.renderHeroes(team, activeIndex, presentIndexes)}
            </div>
        </div>
    }
}


export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(Team);
