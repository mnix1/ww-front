import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {WISIES_ROUTE} from "../../routes";

class ProfileHeroListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearProfileHeroListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, dispatchProfileHeroListGet} = this.props;
        if (path === WISIES_ROUTE && prevProps.path !== path) {
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