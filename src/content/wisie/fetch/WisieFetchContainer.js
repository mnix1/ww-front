import React from 'react';
import {connect} from 'react-redux';
import ProfileWisieListFetch from "./ProfileWisieListFetch";
import WisieExperimentFetch from "./WisieExperimentFetch";
import WisieTeamSaveFetch from "./WisieTeamSaveFetch";
import WisieUpgradeAttributeFetch from "./WisieUpgradeAttributeFetch";
import WisieChangeHobbyFetch from "./WisieChangeHobbyFetch";
import WisieChangeSkillFetch from "./WisieChangeSkillFetch";

class WisieFetchContainer extends React.PureComponent {
    render() {
        const {path, upgradeAttributeProps, changeHobbyProps, changeSkillProps, experiment, teamSave, team} = this.props;
        return <div>
            <WisieUpgradeAttributeFetch upgradeAttributeProps={upgradeAttributeProps}/>
            <WisieChangeHobbyFetch changeHobbyProps={changeHobbyProps}/>
            <WisieChangeSkillFetch changeSkillProps={changeSkillProps}/>
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
        changeSkillProps: state.wisie.changeSkillProps,
        teamSave: state.wisie.teamSave,
    }),
    (dispatch) => ({})
)(WisieFetchContainer);
