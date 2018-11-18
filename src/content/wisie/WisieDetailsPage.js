import React from 'react';
import {connect} from 'react-redux';
import Modal from "../../component/modal/Modal";
import WisieAttribute from "../../component/wisie/WisieAttribute";
import {FaMinusCircle, FaPlusCircle, FaRetweet} from "react-icons/fa";
import {
    CONCENTRATION,
    CONFIDENCE,
    COUNTING,
    CUNNING,
    IMAGINATION,
    INTUITION,
    LOGIC,
    MEMORY,
    PATTERN_RECOGNITION,
    PERCEPTIVITY,
    REFLEX,
    SPEED
} from "../../util/wisieAttributeHelper";
import Wisie from "../../component/wisie/Wisie";
import {
    changeHobbyPropsChanged,
    changeSkillPropsChanged,
    teamChanged,
    upgradeAttributePropsChanged,
    wisieDetailsChanged
} from "../../redux/reducer/wisie";
import {Button} from "../../component/button/Button";
import {WISIE_MAX_HOBBY_COUNT, WISIE_TEAM_COUNT} from "../../util/wisieHelper";
import {getText, TEXT_MENTALITY, TEXT_TEAM_ADD, TEXT_TEAM_REMOVE, TEXT_WISDOM} from "../../lang/langText";
import _ from 'lodash';
import {GREEN_COLOR} from "../../util/style/constant";
import Wisdom from "../../component/resource/Wisdom";
import {RESOURCE_VERY_SMALL} from "../../component/resource/Resource";
import {clearWisieUpgradeAttributeFetch} from "./fetch/WisieUpgradeAttributeFetch";
import {INTRO_STEP_WISIE_DETAILS, INTRO_STEP_WISIE_DETAILS_CLOSE} from "../intro/introHelper";
import {getCategory} from "../../util/categoryHelper";
import {isRepPending} from "../../util/repositoryHelper";
import {
    WISIE_MENTAL_UPGRADE_COST,
    WISIE_WISDOM_UPGRADE_COST,
    wisieChangeHobbyCost,
    wisieChangeSkillCost
} from "../../util/resourceHelper";
import Crystal from "../../component/resource/Crystal";
import Elixir from "../../component/resource/Elixir";
import {getSkill} from "../../util/skillHelper";

class WisieDetailsPage extends React.PureComponent {

    get pending() {
        const {wisieUpgradeAttributeRep, wisieChangeHobbyRep} = this.props;
        return isRepPending(wisieUpgradeAttributeRep) || isRepPending(wisieChangeHobbyRep);
    }

    get change() {
        const {wisieUpgradeAttributeRep} = this.props;
        return _.get(wisieUpgradeAttributeRep, 'value.attributeChange');
    }

