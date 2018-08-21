import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE} from "../../routes";
import _ from 'lodash';

class ProfileStopReadBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearProfileStopReadBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, readBookId, dispatchProfileStopReadBookPost} = this.props;
        if (path === PROFILE_ROUTE
            && !_.isNil(readBookId)
            && (prevProps.path !== path || prevProps.readBookId !== readBookId)) {
            dispatchProfileStopReadBookPost(readBookId);
        }
    }

    render() {
        return null;
    }
}

export function clearProfileStopReadBookFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profileStopReadBook'}});
}

export default connect([{
    method: 'post',
    resource: 'profileStopReadBook',
    request: (id) => ({
        url: `/profile/stopReadBook`,
        body: {id}
    })
}])(ProfileStopReadBookFetch);