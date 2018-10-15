import React from 'react';
import {connect} from 'react-redux';
import {getCampaignLabel} from "../../lang/langCampaign";
import {
    getText,
    TEXT_CLAIM_AND_EXIT,
    TEXT_EXIT, TEXT_GUARANTEED_REWARD, TEXT_NO_REWARDS,
    TEXT_START,
    TEXT_YOUR_REWARD,
    TEXT_YOUR_TEAM
} from "../../lang/langText";
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
import {IoMdExit, IoMdPlay} from 'react-icons/io';
import Gold from "../../component/resource/Gold";
import Crystal from "../../component/resource/Crystal";
import Wisdom from "../../component/resource/Wisdom";
import Elixir from "../../component/resource/Elixir";
import {getBook} from "../../util/bookHelper";
import goldEgg from "../../media/image/icon/goldEgg.svg";
import silverEgg from "../../media/image/icon/silverEgg.svg";

class CampaignActivePage extends React.PureComponent {

    renderPhases() {
        const {phases} = this.props.campaignActiveRep.value;
        return <div className='justifyCenter flexWrap'>
            {_.range(0, phases).map(e => this.renderPhase(e))}
        </div>
    }

    renderPhase(e) {
        const {phase, phases, type, destination} = this.props.campaignActiveRep.value;
        const active = phase === e;
        const disabled = phase < e;
        const done = phase > e;
        const className = cn('relative marginRem paddingRem boxShadow flexColumn justifyCenter', {active, disabled});
        return <div key={e} className={className}>
            <div className='justifyCenter'>
                <div className='justifyCenter flexColumn'>{getCampaignLabel(type, destination, e)}</div>
                {e === phases - 1 && <img alt='' className='paddingLeftRem' height={30} src={goldEgg}/>}
                {e === phases / 2 - 1 && <img alt='' className='paddingLeftRem' height={30} src={silverEgg}/>}
            </div>
            {done && <div className='absoluteBackgroundMix opacity1 zIndex1'>
                <img alt='' src={check} className='height100 width100'/>
            </div>}
        </div>
    }

    renderTeam() {
        const {team, presentIndexes} = this.props.campaignActiveRep.value;
        return <Team renderSkills={true} team={team} presentIndexes={presentIndexes}/>
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
        const {status, rewardNotEmpty} = this.props.campaignActiveRep.value;
        if (status !== 'FINISHED') {
            return <div className='justifyCenter'>
                {this.renderReward(false)}
            </div>;
        }
        return <div className='justifyCenter'>
            {this.renderReward(true)}
            <div className='flexColumn justifyCenter'>
                <Button material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onEndClick}
                        icon={<IoMdExit/>}>{getText(rewardNotEmpty ? TEXT_CLAIM_AND_EXIT : TEXT_EXIT)}</Button>
            </div>
        </div>
    }

    renderReward(finished) {
        const {bookGain, goldGain, crystalGain, wisdomGain, elixirGain, rewardNotEmpty} = this.props.campaignActiveRep.value;
        if (finished && !rewardNotEmpty) {
            return <div className='justifyCenter flexColumn paddingRightRem'>
                <div className='justifyCenter'>{getText(TEXT_NO_REWARDS)}</div>
            </div>
        }
        return rewardNotEmpty && <div className='justifyCenter flexColumn paddingRightRem'>
            <div className='justifyCenter'>{getText(finished ? TEXT_YOUR_REWARD : TEXT_GUARANTEED_REWARD)}</div>
            <div className='justifyCenter'>
                <div className='justifyCenter paddingRem boxShadow marginRem'>
                    {goldGain > 0 && <Gold className='justifyCenter flexColumn'>{goldGain}</Gold>}
                    {crystalGain > 0 && <Crystal className='justifyCenter flexColumn'>{crystalGain}</Crystal>}
                    {wisdomGain > 0 && <Wisdom className='justifyCenter flexColumn'>{wisdomGain}</Wisdom>}
                    {elixirGain > 0 && <Elixir className='justifyCenter flexColumn'>{elixirGain}</Elixir>}
                    {bookGain &&
                    <div className='justifyCenter flexColumn'><img alt='' src={getBook(bookGain)} height={80}/></div>}
                </div>
            </div>
        </div>
    }

    render() {
        return <div className='justifyCenter flexColumn textAlignCenter'>
            {this.renderPhases()}
            <div className='justifyCenter'>{getText(TEXT_YOUR_TEAM)}</div>
            {this.renderTeam()}
            <div className='justifyCenter'>{this.renderEnd()}</div>
            <div className='justifyCenter paddingTopRem'>{this.renderStart()}</div>
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
            dispatch(push(CAMPAIGN_WAR_ROUTE));
            dispatch(statusChanged(RIVAL_STATUS_START_RANDOM_OPPONENT));
        },
        onEndClick: () => {
            dispatch(campaignCloseChanged(true));
        },
    })
)(CampaignActivePage);
