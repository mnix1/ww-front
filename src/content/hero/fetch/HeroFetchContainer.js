import React from 'react';
import {connect} from 'react-redux';
import HeroListFetch from "./HeroListFetch";
import ProfileHeroListFetch from "./ProfileHeroListFetch";
import HeroExperimentFetch from "./HeroExperimentFetch";
import HeroTeamSaveFetch from "./HeroTeamSaveFetch";

class HeroFetchContainer extends React.PureComponent {
    componentDidUpdate(prevProps) {
    }

    render() {
        const {path, experiment, teamSave, team} = this.props;
        return <div>
            <HeroListFetch/>
            <ProfileHeroListFetch path={path}/>
            <HeroExperimentFetch experiment={experiment}/>
            <HeroTeamSaveFetch teamSave={teamSave} team={team}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        experiment: state.hero.experiment,
        team: state.hero.team,
        teamSave: state.hero.teamSave,
    }),
    (dispatch) => ({
    })
)(HeroFetchContainer);
