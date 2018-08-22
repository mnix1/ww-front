import React from 'react';
import {connect} from 'react-redux';
import HeroListFetch from "./HeroListFetch";
import ProfileHeroListFetch from "./ProfileHeroListFetch";
import HeroExperimentFetch from "./HeroExperimentFetch";

class HeroFetchContainer extends React.PureComponent {
    componentDidUpdate(prevProps) {
    }

    render() {
        const {path, experiment} = this.props;
        return <div>
            <HeroListFetch/>
            <ProfileHeroListFetch path={path}/>
            <HeroExperimentFetch experiment={experiment}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        experiment: state.hero.experiment,
    }),
    (dispatch) => ({
    })
)(HeroFetchContainer);
