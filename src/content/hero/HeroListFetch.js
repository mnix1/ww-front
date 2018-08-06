import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {WISIES_ROUTE} from "../routes";

class HeroListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearHeroListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, dispatchHeroListGet} = this.props;
        if (path === WISIES_ROUTE && prevProps.path !== path) {
            dispatchHeroListGet();
        }
    }

    render() {
        return null;
    }
}

export function clearHeroListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'heroList'}});
}

export default connect([{
    resource: 'heroList',
    request: () => ({
        url: `/hero/list`,
    })
}])(HeroListFetch);