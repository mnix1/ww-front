import React from 'react';
import {connect} from 'react-redux';
import {getName, getText, TEXT_NOT_OWNED_WISIES, TEXT_OWNED_WISIES} from "../../lang";
import Profile from "../../component/profile/Profile";
import './styles.css';
import _ from 'lodash';
import {getCategory} from "../../util/categoryHelper";
import {calculateHeroWidth} from "../../util/heroHelper";
import {Loading} from "../../component/loading/Loading";

class HeroPage extends React.PureComponent {

    get heroWidth() {
        const {screen} = this.props;
        return calculateHeroWidth(screen.contentWidth - 20);
    }

    renderContent() {
        const {heroListRep, screen} = this.props;
        if (!heroListRep || !heroListRep.fulfilled) {
            return <Loading/>;
        }
        const groupCount = Math.floor(screen.contentWidth / this.heroWidth);
        const ownedHeroes = _.chain(heroListRep.value).filter('isOwned').sortBy(e => getName(e)).value();
        const notOwnedHeroes = _.chain(heroListRep.value).filter(e => !e.isOwned).sortBy(e => getName(e)).value();
        return <div>
            {!_.isEmpty(ownedHeroes) && <div className='contentFragment'>
                <div className='title'>{getText(TEXT_OWNED_WISIES)}</div>
                {this.renderHeroes(_.chunk(ownedHeroes, groupCount))}
            </div>}
            {!_.isEmpty(notOwnedHeroes) && <div className='contentFragment'>
                <div className='title'>{getText(TEXT_NOT_OWNED_WISIES)}</div>
                {this.renderHeroes(_.chunk(notOwnedHeroes, groupCount))}
            </div>}
        </div>
    }

    renderHeroes(heroesGroups) {
        return <div className='justifyCenter flexColumn'>
            {heroesGroups.map((e, i) => this.renderHeroesGroup(e, i))}
        </div>;
    }

    renderHeroesGroup(heroes, i) {
        return <div key={i} className='heroes'>
            {heroes.map(e => this.renderHero(e))}
        </div>;
    }

    renderHero(hero) {
        return <div key={hero.type} className={`hero ${hero.isOwned ? 'owned' : 'notOwned'}`}
                    style={{width: this.heroWidth}}>
            <Profile imgHeight={100} heroType={hero.type}>{this.renderHeroDetails(hero)}</Profile>
        </div>;
    }

    renderHeroDetails(hero) {
        const name = getName(hero);
        return <div className='heroDetails justifyBetween'>
            <div className='absoluteBackgroundMix'/>
            <span className='name'>{name}</span>
            <div className='hobbies'>
                {hero.hobbies.map(e => <img alt='' className='hobby' key={e} height={20} src={getCategory(e)}/>)}
            </div>
        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className='page heroPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <div className='pageBackground absoluteBackgroundMix'/>
            <div className='pageContent'>
                {this.renderContent()}
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
