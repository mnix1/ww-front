import React from 'react';
import {connect} from 'react-redux';
import CampaignStartWarFetch from "./CampaignStartWarFetch";
import {statusChanged} from "../../../redux/reducer/rival";
import CampaignListFetch from "./CampaignListFetch";
import CampaignActiveFetch from "./CampaignActiveFetch";
import CampaignInitFetch from "./CampaignInitFetch";
import CampaignCloseFetch from "./CampaignCloseFetch";

class CampaignFetchContainer extends React.PureComponent {

    render() {
        const {path, campaignInit, campaignType, campaignClose, team, wisieListRep, campaignDestination, rivalType, rivalImportance, status} = this.props;
        return <div>
            <CampaignActiveFetch path={path}/>
            <CampaignListFetch path={path}/>
            <CampaignInitFetch path={path} team={team} wisieListRep={wisieListRep} type={campaignType}
                               destination={campaignDestination} init={campaignInit}/>
            <CampaignCloseFetch path={path} close={campaignClose}/>
            <CampaignStartWarFetch path={path} status={status} rivalImportance={rivalImportance} rivalType={rivalType}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        campaignInit: state.campaign.campaignInit,
        campaignClose: state.campaign.campaignClose,
        campaignType: state.campaign.campaignType,
        campaignDestination: state.campaign.campaignDestination,
        wisieListRep: state.repository.wisieList,
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
