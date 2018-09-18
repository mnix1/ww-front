import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {INTRO_STEP_WISIE_DETAILS, STEP_INDEX_TO_STEP_ID} from "../introHelper";

class IntroChangeStepIndexFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        // const {introChangeStepIndexFetch, dispatch} = this.props;
        // if (!prevProps.introChangeStepIndexFetch.fulfilled && introChangeStepIndexFetch.fulfilled && isRepValueCode1(introChangeStepIndexFetch)) {
        // dispatch(profileChanged(introChangeStepIndexFetch.value.profile));
        // }
    }

    componentWillUnmount() {
        clearIntroChangeStepIndexFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {stepIndex, profile, dispatchIntroChangeStepIndexPost} = this.props;
        if (prevProps.stepIndex !== stepIndex
            && profile.introductionStepIndex !== stepIndex
            && STEP_INDEX_TO_STEP_ID[stepIndex] !== INTRO_STEP_WISIE_DETAILS
        ) {
            dispatchIntroChangeStepIndexPost(stepIndex);
        }
    }

    render() {
        return null;
    }
}

export function clearIntroChangeStepIndexFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'introChangeStepIndex'}});
}

export default connect([{
    method: 'post',
    resource: 'introChangeStepIndex',
    request: (stepIndex) => ({
        url: `/intro/changeStepIndex`,
        body: {stepIndex}
    })
}])(IntroChangeStepIndexFetch);