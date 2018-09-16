import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {profileChanged} from "../../redux/reducer/profile";
import {langChanged} from "../../redux/reducer/language";
import {LOGIN_ROUTE} from "../routes";

class ProfileFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {dispatch, profileFetch} = this.props;
        if (!prevProps.profileFetch.fulfilled && profileFetch.fulfilled) {
            if (profileFetch.value) {
                dispatch(langChanged(profileFetch.value.language));
            }
            dispatch(profileChanged(profileFetch.value));
        }
    }

    componentWillUnmount() {
        clearProfileFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {dispatchProfileGet, profileFetch, path} = this.props;
        if (!profileFetch.fulfilled && !profileFetch.pending && !profileFetch.rejected && path !== LOGIN_ROUTE) {
            dispatchProfileGet();
        }
    }

    render() {
        return null;
    }
}

export function clearProfileFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profile'}});
}

export default connect([{
    resource: 'profile',
    request: () => ({
        url: `/profile/profile`,
    })
}])(ProfileFetch);