import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE} from "../../routes";
import _ from 'lodash';
import {stopReadBookIdChanged} from "../../../redux/reducer/profile";

class ProfileStopReadBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const{profileStopReadBookFetch, dispatch} = this.props;
        if (profileStopReadBookFetch.fulfilled) {
            dispatch(stopReadBookIdChanged(undefined));
        }
    }

    componentWillUnmount() {
        clearProfileStopReadBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, bookId, dispatchProfileStopReadBookPost} = this.props;
        if (path === PROFILE_ROUTE
            && !_.isNil(bookId)
            && (prevProps.path !== path || prevProps.bookId !== bookId)) {
            dispatchProfileStopReadBookPost(bookId);
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