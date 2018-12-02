import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE} from "../../routes";
import _ from 'lodash';
import {resourcesChanged, speedUpBookIdChanged} from "../../../redux/reducer/profile";

class ProfileSpeedUpBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {profileSpeedUpBookFetch, bookId, dispatch} = this.props;
        if (!prevProps.profileSpeedUpBookFetch.fulfilled && profileSpeedUpBookFetch.fulfilled && !_.isNil(bookId)) {
            dispatch(speedUpBookIdChanged(undefined));
            if (profileSpeedUpBookFetch.value.code === 1) {
                dispatch(resourcesChanged(profileSpeedUpBookFetch.value.resources));
            }
        }
    }

    componentWillUnmount() {
        clearProfileSpeedUpBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, bookId, dispatchProfileSpeedUpBookPost} = this.props;
        if (path === PROFILE_ROUTE
            && !_.isNil(bookId)
            && (prevProps.path !== path || prevProps.bookId !== bookId)) {
            dispatchProfileSpeedUpBookPost(bookId);
        }
    }

    render() {
        return null;
    }
}

export function clearProfileSpeedUpBookFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profileSpeedUpBook'}});
}

export default connect([{
    method: 'post',
    resource: 'profileSpeedUpBook',
    request: (id) => ({
        url: `/profile/speedUpBook`,
        body: {id}
    })
}])(ProfileSpeedUpBookFetch);