    renderWisieCustomHobbies(wisie) {
        const {onChangeHobbyClick, profile} = this.props;
        const enableAdd = wisie.hobbies.length < WISIE_MAX_HOBBY_COUNT;
        const cost = wisieChangeHobbyCost(profile, wisie);
        const pending = this.pending;
        return <div className='justifyCenter'>
            <div className='justifyCenter'>
                <div className='justifyCenter flexColumn'>
                    <div className='justifyCenter'>
                        <Crystal notEnough={profile.crystal < cost.crystal} styleMargin={false}
                                 size={RESOURCE_VERY_SMALL}>{cost.crystal}</Crystal>
                        <Elixir className='paddingLeftRem' notEnough={profile.elixir < cost.elixir} styleMargin={false}
                                size={RESOURCE_VERY_SMALL}>{cost.elixir}</Elixir>
                    </div>
                </div>
                {enableAdd &&
                <FaPlusCircle
                    className={`paddingLeftRem pointer ${pending || !cost.isEnoughResource ? 'disabled' : ''}`}
                    color={GREEN_COLOR}
                    onClick={pending || !cost.isEnoughResource ? _.noop : () => onChangeHobbyClick(wisie, null)}
                    size={24}/>}
            </div>
            <div className='justifyStart flexColumn'>
                <div className='justifyCenter'>
                    {wisie.hobbies.map(e => {
                        const img = <img alt='' key={e} height={24}
                                         src={getCategory(e)}/>;
                        if (enableAdd) {
                            return <div key={e} className='paddingLeftRem'>{img}</div>;
                        }
                        return <div key={e} className='justifyCenter flexColumn paddingLeftRem'>
                            {img}
                            <div className='justifyCenter'>
                                <FaRetweet className={`pointer ${pending || !cost.isEnoughResource ? 'disabled' : ''}`}
                                           color={GREEN_COLOR}
                                           size={20}
                                           onClick={pending || !cost.isEnoughResource ? _.noop : () => onChangeHobbyClick(wisie, e)}/>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>;
    }

    renderWisieCustomSkills(wisie) {
        const {onChangeSkillClick, profile} = this.props;
        const cost = wisieChangeSkillCost(profile);
        const pending = this.pending;
        return <div className='justifyCenter paddingLeftRem'>
            <div className='justifyCenter'>
                <div className='justifyCenter flexColumn'>
                    <div className='justifyCenter'>
                        <Crystal notEnough={profile.crystal < cost.crystal} styleMargin={false}
                                 size={RESOURCE_VERY_SMALL}>{cost.crystal}</Crystal>
                        <Elixir className='paddingLeftRem' notEnough={profile.elixir < cost.elixir} styleMargin={false}
                                size={RESOURCE_VERY_SMALL}>{cost.elixir}</Elixir>
                    </div>
                </div>
            </div>
            <div className='justifyStart flexColumn paddingLeftRem'>
                <div className='justifyCenter'>
                    {wisie.skills.map(e => {
                        const img = <img alt='' key={e} height={24}
                                         src={getSkill(e)}/>;
                        return <div key={e} className='justifyCenter flexColumn paddingRightRem'>
                            {img}
                            <div className='justifyCenter'>
                                <FaRetweet className={`pointer ${pending || !cost.isEnoughResource ? 'disabled' : ''}`}
                                           color={GREEN_COLOR}
                                           size={20}
                                           onClick={pending || !cost.isEnoughResource ? _.noop : () => onChangeSkillClick(wisie, e)}/>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>;
    }

    renderWisie(wisie) {
        const {screen, upgrade} = this.props;
        return <Wisie
            renderSkills={true
            } hobbiesAndSkillsWidth100={true}
            imgHeight={screen.standardImgHeight + 30}
            imgHobbyAndSkillHeight={upgrade ? 24 : undefined}
            {...wisie}
            customHobbies={upgrade && this.renderWisieCustomHobbies(wisie)}
            customSkills={upgrade && this.renderWisieCustomSkills(wisie)}
        >
            {this.renderWisieAttributes(wisie)}
        </Wisie>;
    }

    renderUpgradeAttributeCost(cost) {
        const {profile} = this.props;
        return <div className='justifyCenter marginLeftRem'>
            (<Wisdom notEnough={profile.wisdom < cost} styleMargin={false} column={false}
                     size={RESOURCE_VERY_SMALL}>{cost}</Wisdom>)
        </div>;
    }

    renderWisieAttributes(wisie) {
        const {upgrade} = this.props;
        return <div className={`justifyEvenly ${INTRO_STEP_WISIE_DETAILS}`}>
            <div className='flexColumn flex paddingRem marginRem boxShadow'>
                <div className='justifyCenter fontSize08Rem'>
                    {getText(TEXT_WISDOM)}
                    {upgrade && this.renderUpgradeAttributeCost(WISIE_WISDOM_UPGRADE_COST)}
                </div>
                {this.renderWisieAttribute(wisie, MEMORY, WISIE_WISDOM_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, LOGIC, WISIE_WISDOM_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, PERCEPTIVITY, WISIE_WISDOM_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, COUNTING, WISIE_WISDOM_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, PATTERN_RECOGNITION, WISIE_WISDOM_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, IMAGINATION, WISIE_WISDOM_UPGRADE_COST)}
            </div>
            <div className='flexColumn flex paddingRem marginRem boxShadow'>
                <div className='justifyCenter fontSize08Rem'>
                    {getText(TEXT_MENTALITY)}
                    {upgrade && this.renderUpgradeAttributeCost(WISIE_MENTAL_UPGRADE_COST)}
                </div>
                {this.renderWisieAttribute(wisie, SPEED, WISIE_MENTAL_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, REFLEX, WISIE_MENTAL_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, CUNNING, WISIE_MENTAL_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, CONCENTRATION, WISIE_MENTAL_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, CONFIDENCE, WISIE_MENTAL_UPGRADE_COST)}
                {this.renderWisieAttribute(wisie, INTUITION, WISIE_MENTAL_UPGRADE_COST)}
            </div>
        </div>;
    }

    renderWisieAttribute(wisie, attribute, cost) {
        const {upgrade, profile, onUpgradeAttributeClick, upgradeAttributeProps} = this.props;
        let change = undefined;
        const pending = this.pending;
        if (!pending && wisie.id === _.get(upgradeAttributeProps, 'id') && upgradeAttributeProps.attribute === attribute) {
            change = <div className='paddingRightRem fontSize06Rem' style={{color: GREEN_COLOR}}>(+{this.change})</div>;
        } else {
            change = <div className='paddingRightRem fontSize06Rem opacity0'>(+0.00)</div>
        }
        return <div className='justifyBetween paddingTopRem paddingBottomRem fontSize07Rem'>
            <div className='width100'>
                <WisieAttribute change={change} wisie={wisie} attribute={attribute}/>
            </div>
            {upgrade && cost <= profile.wisdom && <div className='justifyCenter flexColumn'>
                <FaPlusCircle className={`pointer ${pending ? 'disabled' : ''}`} color={GREEN_COLOR}
                              onClick={pending ? _.noop : () => onUpgradeAttributeClick(wisie, attribute)} size={20}/>
            </div>}
        </div>;
    }

    renderModalHeader() {
        const {team, edit, wisieDetails, onTeamAddClick, onTeamRemoveClick} = this.props;
        if (!edit) {
            return null;
        }
        const isInTeam = _.some(team, (e) => e.id === wisieDetails.id);
        return <div className='left'>
            {!isInTeam && <Button
                onClick={() => onTeamAddClick(team, wisieDetails)}
                disabled={team.length >= WISIE_TEAM_COUNT}
                icon={<FaPlusCircle/>}>{getText(TEXT_TEAM_ADD)}
            </Button>
            }
            {isInTeam && <Button
                onClick={() => onTeamRemoveClick(team, wisieDetails)}
                icon={<FaMinusCircle/>}>{getText(TEXT_TEAM_REMOVE)}
            </Button>
            }

        </div>;
    }

    render() {
        const {wisieDetails, onExitClick} = this.props;
        if (!wisieDetails) {
            return null;
        }
        return <Modal className='overflowAuto' exitClassName={INTRO_STEP_WISIE_DETAILS_CLOSE}
                      header={this.renderModalHeader()}
                      onExitClick={onExitClick}>
            {this.renderWisie(wisieDetails)}
        </Modal>;
    }

}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        screen: state.screen,
        profile: state.profile.profile,
        team: state.wisie.team,
        wisieDetails: state.wisie.wisieDetails,
        upgradeAttributeProps: state.wisie.upgradeAttributeProps,
        wisieUpgradeAttributeRep: state.repository.wisieUpgradeAttribute,
        wisieChangeHobbyRep: state.repository.wisieChangeHobby,
    }),
    (dispatch) => ({
        onExitClick: () => dispatch(wisieDetailsChanged(undefined)),
        onTeamAddClick: (team, wisie) => {
            const newTeam = team.concat([wisie]);
            dispatch(teamChanged(newTeam))
        },
        onTeamRemoveClick: (team, wisie) => {
            const newTeam = team.filter(e => e.id !== wisie.id);
            dispatch(teamChanged(newTeam))
        },
        onUpgradeAttributeClick: (wisie, attribute) => {
            dispatch(upgradeAttributePropsChanged({id: wisie.id, attribute}));
            clearWisieUpgradeAttributeFetch(dispatch);
        },
        onChangeHobbyClick: (wisie, hobby) => {
            dispatch(changeHobbyPropsChanged({id: wisie.id, hobby}));
        },
        onChangeSkillClick: (wisie, skill) => {
            dispatch(changeSkillPropsChanged({id: wisie.id, skill}));
        }
    })
)(WisieDetailsPage);
