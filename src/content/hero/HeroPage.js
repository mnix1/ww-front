import React from 'react';
import {connect} from 'react-redux';
import {getHeroName} from "../../lang";
import Profile from "../../component/profile/Profile";
import './styles.css';
import _ from 'lodash';
import {getCategory} from "../../util/categoryHelper";
import {calculateHeroWidth} from "../../util/heroHelper";

class HeroPage extends React.PureComponent {

    get heroWidth() {
        const {screen} = this.props;
        return calculateHeroWidth(screen.contentWidth - 20);

    }

    renderHeroes() {
        const {heroListRep, screen} = this.props;
        if (!heroListRep || !heroListRep.fulfilled) {
            return null;
        }
        const groupCount = Math.floor(screen.contentWidth / this.heroWidth);
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
        return <div key={hero.type} className='hero' style={{width: this.heroWidth}}>
            <Profile imgHeight={100} heroType={hero.type}>{this.renderHeroDetails(hero)}</Profile>
        </div>;
    }

    renderHeroDetails(hero) {
        const name = getHeroName(hero);
        return <div className='heroDetails'>
            <div className='background'/>
            <span className='name'>{name}</span>
            <div className='hobbies'>
                {hero.hobbies.map(e => <img className='hobby' key={e} alt='' height={20} src={getCategory(e)}/>)}
            </div>
        </div>
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
