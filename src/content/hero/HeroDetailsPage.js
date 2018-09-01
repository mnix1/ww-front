import React from 'react';
import {connect} from 'react-redux';
import Modal from "../../component/modal/Modal";
import HeroAttribute from "../../component/hero/HeroAttribute";
import FaPlusCircle from "react-icons/lib/fa/plus-circle";
import FaMinusCircle from "react-icons/lib/fa/minus-circle";
import {
    COMBINING_FACTS,
    CONCENTRATION,
    CONFIDENCE,
    COUNTING,
    IMAGINATION,
    INTUITION, LOGIC,
    MEMORY,
    PATTERN_RECOGNITION,
    PERCEPTIVITY,
    REFLEX,
    SPEED
} from "../../util/heroAttributeHelper";
import Hero from "../../component/hero/Hero";
import {heroDetailsChanged, teamChanged, upgradePropsChanged} from "../../redux/reducer/hero";
import {Button} from "../../component/button/Button";
import {HERO_TEAM_COUNT} from "../../util/heroHelper";
import {getText, TEXT_TEAM_ADD, TEXT_TEAM_REMOVE} from "../../lang/langText";
import _ from 'lodash';
import {GREEN_COLOR} from "../../util/style/constant";
import Wisdom from "../../component/resource/Wisdom";
import {RESOURCE_VERY_SMALL} from "../../component/resource/Resource";
import {clearHeroUpgradeFetch} from "./fetch/HeroUpgradeFetch";

class HeroDetailsPage extends React.PureComponent {

    get pending() {
        const {heroUpgradeRep} = this.props;
        return _.get(heroUpgradeRep, 'pending');
    }

    get change() {
        const {heroUpgradeRep} = this.props;
        return _.get(heroUpgradeRep, 'value.attributeChange');
    }

    renderHero(hero) {
        return <Hero {...hero} style={{}}>
            {this.renderHeroAttributes(hero)}
        </Hero>;
    }

    renderUpgradeCost(cost) {
        const {profile} = this.props;
        return <div className='justifyCenter' style={{marginLeft: '0.25rem'}}>
            (<Wisdom notEnough={profile.wisdom < cost} margin={false} column={false}
                     size={RESOURCE_VERY_SMALL}>{cost}</Wisdom>)
        </div>;
    }

    renderHeroAttributes(hero) {
        const {upgrade} = this.props;
        return <div className='justifyEvenly' style={{fontSize: '0.8em'}}>
            <div className='flexColumn flex paddingRem marginRem boxShadow'>
                <div className='justifyCenter'>
                    Wiedza
                    {upgrade && this.renderUpgradeCost(1)}
                </div>
                {this.renderHeroAttribute(hero, MEMORY, 1)}
                {this.renderHeroAttribute(hero, LOGIC, 1)}
                {this.renderHeroAttribute(hero, PERCEPTIVITY, 1)}
                {this.renderHeroAttribute(hero, COUNTING, 1)}
                {this.renderHeroAttribute(hero, COMBINING_FACTS, 1)}
                {this.renderHeroAttribute(hero, PATTERN_RECOGNITION, 1)}
                {this.renderHeroAttribute(hero, IMAGINATION, 1)}
            </div>
            <div className='flexColumn flex paddingRem marginRem boxShadow'>
                <div className='justifyCenter'>
                    Mentalność
                    {upgrade && this.renderUpgradeCost(2)}
                </div>
                {this.renderHeroAttribute(hero, SPEED, 2)}
                {this.renderHeroAttribute(hero, REFLEX, 2)}
                {this.renderHeroAttribute(hero, CONCENTRATION, 2)}
                {this.renderHeroAttribute(hero, CONFIDENCE, 2)}
                {this.renderHeroAttribute(hero, INTUITION, 2)}
            </div>
        </div>;
    }

    renderHeroAttribute(hero, attribute, cost) {
        const {upgrade, profile, onUpgradeClick, upgradeProps} = this.props;
        let change = undefined;
        const pending = this.pending;
        if (!pending && hero.id === _.get(upgradeProps, 'id') && upgradeProps.attribute === attribute) {
            change = <div style={{color: GREEN_COLOR, paddingRight: '0.25rem'}}>(+{this.change})</div>;
        } else {
            change = <div style={{opacity: 0, paddingRight: '0.25rem'}}>(+0.00)</div>
        }
        return <div className='justifyBetween'>
            <div className='width100'>
                <HeroAttribute change={change} hero={hero} attribute={attribute}/>
            </div>
            {upgrade && cost <= profile.wisdom && <div className='justifyCenter flexColumn'>
                <FaPlusCircle className={`pointer ${pending ? 'disabled' : ''}`} color={GREEN_COLOR}
                              onClick={pending ? _.noop : () => onUpgradeClick(hero, attribute)}/>
            </div>}
        </div>;
    }

    renderModalHeader() {
        const {team, edit, heroDetails, onTeamAddClick, onTeamRemoveClick} = this.props;
        if (!edit) {
            return null;
        }
        const isInTeam = _.some(team, (e) => e.id === heroDetails.id);
        return <div className='left'>
            {!isInTeam && <Button onClick={() => onTeamAddClick(team, heroDetails)}
                                  disabled={team.length >= HERO_TEAM_COUNT}
                                  icon={<FaPlusCircle/>}>{getText(TEXT_TEAM_ADD)}</Button>
            }
            {isInTeam && <Button onClick={() => onTeamRemoveClick(team, heroDetails)}
                                 icon={<FaMinusCircle/>}>{getText(TEXT_TEAM_REMOVE)}</Button>
            }

        </div>;
    }

    render() {
        const {heroDetails, onExitClick} = this.props;
        if (!heroDetails) {
            return null;
        }
        return <Modal header={this.renderModalHeader()} onExitClick={onExitClick}>
            {this.renderHero(heroDetails)}
        </Modal>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        team: state.hero.team,
        heroDetails: state.hero.heroDetails,
        heroUpgradeRep: state.repository.heroUpgrade,
        upgradeProps: state.hero.upgradeProps,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onExitClick: () => dispatch(heroDetailsChanged(undefined)),
        onTeamAddClick: (team, hero) => {
            const newTeam = team.concat([hero]);
            dispatch(teamChanged(newTeam))
        },
        onTeamRemoveClick: (team, hero) => {
            const newTeam = team.filter(e => e.id !== hero.id);
            dispatch(teamChanged(newTeam))
        },
        onUpgradeClick: (hero, attribute) => {
            dispatch(upgradePropsChanged({id: hero.id, attribute}));
            clearHeroUpgradeFetch(dispatch);
            // const newTeam = team.filter(e => e.id !== hero.id);
            // dispatch(teamChanged(newTeam))
        }
    })
)(HeroDetailsPage);
