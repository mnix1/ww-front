import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";

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
        const {dispatchHeroListGet, heroListFetch} = this.props;
        if (!heroListFetch.fulfilled && !heroListFetch.pending) {
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