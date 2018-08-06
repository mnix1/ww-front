import React from 'react';
import {connect} from 'react-redux';
import {getHeroName} from "../../lang";
import Profile from "../../component/profile/Profile";
import './styles.css';
import _ from 'lodash';

const HERO_WIDTH = 150;

class HeroPage extends React.PureComponent {

    renderHeroes() {
        const {heroListRep, screen} = this.props;
        if (!heroListRep || !heroListRep.fulfilled) {
            return null;
        }
        const groupCount = Math.floor(screen.contentWidth / HERO_WIDTH);
        const heroes = _.sortBy(heroListRep.value, e => getHeroName(e));
        const heroesGroups = _.chunk(heroes, groupCount);
        return <div className='heroesContainer'>
            {heroesGroups.map((e, i) => this.renderHeroesGroup(e, i))}
        </div>;
    }

    renderHeroesGroup(heroes, i) {
        return <div key={i} className='heroes'>
            {heroes.map(e => this.renderHero(e))}
        </div>;
    }

    renderHero(hero) {
        const name = getHeroName(hero);
        return <div key={hero.type} className='hero' style={{width: HERO_WIDTH}}>
            <Profile imgHeight={100} heroType={hero.type}>{name}</Profile>
        </div>;
    }

    render() {
        const {screen} = this.props;
        return <div className='page heroPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <div className='pageBackground'/>
            <div className='pageContent'>
                {this.renderHeroes()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
        heroListRep: state.repository.heroList
    }),
    (dispatch) => ({})
)(HeroPage);
