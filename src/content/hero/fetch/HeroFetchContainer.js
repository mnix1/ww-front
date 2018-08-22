import React from 'react';
import {connect} from 'react-redux';
import HeroListFetch from "./HeroListFetch";
import ProfileHeroListFetch from "./ProfileHeroListFetch";

class HeroFetchContainer extends React.PureComponent {
    componentDidUpdate(prevProps) {
    }

    render() {
        const {path, } = this.props;
        return <div>
            <HeroListFetch/>
            <ProfileHeroListFetch path={path}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
    })
)(HeroFetchContainer);
