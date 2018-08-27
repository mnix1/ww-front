import React from 'react';
import Hero from "../../../component/hero/Hero";
import Profile from "../../../component/profile/Profile";

export default class Team extends React.PureComponent {

    renderHeroes(heroes, activeId) {
        return <div className='justifyCenter flexWrap'>
            {heroes.map((e, i) => this.renderHero(e, i === activeId - 1))}
        </div>;
    }

    renderHero(hero, isActive) {
        return <Hero
            key={hero.type}
            isActive={isActive}
            imgHeight={80}
            renderDetails={false}
            {...hero}/>;
    }

    render() {
        const {profile, team, activeId} = this.props;
        return <div className='justifyCenter'>
            <Profile isActive={activeId === 0} {...profile}/>
            {this.renderHeroes(team, activeId)}
        </div>
    }
}