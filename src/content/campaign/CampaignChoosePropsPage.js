import React from 'react';
import {connect} from 'react-redux';
import {getCampaignLabel} from "../../lang/langCampaign";
import {getCampaignImg, getStartButtonIcon} from "../../util/campaignHelper";
import {campaignDestinationChanged, campaignTypeChanged} from "../../redux/reducer/campaign";
import {
    getText,
    TEXT_CHOOSE_DESTINATION,
    TEXT_CHOOSE_TEAM,
    TEXT_CHOOSE_TYPE,
    TEXT_COST,
    TEXT_POSSIBLE_REWARD
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
import randomBook from '../../media/image/book/randomBook.svg';

class CampaignChoosePropsPage extends React.PureComponent {

    get imgHeight() {
        const {screen} = this.props;
        if (screen.isBigHeight) {
            return screen.standardImgHeight * 1.5;
        }
        return screen.standardImgHeight;
    }

    renderCampaignTypes() {
        const {campaignListRep, campaignType, campaignDestination, screen} = this.props;
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
                >{getCampaignLabel(campaignType, 'description')}</div>
            </div>}
        </div>
    }

    renderCampaignType = (campaign) => {
        const {campaignType, campaignDestination, onTypeChanged} = this.props;
        const customClassName = campaignType === campaign.type ? 'active' : '';
        return <div
            key={campaign.type}
            className={`marginRem paddingRem relative boxShadow justifyCenter pointer flexColumn ${customClassName}`}
            onClick={() => onTypeChanged(campaign.type, campaignDestination)}
        >
            <div className='relative justifyCenter flexColumn'>
                <div className='justifyCenter'><span
                    className='justifyCenter'>{getCampaignLabel(campaign.type, 'label')}</span>
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
        const {campaignDestination, onDestinationChanged} = this.props;
        const customClassName = campaignDestination === campaign.destination ? 'active' : '';
        return <div
            key={campaign.destination}
            className={`marginRem paddingRem relative boxShadow justifyCenter pointer flexColumn ${customClassName}`}
            onClick={() => onDestinationChanged(campaign.destination)}
        >
            <div className='relative justifyCenter flexColumn'>
                <div className='justifyCenter'>{getCampaignLabel(campaign.type, campaign.destination, 'label')}</div>
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
        const disabled = campaign.goldCost > profile.resources.gold
            || campaign.crystalCost > profile.resources.crystal
            || campaign.wisdomCost > profile.resources.wisdom
            || campaign.elixirCost > profile.resources.elixir;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter'>
                {!campaign.free && <div className='justifyCenter flexColumn'>
                    <div className='justifyCenter'>{getText(TEXT_COST)}</div>
                    {this.renderResourcesCost(campaign, disabled, RESOURCE_SMALL)}
                </div>}
                <div className='justifyCenter flexColumn'>
                    <div className='justifyCenter'>{getText(TEXT_POSSIBLE_REWARD)}</div>
                    <div className='justifyCenter paddingRem boxShadow marginRem'>
                        {campaign.goldGain > 0 && <Gold className='justifyCenter flexColumn'>{campaign.goldGain}</Gold>}
                        {campaign.crystalGain > 0 && <Crystal className='justifyCenter flexColumn'>{campaign.crystalGain}</Crystal>}
                        {campaign.wisdomGain > 0 && <Wisdom className='justifyCenter flexColumn'>{campaign.wisdomGain}</Wisdom>}
                        {campaign.elixirGain > 0 && <Elixir className='justifyCenter flexColumn'>{campaign.elixirGain}</Elixir>}
                        {<div className='justifyCenter flexColumn'><img alt='' src={randomBook} height={50}/></div>}
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
        path: state.router.location.pathname,
        profile: state.profile,
        campaignType: state.campaign.campaignType,
        campaignDestination: state.campaign.campaignDestination,
        campaignListRep: state.repository.campaignList,
    }),
    (dispatch) => ({
        onTypeChanged: (type, destination) => {
            dispatch(campaignTypeChanged(type));
            if (destination) {
                dispatch(campaignDestinationChanged(undefined));
            }
        },
        onDestinationChanged: destination => dispatch(campaignDestinationChanged(destination)),
        onChooseTeamClick: () => dispatch(push(CAMPAIGN_TEAM_EDIT_ROUTE))
    })
)(CampaignChoosePropsPage);
