import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE} from "../../routes";
import _ from 'lodash';

class ProfileDiscardBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearProfileDiscardBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, bookId, dispatchProfileDiscardBookPost} = this.props;
        if (path === PROFILE_ROUTE
            && !_.isNil(bookId)
            && (prevProps.path !== path || prevProps.bookId !== bookId)) {
            dispatchProfileDiscardBookPost(bookId);
        }
    }

    render() {
        return null;
    }
}

export function clearProfileDiscardBookFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profileDiscardBook'}});
}

export default connect([{
    method: 'post',
    resource: 'profileDiscardBook',
    request: (id) => ({
        url: `/profile/discardBook`,
        body: {id}
    })
}])(ProfileDiscardBookFetch);