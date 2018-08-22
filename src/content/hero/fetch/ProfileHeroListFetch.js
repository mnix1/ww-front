import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {WISIES_ROUTE} from "../../routes";
import {fetchOnPathAndIfNotExists} from "../../../util/repositoryHelper";

class ProfileHeroListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({profileHeroListFetch: {}});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
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
        url: `/profile/listHero`,
    })
}])(ProfileHeroListFetch);