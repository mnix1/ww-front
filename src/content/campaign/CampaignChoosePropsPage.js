import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {getCampaignLabel} from "../../lang/langCampaign";
import {getCampaignImg, getStartButtonIcon} from "../../util/campaignHelper";
import {campaignDestinationChanged, campaignTypeChanged} from "../../redux/reducer/campaign";
import {
    getText,
    TEXT_CHOOSE_DESTINATION,
    TEXT_CHOOSE_TEAM,
    TEXT_CHOOSE_TYPE,
    TEXT_COST,
    TEXT_REWARD
} from "../../lang/langText";
import Crystal from "../../component/resource/Crystal";
import Gold from "../../component/resource/Gold";
import Wisdom from "../../component/resource/Wisdom";
import Elixir from "../../component/resource/Elixir";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {RESOURCE_SMALL} from "../../component/resource/Resource";
import Rating from "../../component/rating/Rating";
import _ from 'lodash';
import AvailableResources from "../../component/resource/AvailableResources";
import {CAMPAIGN_TEAM_EDIT_ROUTE} from "../routes";
import {push} from 'connected-react-router'

class CampaignChoosePropsPage extends React.PureComponent {

    get imgHeight() {
        const {screen} = this.props;
        if (screen.isSmallHeight) {
            return screen.wisieImgHeight;
        }
        return screen.wisieImgHeight * 1.5;
    }

    renderCampaignTypes() {
        const {campaignListRep, campaignType, campaignDestination, screen, lang} = this.props;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter'>
                <div className='paddingTopRem justifyCenter flexColumn'>
                    <div className='justifyCenter'>{getText(TEXT_CHOOSE_TYPE)}</div>
                    <div className='justifyBetween'>
                        {_.uniqBy(campaignListRep.value, 'type').map(this.renderCampaignType)}
                    </div>
                </div>
            </div>
            {campaignType && !campaignDestination && <div className='fontSize08Rem justifyCenter '>
                <div className='boxShadow paddingRem width100' style={{maxWidth: screen.contentWidth * .6}}
                >{getCampaignLabel(lang, campaignType, 'description')}</div>
            </div>}
        </div>
    }

    renderCampaignType = (campaign) => {
        const {campaignType, campaignDestination, onTypeChanged, lang} = this.props;
        const customClassName = campaignType === campaign.type ? 'active' : '';
        return <div
            key={campaign.type}
            className={`marginRem paddingRem relative boxShadow justifyCenter pointer flexColumn ${customClassName}`}
            onClick={() => onTypeChanged(campaign.type, campaignDestination)}
        >
            {/*<div className='blackBackground absoluteBackgroundMix'/>*/}
            <div className='relative justifyCenter flexColumn'>
                <div className='justifyCenter'><span className='justifyCenter'>{getCampaignLabel(lang, campaign.type, 'label')}</span>
                </div>
                <div className='justifyCenter'><img alt='' src={getCampaignImg(campaign.type)} height={this.imgHeight}/>
                </div>
            </div>
        </div>
    };


    renderCampaignDestinations() {
        const {campaignListRep, campaignType} = this.props;
        if (campaignType === undefined) {
            return null;
        }
        return <div className='paddingTopRem justifyCenter flexColumn'>

            <div className='justifyCenter'>{getText(TEXT_CHOOSE_DESTINATION)}</div>
            <div className='justifyCenter'>
                {_.filter(campaignListRep.value, e => e.type === campaignType).map(this.renderCampaignDestination)}
            </div>
        </div>
    }

    renderCampaignDestination = (campaign) => {
        const {campaignDestination, onDestinationChanged, lang} = this.props;
        const customClassName = campaignDestination === campaign.destination ? 'active' : '';
        return <div
            key={campaign.destination}
            className={`marginRem paddingRem relative boxShadow justifyCenter pointer flexColumn ${customClassName}`}
            onClick={() => onDestinationChanged(campaign.destination)}
        >
            {/*<div className='blackBackground absoluteBackgroundMix'/>*/}
            <div className='relative justifyCenter flexColumn'>
                <div className='justifyCenter'>{getCampaignLabel(lang, campaign.type, campaign.destination, 'label')}</div>
                <div className='justifyCenter'><Rating value={campaign.rating / 2}/></div>
                <div className='justifyCenter'>
                    <img alt='' src={getCampaignImg(campaign.type, campaign.destination)} height={this.imgHeight}/>
                </div>
            </div>
        </div>
    };

