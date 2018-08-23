import React from 'react';
import {connect} from 'react-redux';
import {getName, getText, TEXT_EDIT, TEXT_WISIES_TEAM,} from "../../lang/text";
import './styles.css';
import _ from 'lodash';
import {Loading} from "../../component/loading/Loading";
import Hero from "../../component/hero/Hero";
import {HERO_TEAM_COUNT} from "../../util/heroHelper";
import FaEdit from "react-icons/lib/fa/edit";
import {Button} from "../../component/button/Button";

class HeroTeamPage extends React.PureComponent {
    renderHeroes(heroes) {
        const maybeEmptyHeroes = _.take(_.flatten([heroes, _.fill(Array(HERO_TEAM_COUNT), null)]), HERO_TEAM_COUNT);
        return <div className='justifyCenter'>
            {maybeEmptyHeroes.map(e => _.isNil(e) ? this.renderEmptySlot() : this.renderHero(e))}
        </div>;
    }

    renderHero(hero) {
        const {onHeroDetailsClick} = this.props;
        return <Hero key={hero.type} {...hero}
                     className={hero.isOwned ? 'pointer' : ''}
                     onClick={hero.isOwned ? () => onHeroDetailsClick(hero) : _.noop}/>;
    }

    renderEmptySlot(hero) {
        const {onHeroDetailsClick} = this.props;
        return <div className='boxShadow' style={{minWidth: 100, minHeight: 100}}>

        </div>;
    }

    render() {
        const {heroListRep, profileHeroListRep} = this.props;
        if (!heroListRep || !heroListRep.fulfilled || !profileHeroListRep || !profileHeroListRep.fulfilled) {
            return <Loading/>;
        }
        if (profileHeroListRep.value.length < HERO_TEAM_COUNT) {
            return null;
        }
        const inTeamHeroes = profileHeroListRep.value.filter(e => e.inTeam);
        const inTeamHeroesMap = _.keyBy(inTeamHeroes, 'type');
        const heroes = _.chain(heroListRep.value.filter(e => inTeamHeroesMap[e.type]))
            .defaultTo([])
            .sortBy(e => getName(e))
            .map(e => ({...e, ...inTeamHeroesMap[e.type], isOwned: true}))
            .value();
        return <div>
            <div className='title textAlignCenter'>
                {getText(TEXT_WISIES_TEAM)}
                <Button icon={<FaEdit size={14}/>}/>
            </div>
            {this.renderHeroes(heroes)}
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
    (dispatch) => ({})
)(HeroTeamPage);
