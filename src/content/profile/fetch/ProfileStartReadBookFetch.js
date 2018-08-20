import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE} from "../../routes";
import _ from 'lodash';

class ProfileStartReadBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearProfileStartReadBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, readBookId, dispatchProfileStartReadBookPost} = this.props;
        if (path === PROFILE_ROUTE
            && !_.isNil(readBookId)
            && (prevProps.path !== path || prevProps.readBookId !== readBookId)) {
            dispatchProfileStartReadBookPost(readBookId);
        }
    }

    render() {
        return null;
    }
}

export function clearProfileStartReadBookFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profileStartReadBook'}});
}

export default connect([{
    method: 'post',
    resource: 'profileStartReadBook',
    request: (id) => ({
        url: `/profile/startReadBook`,
        body: {id}
    })
}])(ProfileStartReadBookFetch);