    renderCampaignDetails() {
        const {campaignType, campaignDestination, campaignListRep, profile, onChooseTeamClick} = this.props;
        if (campaignType === undefined || campaignDestination === undefined) {
            return null;
        }
        const campaign = campaignListRep.value.find(e => e.type === campaignType && e.destination === campaignDestination);
        const disabled = campaign.goldCost > profile.gold
            || campaign.crystalCost > profile.crystal
            || campaign.wisdomCost > profile.wisdom
            || campaign.elixirCost > profile.elixir;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter'>
                {!campaign.free && <div className='justifyCenter flexColumn'>
                    <div className='justifyCenter'>{getText(TEXT_COST)}</div>
                    {this.renderResourcesCost(campaign, disabled, RESOURCE_SMALL)}
                </div>}
                <div className='justifyCenter flexColumn'>
                    <div className='justifyCenter'>{getText(TEXT_REWARD)}</div>
                    <div className='justifyCenter paddingRem boxShadow marginRem'>
                        {campaign.goldGain > 0 && <Gold>{campaign.goldGain}</Gold>}
                        {campaign.crystalGain > 0 && <Crystal>{campaign.crystalGain}</Crystal>}
                        {campaign.wisdomGain > 0 && <Wisdom>{campaign.wisdomGain}</Wisdom>}
                        {campaign.elixirGain > 0 && <Elixir>{campaign.elixirGain}</Elixir>}
                    </div>
                </div>
            </div>
            <div className='justifyCenter paddingBottomRem'>
                <Button
                    onClick={onChooseTeamClick}
                    disabled={disabled}
                    material={BUTTON_MATERIAL_BOX_SHADOW}
                    icon={getStartButtonIcon(campaignType)}
                >
                    <div className='justifyCenter flexColumn'>{getText(TEXT_CHOOSE_TEAM)}</div>
                </Button>
            </div>
        </div>;
    }

    renderResourcesCost(campaign, disabled, size) {
        return <div className='justifyCenter paddingRem boxShadow marginRem'>
            {campaign.goldCost > 0 &&
            <Gold notEnough={disabled} size={size}>{campaign.goldCost}</Gold>}
            {campaign.crystalCost > 0 &&
            <Crystal notEnough={disabled} size={size}>{campaign.crystalCost}</Crystal>}
            {campaign.wisdomCost > 0 &&
            <Wisdom notEnough={disabled} size={size}>{campaign.wisdomCost}</Wisdom>}
            {campaign.elixirCost > 0 &&
            <Elixir notEnough={disabled} size={size}>{campaign.elixirCost}</Elixir>}
        </div>;
    }

    render() {
        return <div className='justifyCenter flexColumn textAlignCenter'>
            <div className='justifyCenter'><AvailableResources size={RESOURCE_SMALL}/></div>
            {this.renderCampaignTypes()}
            {this.renderCampaignDestinations()}
            {this.renderCampaignDetails()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        lang: state.language.lang,
        path: state.router.location.pathname,
        profile: state.profile.profile,
        campaignType: state.campaign.campaignType,
        campaignDestination: state.campaign.campaignDestination,
        campaignListRep: state.repository.campaignList,
    }),
    (dispatch) => ({
        onTypeChanged: (type, destination) => {
            dispatch(campaignTypeChanged(type));
            if(destination){
                dispatch(campaignDestinationChanged(undefined));
            }
        },
        onDestinationChanged: destination => dispatch(campaignDestinationChanged(destination)),
        onChooseTeamClick: () => dispatch(push(CAMPAIGN_TEAM_EDIT_ROUTE))
    })
)(CampaignChoosePropsPage);
