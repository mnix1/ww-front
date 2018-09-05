import React from 'react';
import {connect} from 'react-redux';
import CampaignStartWarFetch from "./CampaignStartWarFetch";
import {statusChanged} from "../../../redux/reducer/rival";
import CampaignListFetch from "./CampaignListFetch";
import CampaignInitFetch from "./CampaignInitFetch";

class CampaignFetchContainer extends React.PureComponent {

    render() {
        const {path, campaignInit, campaignType,team, campaignDestination, rivalType, rivalImportance, status} = this.props;
        return <div>
            <CampaignListFetch path={path}/>
            <CampaignInitFetch path={path} team={team} type={campaignType} destination={campaignDestination} init={campaignInit}/>
            <CampaignStartWarFetch path={path} status={status} rivalImportance={rivalImportance} rivalType={rivalType}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        campaignInit: state.campaign.campaignInit,
        campaignType: state.campaign.campaignType,
        campaignDestination: state.campaign.campaignDestination,
        team: state.wisie.team,
        status: state.rival.status,
        rivalType: state.rival.rivalType,
        rivalImportance: state.rival.rivalImportance,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
    })
)(CampaignFetchContainer);
