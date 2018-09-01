import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import WisieListPage from "./WisieListPage";
import WisieExperimentPage from "./WisieExperimentPage";
import AvailableResources from "../../component/resource/AvailableResources";
import {RESOURCE_SMALL} from "../../component/resource/Resource";
import WisieDetailsPage from "./WisieDetailsPage";
import WisieTeamPage from "./WisieTeamPage";
import {WISIES_ROUTE, WISIES_TEAM_EDIT_ROUTE} from "../routes";
import {Route, Switch} from 'react-router'

class WisiePage extends React.PureComponent {

    renderContentList() {
        return <div className='pageContent overflowAuto'>
            <WisieDetailsPage upgrade={true}/>
            <div className='justifyEvenly'>
                <AvailableResources showGold={false} size={RESOURCE_SMALL}/>
                <WisieExperimentPage/>
            </div>
            <WisieTeamPage/>
            <WisieListPage/>
        </div>;
    }

    renderContentTeamEdit() {
        return <div className='pageContent overflowAuto'>
            <WisieDetailsPage edit={true}/>
            <WisieTeamPage edit={true}/>
            <WisieListPage edit={true}/>
        </div>;
    }

    render() {
        const {screen} = this.props;
        return <div className='page wisiePage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <div className='pageBackground absoluteBackgroundMix'/>
            <Switch>
                <Route exact path={WISIES_ROUTE} render={() => this.renderContentList()}/>
                <Route path={WISIES_TEAM_EDIT_ROUTE} render={() => this.renderContentTeamEdit()}/>
            </Switch>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({})
)(WisiePage);
