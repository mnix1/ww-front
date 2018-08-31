import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {profileChanged} from "../../../redux/reducer/profile";
import {heroDetailsChanged, profileHeroesChanged} from "../../../redux/reducer/hero";

class HeroUpgradeFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {heroUpgradeFetch, dispatch} = this.props;
        if (!prevProps.heroUpgradeFetch.fulfilled && heroUpgradeFetch.fulfilled) {
            const value = heroUpgradeFetch.value;
            dispatch(profileChanged(value.profile));
            dispatch(heroDetailsChanged(value.profileHero));
            dispatch(profileHeroesChanged(value.profileHero));
        }
    }

    componentWillUnmount() {
        clearHeroUpgradeFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {upgradeProps, dispatchHeroUpgradePost} = this.props;
        if (upgradeProps && prevProps.upgradeProps !== upgradeProps) {
            dispatchHeroUpgradePost(upgradeProps);
        }
    }

    render() {
        return null;
    }
}

export function clearHeroUpgradeFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'heroUpgrade'}});
}

export default connect([{
    resource: 'heroUpgrade',
    method: 'post',
    request: ({id, attribute}) => ({
        url: `/hero/upgradeHero`,
        body: {id, attribute}
    })
}])(HeroUpgradeFetch);