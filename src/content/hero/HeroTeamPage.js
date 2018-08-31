import React from 'react';
import {connect} from 'react-redux';
import {getName, getText, TEXT_CANCEL, TEXT_CLEAR, TEXT_EDIT, TEXT_SAVE, TEXT_WISIES_TEAM,} from "../../lang/langText";
import './styles.css';
import _ from 'lodash';
import Hero from "../../component/hero/Hero";
import {HERO_TEAM_COUNT} from "../../util/heroHelper";
import FaEdit from "react-icons/lib/fa/edit";
import FaEraser from "react-icons/lib/fa/eraser";
import MdSave from "react-icons/lib/md/save";
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {goBack, push} from "connected-react-router";
import {WISIES_TEAM_EDIT_ROUTE} from "../routes";
import {teamChanged, teamSaveChanged} from "../../redux/reducer/hero";

class HeroTeamPage extends React.PureComponent {
    renderHeroes(heroes) {
        const maybeEmptyHeroes = _.take(_.flatten([heroes, _.fill(Array(HERO_TEAM_COUNT), null)]), HERO_TEAM_COUNT);
        return <div className='justifyCenter flexWrap'>
            {maybeEmptyHeroes.map((e, i) => _.isNil(e) ? this.renderEmptySlot(i) : this.renderHero(e))}
        </div>;
    }

    renderHero(hero) {
        const {edit, onTeamRemoveClick, team} = this.props;
        return <Hero
            key={hero.type}
            imgHeight={80}
            className={edit ? 'pointer' : ''}
            onClick={edit ? () => onTeamRemoveClick(team, hero) : _.noop}
            renderDetails={false}
            {...hero}/>;
    }

    renderEmptySlot(i) {
        return <div key={i} className='boxShadow marginRem' style={{minWidth: 40, minHeight: 40}}>
        </div>;
    }

    renderTeamActions(inTeamHeroes) {
        const {onTeamEditClick, onRouteBack, edit, onEraseTeamClick, onTeamSaveClick} = this.props;
        if (!edit) {
            return <Button className='marginRem' material={BUTTON_MATERIAL_BOX_SHADOW}
                           onClick={() => onTeamEditClick(inTeamHeroes)}
                           icon={<FaEdit size={16}/>}>{getText(TEXT_EDIT)}</Button>;
        }
        const saveDisabled = inTeamHeroes.length !== HERO_TEAM_COUNT;
        return <div>
            <Button className='marginRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onRouteBack}
                    icon={<FaTimesCircle size={16}/>}>{getText(TEXT_CANCEL)}</Button>
            <Button className='marginRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onEraseTeamClick}
                    icon={<FaEraser size={16}/>}>{getText(TEXT_CLEAR)}</Button>
            <Button className='marginRem' disabled={saveDisabled} material={BUTTON_MATERIAL_BOX_SHADOW}
                    onClick={saveDisabled ? _.noop : onTeamSaveClick}
                    icon={<MdSave size={16}/>}>{getText(TEXT_SAVE)}</Button>
        </div>
    }

    render() {
        const {heroListRep, profileHeroes, edit, team} = this.props;
        if (!heroListRep || !heroListRep.fulfilled) {
            return null;
        }
        if (profileHeroes.length < HERO_TEAM_COUNT) {
            return null;
        }
        const inTeamHeroes = edit ? team : profileHeroes.filter(e => e.inTeam);
        const inTeamHeroesMap = _.keyBy(inTeamHeroes, 'type');
        const heroes = _.chain(heroListRep.value.filter(e => inTeamHeroesMap[e.type]))
            .defaultTo([])
            .sortBy(e => getName(e))
            .map(e => ({...e, ...inTeamHeroesMap[e.type], isOwned: true}))
            .value();
        return <div>
            <div className='title textAlignCenter paddingRem'>
                {getText(TEXT_WISIES_TEAM)}
                {this.renderTeamActions(inTeamHeroes)}
            </div>
            {this.renderHeroes(heroes)}
        </div>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
        team: state.hero.team,
        heroListRep: state.repository.heroList,
        profileHeroes: state.hero.profileHeroes
    }),
    (dispatch) => ({
        onTeamEditClick: (team) => {
            dispatch(teamChanged(team));
            dispatch(push(WISIES_TEAM_EDIT_ROUTE));
        },
        onRouteBack: () => {
            dispatch(goBack());
        },
        onEraseTeamClick: () => {
            dispatch(teamChanged([]));
        },
        onTeamSaveClick: () => {
            dispatch(teamSaveChanged(true));
            // dispatch(goBack());
        },
        onTeamRemoveClick: (team, hero) => {
            const newTeam = team.filter(e => e.id !== hero.id);
            dispatch(teamChanged(newTeam))
        }
    })
)(HeroTeamPage);
