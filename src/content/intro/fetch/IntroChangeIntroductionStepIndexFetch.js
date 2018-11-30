import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import _ from 'lodash';
import {
    INTRO_STEP_GO_TO_EDIT_TEAM,
    INTRO_STEP_WISIE_DETAILS,
    INTRO_STEP_WISIE_DETAILS_CLOSE,
    STEP_INDEX_TO_STEP_ID
} from "../introHelper";

class IntroChangeIntroductionStepIndexFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearIntroChangeIntroductionStepIndexFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {introductionStepIndex, profile, dispatchIntroChangeIntroductionStepIndexPost} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[introductionStepIndex];
        if (prevProps.introductionStepIndex !== introductionStepIndex
            && profile.introductionStepIndex !== introductionStepIndex
            && !_.includes([INTRO_STEP_WISIE_DETAILS, INTRO_STEP_WISIE_DETAILS_CLOSE, INTRO_STEP_GO_TO_EDIT_TEAM], stepId)
        ) {
            dispatchIntroChangeIntroductionStepIndexPost(introductionStepIndex);
        }
    }

    render() {
        return null;
    }
}

export function clearIntroChangeIntroductionStepIndexFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'introChangeIntroductionStepIndex'}});
}

export default connect([{
    method: 'post',
    resource: 'introChangeIntroductionStepIndex',
    request: (introductionStepIndex) => ({
        url: `/intro/changeIntroductionStepIndex`,
        body: {introductionStepIndex}
    })
}])(IntroChangeIntroductionStepIndexFetch);