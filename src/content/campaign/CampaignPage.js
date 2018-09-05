import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import MeshBackground from "../../component/background/MeshBackground";
import {repFulfilled} from "../../util/repositoryHelper";
import {Loading} from "../../component/loading/Loading";
import CampaignChoosePropsPage from "./CampaignChoosePropsPage";
import {CAMPAIGN_ROUTE, CAMPAIGN_TEAM_EDIT_ROUTE} from "../routes";
import {Route, Switch} from 'react-router'
import WisieDetailsPage from "../wisie/WisieDetailsPage";
import WisieTeamPage from "../wisie/WisieTeamPage";
import WisieListPage from "../wisie/WisieListPage";
import {campaignInitChanged} from "../../redux/reducer/campaign";

class CampaignPage extends React.PureComponent {

    renderContentChooseProps() {
        const {campaignListRep} = this.props;
        if (!repFulfilled(campaignListRep)) {
            return <Loading/>;
        }
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
        const {screen} = this.props;
        return <div className='page campaignPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <MeshBackground/>
            <Switch>
                <Route exact path={CAMPAIGN_ROUTE} render={() => this.renderContentChooseProps()}/>
                <Route exact path={CAMPAIGN_TEAM_EDIT_ROUTE} render={() => this.renderContentTeamEdit()}/>
            </Switch>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
        campaignListRep: state.repository.campaignList,
    }),
    (dispatch) => ({
        onCampaignInitChange: (init) => dispatch(campaignInitChanged(init))
    })
)(CampaignPage);
