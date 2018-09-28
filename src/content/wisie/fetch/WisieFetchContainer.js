import React from 'react';
import {connect} from 'react-redux';
import WisieListFetch from "./WisieListFetch";
import ProfileWisieListFetch from "./ProfileWisieListFetch";
import WisieExperimentFetch from "./WisieExperimentFetch";
import WisieTeamSaveFetch from "./WisieTeamSaveFetch";
import WisieUpgradeAttributeFetch from "./WisieUpgradeAttributeFetch";
import WisieChangeHobbyFetch from "./WisieChangeHobbyFetch";

class WisieFetchContainer extends React.PureComponent {
    render() {
        const {path, upgradeAttributeProps, changeHobbyProps, experiment, teamSave, team} = this.props;
        return <div>
            <WisieListFetch/>
            <WisieUpgradeAttributeFetch upgradeAttributeProps={upgradeAttributeProps}/>
            <WisieChangeHobbyFetch changeHobbyProps={changeHobbyProps}/>
            <ProfileWisieListFetch path={path}/>
            <WisieExperimentFetch experiment={experiment}/>
            <WisieTeamSaveFetch teamSave={teamSave} team={team}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        experiment: state.wisie.experiment,
        team: state.wisie.team,
        upgradeAttributeProps: state.wisie.upgradeAttributeProps,
        changeHobbyProps: state.wisie.changeHobbyProps,
        teamSave: state.wisie.teamSave,
    }),
    (dispatch) => ({})
)(WisieFetchContainer);
