import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {getCampaignLabel} from "../../lang/langCampaign";
import {getText, TEXT_EXIT, TEXT_START, TEXT_YOUR_TEAM} from "../../lang/langText";
import _ from 'lodash';
import cn from 'classnames';
import check from '../../media/image/icon/check.svg';
import Team from "../rival/component/Team";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {clearRivalStartRandomOpponentFetch} from "../rival/fetch/RivalStartRandomOpponentFetch";
import {rivalCleared, rivalImportanceChanged, rivalTypeChanged, statusChanged} from "../../redux/reducer/rival";
import {push} from 'connected-react-router'
import {
    RIVAL_IMPORTANCE_FAST,
    RIVAL_STATUS_START_RANDOM_OPPONENT,
    RIVAL_TYPE_CAMPAIGN_WAR
} from "../../util/rivalHelper";
import {CAMPAIGN_WAR_ROUTE} from "../routes";
import {campaignCloseChanged} from "../../redux/reducer/campaign";
import {IoMdPlay, IoMdExit} from 'react-icons/io';
import Gold from "../../component/resource/Gold";
import Crystal from "../../component/resource/Crystal";
import Wisdom from "../../component/resource/Wisdom";
import Elixir from "../../component/resource/Elixir";
import {RESOURCE_VERY_SMALL} from "../../component/resource/Resource";

class CampaignActivePage extends React.PureComponent {

    renderPhases() {
        const {phases} = this.props.campaignActiveRep.value;
        return <div className='justifyCenter flexWrap'>
            {_.range(0, phases).map(e => this.renderPhase(e))}
        </div>
    }

    renderPhase(e) {
        const {phase, type, destination} = this.props.campaignActiveRep.value;
        const active = phase === e;
        const disabled = phase < e;
        const done = phase > e;
        const className = cn('relative marginRem paddingRem boxShadow', {active, disabled});
        return <div key={e} className={className}>
            <div>{getCampaignLabel(type, destination, e)}</div>
            {done && <div className='absoluteBackgroundMix opacity1 zIndex1'>
                <img alt='' src={check} className='height100 width100'/>
            </div>}
        </div>
    }

    renderTeam() {
        const {team, presentIndexes} = this.props.campaignActiveRep.value;
        return <Team team={team} presentIndexes={presentIndexes}/>
    }

    renderStart() {
        const {status} = this.props.campaignActiveRep.value;
        if (status !== 'IN_PROGRESS') {
            return null;
        }
        const {onStartClick} = this.props;
        return <Button material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onStartClick}
                       icon={<IoMdPlay/>}>{getText(TEXT_START)}</Button>
    }

    renderEnd() {
        const {onEndClick} = this.props;
        const {status, phases, phase} = this.props.campaignActiveRep.value;
        if (status !== 'FINISHED') {
            return null;
        }
        const content = <div className='justifyCenter'>
            {phase >= phases && <div>
                {this.renderReward()}
            </div>}
            <div className='justifyCenter flexColumn'>{getText(TEXT_EXIT)}</div>
        </div>;
        return <Button material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onEndClick}
                       icon={<IoMdExit/>}>{content}</Button>
    }

    renderReward() {
        const {destination, type} = this.props.campaignActiveRep.value;
        const campaign = this.props.campaignListRep.value.find(e => e.type === type && e.destination === destination);
        return <div className='justifyCenter'>
            {campaign.goldGain > 0 && <Gold size={RESOURCE_VERY_SMALL}>{campaign.goldGain}</Gold>}
            {campaign.crystalGain > 0 && <Crystal size={RESOURCE_VERY_SMALL}>{campaign.crystalGain}</Crystal>}
            {campaign.wisdomGain > 0 && <Wisdom size={RESOURCE_VERY_SMALL}>{campaign.wisdomGain}</Wisdom>}
            {campaign.elixirGain > 0 && <Elixir size={RESOURCE_VERY_SMALL}>{campaign.elixirGain}</Elixir>}
        </div>
    }

    render() {
        return <div className='justifyCenter flexColumn textAlignCenter'>
            {this.renderPhases()}
            <div className='justifyCenter'>{getText(TEXT_YOUR_TEAM)}</div>
            {this.renderTeam()}
            <div className='justifyCenter'>{this.renderStart()}</div>
            <div className='justifyCenter'>{this.renderEnd()}</div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
        profile: state.profile.profile,
        campaignActiveRep: state.repository.campaignActive,
        campaignListRep: state.repository.campaignList,
    }),
    (dispatch) => ({
        onStartClick: () => {
            clearRivalStartRandomOpponentFetch(dispatch);
            dispatch(rivalCleared());
            dispatch(rivalTypeChanged(RIVAL_TYPE_CAMPAIGN_WAR));
            dispatch(rivalImportanceChanged(RIVAL_IMPORTANCE_FAST));
            dispatch(statusChanged(RIVAL_STATUS_START_RANDOM_OPPONENT));
            dispatch(push(CAMPAIGN_WAR_ROUTE));
        },
        onEndClick: () => {
            dispatch(campaignCloseChanged(true));
        },
    })
)(CampaignActivePage);
