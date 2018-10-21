import React from 'react';
import {connect} from 'react-redux';
import {isRepFulfilled} from "../../util/repositoryHelper";
import {Loading} from "../../component/loading/Loading";
import CampaignChoosePropsPage from "./CampaignChoosePropsPage";
import {CAMPAIGN_ROUTE, CAMPAIGN_TEAM_EDIT_ROUTE} from "../routes";
import {Route, Switch} from 'react-router'
import WisieDetailsPage from "../wisie/WisieDetailsPage";
import WisieTeamPage from "../wisie/WisieTeamPage";
import WisieListPage from "../wisie/WisieListPage";
import {campaignInitChanged} from "../../redux/reducer/campaign";
import _ from 'lodash';
import CampaignActivePage from "./CampaignActivePage";
import {statusChanged} from "../../redux/reducer/rival";
import ScreenPage from "../../component/page/ScreenPage";
import CampaignFetchContainer from "./fetch/CampaignFetchContainer";

class CampaignPage extends React.PureComponent {

    renderContent() {
        const {campaignActiveRep, campaignListRep} = this.props;
        if (!isRepFulfilled(campaignActiveRep) || !isRepFulfilled(campaignListRep)) {
            return <div className='pageContent overflowAuto'><Loading/></div>;
        }
        if (_.isNil(campaignActiveRep.value)) {
            return this.renderContentChooseProps();
        }
        return this.renderContentActive();
    }

    renderContentActive() {
        return <div className='pageContent overflowAuto'><CampaignActivePage/></div>;
    }

    renderContentChooseProps() {
        return <div className='pageContent overflowAuto'><CampaignChoosePropsPage/></div>;
    }

    renderContentTeamEdit() {
        const {onCampaignInitChange} = this.props;
        return <div className='pageContent overflowAuto'>
            <WisieDetailsPage edit={true}/>
            <WisieTeamPage edit={true} onTeamSaveClick={() => onCampaignInitChange(true)}/>
            <WisieListPage edit={true}/>
        </div>;
    }

    render() {
        return <ScreenPage customContent={true}>
            <Switch>
                <Route exact path={CAMPAIGN_ROUTE} render={() => this.renderContent()}/>
                <Route exact path={CAMPAIGN_TEAM_EDIT_ROUTE} render={() => this.renderContentTeamEdit()}/>
            </Switch>
            <CampaignFetchContainer/>
        </ScreenPage>;
    }
}

export default connect(
    (state) => ({
        campaignListRep: state.repository.campaignList,
        campaignActiveRep: state.repository.campaignActive,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStatusChange: () => dispatch(statusChanged(undefined)),
        onCampaignInitChange: (init) => dispatch(campaignInitChanged(init))
    })
)(CampaignPage);
