import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {profileChanged, signedInChanged} from "../../redux/reducer/profile";
import {langChanged} from "../../redux/reducer/language";
import {LOGIN_ROUTE} from "../routes";
import {enableChanged, stepIndexChanged} from "../../redux/reducer/intro";
import {isRepFulfilled, isRepRejected} from "../../util/repositoryHelper";

class ProfileFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {dispatch, profileFetch} = this.props;
        if (isRepFulfilled(profileFetch)) {
            if (isRepFulfilled(prevProps.profileFetch)) {
                return;
            }
            dispatch(langChanged(profileFetch.value.language));
            dispatch(profileChanged(profileFetch.value));
            if (!profileFetch.value.introductionCompleted) {
                dispatch(stepIndexChanged(profileFetch.value.introductionStepIndex));
                dispatch(enableChanged(true));
            }
        } else if (isRepRejected(profileFetch)) {
            if (isRepRejected(prevProps.profileFetch)) {
                return;
            }
            dispatch(signedInChanged(false));
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