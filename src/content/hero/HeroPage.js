import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import HeroListPage from "./HeroListPage";
import HeroExperimentPage from "./HeroExperimentPage";
import AvailableResources from "../../component/resource/AvailableResources";
import {RESOURCE_SMALL} from "../../component/resource/Resource";
import HeroDetailsPage from "./HeroDetailsPage";
import HeroTeamPage from "./HeroTeamPage";
import {WISIES_ROUTE, WISIES_TEAM_EDIT_ROUTE} from "../routes";
import {Route, Switch} from 'react-router'

class HeroPage extends React.PureComponent {

    renderContentList() {
        return <div className='pageContent overflowAuto'>
            <HeroDetailsPage upgrade={true}/>
            <div className='justifyEvenly'>
                <AvailableResources showGold={false} size={RESOURCE_SMALL}/>
                <HeroExperimentPage/>
            </div>
            <HeroTeamPage/>
            <HeroListPage/>
        </div>;
    }

    renderContentTeamEdit() {
        return <div className='pageContent overflowAuto'>
            <HeroDetailsPage edit={true}/>
            <HeroTeamPage edit={true}/>
            <HeroListPage edit={true}/>
        </div>;
    }

    render() {
        const {screen} = this.props;
        return <div className='page heroPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
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
)(HeroPage);
