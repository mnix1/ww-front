import React from 'react';
import {connect} from 'react-redux';
import WisieListFetch from "./WisieListFetch";
import ProfileWisieListFetch from "./ProfileWisieListFetch";
import WisieExperimentFetch from "./WisieExperimentFetch";
import WisieTeamSaveFetch from "./WisieTeamSaveFetch";
import WisieUpgradeAttributeFetch from "./WisieUpgradeAttributeFetch";

class WisieFetchContainer extends React.PureComponent {
    render() {
        const {path, upgradeProps, experiment, teamSave, team} = this.props;
        return <div>
            <WisieListFetch/>
            <WisieUpgradeAttributeFetch upgradeProps={upgradeProps}/>
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
        upgradeProps: state.wisie.upgradeProps,
        teamSave: state.wisie.teamSave,
    }),
    (dispatch) => ({
    })
)(WisieFetchContainer);
