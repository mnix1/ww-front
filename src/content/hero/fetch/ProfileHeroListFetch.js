import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {WISIES_ROUTE} from "../../routes";
import {fetchOnPathAndIfNotExists} from "../../../util/repositoryHelper";
import {isRepValueCode1} from "../../../util/responseHelper";
import {noticeSuccess} from "../../../component/notification/noticeSuccess";
import {profileHeroesChanged, teamSaveChanged} from "../../../redux/reducer/hero";
import {SUCCESS_TEAM_SAVED} from "../../../lang/langSuccess";

class ProfileHeroListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({profileHeroListFetch: {}});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {profileHeroListFetch, dispatch} = this.props;
        if (!prevProps.profileHeroListFetch.fulfilled && profileHeroListFetch.fulfilled) {
            dispatch(profileHeroesChanged(profileHeroListFetch.value));
        }
    }

    componentWillUnmount() {
        clearProfileHeroListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, profileHeroListFetch, dispatchProfileHeroListGet} = this.props;
        if (fetchOnPathAndIfNotExists(prevProps.path, path, WISIES_ROUTE, prevProps.profileHeroListFetch, profileHeroListFetch)) {
            dispatchProfileHeroListGet();
        }
    }

    render() {
        return null;
    }
}

export function clearProfileHeroListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profileHeroList'}});
}

export default connect([{
    resource: 'profileHeroList',
    request: () => ({
        url: `/hero/listProfileHero`,
    })
}])(ProfileHeroListFetch);