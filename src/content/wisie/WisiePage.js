import React from 'react';
import './styles.css';
import WisieListPage from "./WisieListPage";
import WisieExperimentPage from "./WisieExperimentPage";
import AvailableResources from "../../component/resource/AvailableResources";
import {RESOURCE_SMALL} from "../../component/resource/Resource";
import WisieDetailsPage from "./WisieDetailsPage";
import WisieTeamPage from "./WisieTeamPage";
import {WISIES_PICK_ROUTE, WISIES_ROUTE, WISIES_TEAM_EDIT_ROUTE} from "../routes";
import {Route, Switch} from 'react-router'
import WisiePickPage from "./WisiePickPage";
import {INTRO_STEP_EDIT_TEAM, INTRO_STEP_PICK_WISIES} from "../intro/introHelper";
import ScreenPage from "../../component/page/ScreenPage";

export default class WisiePage extends React.PureComponent {

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
        return <div className={`pageContent overflowAuto ${INTRO_STEP_EDIT_TEAM}`}>
            <WisieDetailsPage edit={true}/>
            <WisieTeamPage edit={true}/>
            <WisieListPage edit={true}/>
        </div>;
    }

    renderContentPick() {
        return <div className={`pageContent overflowAuto ${INTRO_STEP_PICK_WISIES}`}>
            <WisiePickPage/>
        </div>;
    }

    render() {
        return <ScreenPage customContent={true}>
            <Switch>
                <Route exact path={WISIES_ROUTE} render={() => this.renderContentList()}/>
                <Route path={WISIES_TEAM_EDIT_ROUTE} render={() => this.renderContentTeamEdit()}/>
                <Route path={WISIES_PICK_ROUTE} render={() => this.renderContentPick()}/>
            </Switch>
        </ScreenPage>
    }
}