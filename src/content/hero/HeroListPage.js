import React from 'react';
import {connect} from 'react-redux';
import {getName, getText, TEXT_HIDE, TEXT_NOT_OWNED_WISIES, TEXT_OWNED_WISIES, TEXT_SHOW} from "../../lang/text";
import './styles.css';
import _ from 'lodash';
import {calculateHeroWidth, HERO_TEAM_COUNT} from "../../util/heroHelper";
import {Loading} from "../../component/loading/Loading";
import {heroDetailsChanged, showNotOwnedChanged, teamChanged} from "../../redux/reducer/hero";
import Hero from "../../component/hero/Hero";
import FaPlusSquareO from "react-icons/lib/fa/plus-square-o";
import FaMinusSquareO from "react-icons/lib/fa/minus-square-o";
import {Button} from "../../component/button/Button";
import FaPlusCircle from "react-icons/lib/fa/plus-circle";
import FaMinusCircle from "react-icons/lib/fa/minus-circle";
import MdDescription from 'react-icons/lib/md/description';

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

    renderHeroEdit(hero) {
        const {team, onTeamAddClick, onHeroDetailsClick, onTeamRemoveClick} = this.props;
        const isInTeam = _.some(team, (e) => e.id === hero.id);
        return <Hero key={hero.type} className='pointer' style={{width: this.heroWidth}}
                     onClick={() => isInTeam
                         ? onTeamRemoveClick(team, hero)
                         : team.length < HERO_TEAM_COUNT
                             ? onTeamAddClick(team, hero)
                             : _.noop}
                     {...hero}>
            <div className='left'>
                {!isInTeam && <Button onClick={(e) => {
                    e.stopPropagation();
                    onTeamAddClick(team, hero);
                }}
                                      disabled={team.length >= HERO_TEAM_COUNT}
                                      icon={<FaPlusCircle size={16}/>}/>
                }
                {isInTeam && <Button onClick={(e) => {
                    e.stopPropagation();
                    onTeamRemoveClick(team, hero);
                }}
                                     icon={<FaMinusCircle size={16}/>}/>
                }
                <Button onClick={() => onHeroDetailsClick(hero)} icon={<MdDescription size={16}/>}/>
            </div>
        </Hero>
    }

    renderHero(hero) {
        const {onHeroDetailsClick, edit} = this.props;
        if (edit) {
            return this.renderHeroEdit(hero);
        }
        return <Hero key={hero.type} style={{width: this.heroWidth}} {...hero}
                     className={hero.isOwned ? 'pointer' : ''}
                     onClick={hero.isOwned ? () => onHeroDetailsClick(hero) : _.noop}/>;
    }

    render() {
        const {heroListRep, edit, profileHeroListRep, showNotOwned, onToggleShowNotOwnedClick, screen} = this.props;
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
            {!_.isEmpty(notOwnedHeroes) && !edit && <div className='contentFragment'>
                <div className='title justifyCenter'>
                    <div className='pointer'
                         onClick={() => onToggleShowNotOwnedClick(showNotOwned)}>
                        {`${getText(showNotOwned ? TEXT_HIDE : TEXT_SHOW)} ${getText(TEXT_NOT_OWNED_WISIES).toLowerCase()}`}
                        <span style={{paddingLeft: '0.25rem'}}>{showNotOwned ? <FaMinusSquareO/> :
                            <FaPlusSquareO/>}</span>
                    </div>
                </div>
                {showNotOwned && this.renderHeroes(_.chunk(notOwnedHeroes, groupCount))}
            </div>}
        </div>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        team: state.hero.team,
        showNotOwned: state.hero.showNotOwned,
        path: state.router.location.pathname,
        heroListRep: state.repository.heroList,
        profileHeroListRep: state.repository.profileHeroList
    }),
    (dispatch) => ({
        onHeroDetailsClick: (hero) => dispatch(heroDetailsChanged(hero)),
        onToggleShowNotOwnedClick: (showNotOwned) => dispatch(showNotOwnedChanged(!showNotOwned)),
        onTeamAddClick: (team, hero) => {
            const newTeam = team.concat([hero]);
            dispatch(teamChanged(newTeam))
        },
        onTeamRemoveClick: (team, hero) => {
            const newTeam = team.filter(e => e.id !== hero.id);
            dispatch(teamChanged(newTeam))
        }
    })
)(HeroListPage);
