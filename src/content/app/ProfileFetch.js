import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {profileChanged} from "../../redux/reducer/profile";

class ProfileFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {dispatch, profileFetch} = this.props;
        if (!prevProps.profileFetch.fulfilled && profileFetch.fulfilled) {
            dispatch(profileChanged(profileFetch.value));
        }
    }

    componentWillUnmount() {
        clearProfileFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {dispatchProfileGet, profileFetch} = this.props;
        if (!profileFetch.fulfilled && !profileFetch.pending) {
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