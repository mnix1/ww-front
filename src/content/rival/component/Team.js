import React from 'react';
import Hero from "../../../component/hero/Hero";
import Profile from "../../../component/profile/Profile";
import _ from 'lodash';

export default class Team extends React.PureComponent {

    renderHeroes(heroes, activeIndex, presentIndexes) {
        return <div className='justifyCenter flexWrap'>
            {heroes.map((e, i) => this.renderHero(e, i + 1 === activeIndex, !_.includes(presentIndexes, i + 1)))}
        </div>;
    }

    renderHero(hero, isActive, isDisabled) {
        return <Hero
            className={isDisabled ? 'disabled' : ''}
            key={hero.type}
            isActive={isActive}
            imgHeight={80}
            renderDetails={true}
            renderHobbies={false}
            isOwned={true}
            {...hero}/>;
    }

    render() {
        const {profile, team, activeIndex, presentIndexes} = this.props;
        return <div className='justifyCenter'>
            <Profile blackBackground={true} renderDetailsHorizontal={true} isActive={activeIndex === 0} {...profile}
                     imgHeight={84}
                     className={_.head(presentIndexes) === 0 ? '' : 'disabled'}/>
            {this.renderHeroes(team, activeIndex, presentIndexes)}
        </div>
    }
}