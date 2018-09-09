import React from 'react';
import {connect} from 'react-redux';
import Modal from "../../component/modal/Modal";
import WisieAttribute from "../../component/wisie/WisieAttribute";
import {FaPlusCircle, FaMinusCircle} from "react-icons/fa";
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
} from "../../util/wisieAttributeHelper";
import Wisie from "../../component/wisie/Wisie";
import {wisieDetailsChanged, teamChanged, upgradePropsChanged} from "../../redux/reducer/wisie";
import {Button} from "../../component/button/Button";
import {WISIE_TEAM_COUNT} from "../../util/wisieHelper";
import {getText, TEXT_TEAM_ADD, TEXT_TEAM_REMOVE} from "../../lang/langText";
import _ from 'lodash';
import {GREEN_COLOR} from "../../util/style/constant";
import Wisdom from "../../component/resource/Wisdom";
import {RESOURCE_VERY_SMALL} from "../../component/resource/Resource";
import {clearWisieUpgradeFetch} from "./fetch/WisieUpgradeFetch";

class WisieDetailsPage extends React.PureComponent {

    get pending() {
        const {wisieUpgradeRep} = this.props;
        return _.get(wisieUpgradeRep, 'pending');
    }

    get change() {
        const {wisieUpgradeRep} = this.props;
        return _.get(wisieUpgradeRep, 'value.attributeChange');
    }

    renderWisie(wisie) {
        const {screen} = this.props;
        return <Wisie imgHeight={screen.wisieImgHeight + 30} {...wisie} style={{}}>
            {this.renderWisieAttributes(wisie)}
        </Wisie>;
    }

    renderUpgradeCost(cost) {
        const {profile} = this.props;
        return <div className='justifyCenter' style={{marginLeft: '0.25rem'}}>
            (<Wisdom notEnough={profile.wisdom < cost} margin={false} column={false}
                     size={RESOURCE_VERY_SMALL}>{cost}</Wisdom>)
        </div>;
    }

    renderWisieAttributes(wisie) {
        const {upgrade} = this.props;
        return <div className='justifyEvenly' style={{fontSize: '0.8em'}}>
            <div className='flexColumn flex paddingRem marginRem boxShadow'>
                <div className='justifyCenter'>
                    Wiedza
                    {upgrade && this.renderUpgradeCost(1)}
                </div>
                {this.renderWisieAttribute(wisie, MEMORY, 1)}
                {this.renderWisieAttribute(wisie, LOGIC, 1)}
                {this.renderWisieAttribute(wisie, PERCEPTIVITY, 1)}
                {this.renderWisieAttribute(wisie, COUNTING, 1)}
                {this.renderWisieAttribute(wisie, COMBINING_FACTS, 1)}
                {this.renderWisieAttribute(wisie, PATTERN_RECOGNITION, 1)}
                {this.renderWisieAttribute(wisie, IMAGINATION, 1)}
            </div>
            <div className='flexColumn flex paddingRem marginRem boxShadow'>
                <div className='justifyCenter'>
                    Mentalność
                    {upgrade && this.renderUpgradeCost(2)}
                </div>
                {this.renderWisieAttribute(wisie, SPEED, 2)}
                {this.renderWisieAttribute(wisie, REFLEX, 2)}
                {this.renderWisieAttribute(wisie, CONCENTRATION, 2)}
                {this.renderWisieAttribute(wisie, CONFIDENCE, 2)}
                {this.renderWisieAttribute(wisie, INTUITION, 2)}
            </div>
        </div>;
    }

    renderWisieAttribute(wisie, attribute, cost) {
        const {upgrade, profile, onUpgradeClick, upgradeProps} = this.props;
        let change = undefined;
        const pending = this.pending;
        if (!pending && wisie.id === _.get(upgradeProps, 'id') && upgradeProps.attribute === attribute) {
            change = <div style={{color: GREEN_COLOR, paddingRight: '0.25rem'}}>(+{this.change})</div>;
        } else {
            change = <div style={{opacity: 0, paddingRight: '0.25rem'}}>(+0.00)</div>
        }
        return <div className='justifyBetween paddingTopRem paddingBottomRem'>
            <div className='width100'>
                <WisieAttribute change={change} wisie={wisie} attribute={attribute}/>
            </div>
            {upgrade && cost <= profile.wisdom && <div className='justifyCenter flexColumn'>
                <FaPlusCircle className={`pointer ${pending ? 'disabled' : ''}`} color={GREEN_COLOR}
                              onClick={pending ? _.noop : () => onUpgradeClick(wisie, attribute)} size={20}/>
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
            {!isInTeam && <Button onClick={() => onTeamAddClick(team, wisieDetails)}
                                  disabled={team.length >= WISIE_TEAM_COUNT}
                                  icon={<FaPlusCircle/>}>{getText(TEXT_TEAM_ADD)}</Button>
            }
            {isInTeam && <Button onClick={() => onTeamRemoveClick(team, wisieDetails)}
                                 icon={<FaMinusCircle/>}>{getText(TEXT_TEAM_REMOVE)}</Button>
            }

        </div>;
    }

    render() {
        const {wisieDetails, onExitClick} = this.props;
        if (!wisieDetails) {
            return null;
        }
        return <Modal header={this.renderModalHeader()} onExitClick={onExitClick}>
            {this.renderWisie(wisieDetails)}
        </Modal>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        team: state.wisie.team,
        wisieDetails: state.wisie.wisieDetails,
        wisieUpgradeRep: state.repository.wisieUpgrade,
        upgradeProps: state.wisie.upgradeProps,
        path: state.router.location.pathname,
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
        onUpgradeClick: (wisie, attribute) => {
            dispatch(upgradePropsChanged({id: wisie.id, attribute}));
            clearWisieUpgradeFetch(dispatch);
            // const newTeam = team.filter(e => e.id !== wisie.id);
            // dispatch(teamChanged(newTeam))
        }
    })
)(WisieDetailsPage);
