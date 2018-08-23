import React from 'react';
import {connect} from 'react-redux';
import {getName, getText, TEXT_NOT_OWNED_WISIES, TEXT_OWNED_WISIES} from "../../lang/text";
import './styles.css';
import _ from 'lodash';
import {calculateHeroWidth} from "../../util/heroHelper";
import {Loading} from "../../component/loading/Loading";
import {heroDetailsChanged} from "../../redux/reducer/hero";
import Hero from "../../component/hero/Hero";

class HeroListPage extends React.PureComponent {

    get heroWidth() {
        const {screen} = this.props;
        return calculateHeroWidth(screen.contentWidth - 20) + 8;
    }

    renderHeroes(heroesGroups) {
        return <div className='justifyCenter flexColumn'>
            {heroesGroups.map((e, i) => this.renderHeroesGroup(e, i))}
        </div>;
    }

    renderHeroesGroup(heroes, i) {
        return <div key={i} className='heroes justifyEvenly'>
            {heroes.map(e => this.renderHero(e))}
        </div>;
    }

    renderHero(hero) {
        const {onHeroDetailsClick} = this.props;
        return <Hero key={hero.type} style={{width: this.heroWidth}} {...hero}
                     className={hero.isOwned ? 'pointer' : ''}
                     onClick={hero.isOwned ? () => onHeroDetailsClick(hero) : _.noop}/>;
    }

    render() {
        const {heroListRep, profileHeroListRep, screen} = this.props;
        if (!heroListRep || !heroListRep.fulfilled || !profileHeroListRep || !profileHeroListRep.fulfilled) {
            return <Loading/>;
        }
        const ownedHeroesMap = _.keyBy(profileHeroListRep.value, 'type');
        const groupCount = Math.floor(screen.contentWidth / this.heroWidth);
        const heroes = _.groupBy(heroListRep.value, e => ownedHeroesMap[e.type] ? 'owned' : 'notOwned');
        const ownedHeroes = _.chain(heroes.owned).defaultTo([])
            .sortBy(e => getName(e))
            .map(e => ({...e, ...ownedHeroesMap[e.type], isOwned: true}))
            .value();
        const notOwnedHeroes = _.chain(heroes.notOwned).defaultTo([]).sortBy(e => getName(e)).value();
        return <div>
            {!_.isEmpty(ownedHeroes) && <div className='contentFragment'>
                <div className='title textAlignCenter'>{getText(TEXT_OWNED_WISIES)}</div>
                {this.renderHeroes(_.chunk(ownedHeroes, groupCount))}
            </div>}
            {!_.isEmpty(notOwnedHeroes) && <div className='contentFragment'>
                <div className='title textAlignCenter'>{getText(TEXT_NOT_OWNED_WISIES)}</div>
                {this.renderHeroes(_.chunk(notOwnedHeroes, groupCount))}
            </div>}
        </div>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
        heroListRep: state.repository.heroList,
        profileHeroListRep: state.repository.profileHeroList
    }),
    (dispatch) => ({
        onHeroDetailsClick: (hero) => dispatch(heroDetailsChanged(hero))
    })
)(HeroListPage);
