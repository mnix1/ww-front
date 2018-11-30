import React from 'react';
import {getIntroText} from "../../../../lang/langIntro";
import {
    INTRO_STEP_GO_TO_PROFILE,
    INTRO_STEP_GO_TO_PROFILE_TEXT_0,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {APP_ROUTE, PROFILE_ROUTE} from "../../../routes";
import {connect} from "react-redux";
import {introductionStepIndexChanged} from "../../../../redux/reducer/intro";

class IntroStepGoToProfile extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {path, introductionStepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[introductionStepIndex];
        if (stepId === INTRO_STEP_GO_TO_PROFILE && path === PROFILE_ROUTE && prevProps.path === APP_ROUTE) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_GO_TO_PROFILE} renderContinue={false}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_PROFILE_TEXT_0)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepGoToProfileRedux = connect(
    (state) => ({
        introductionStepIndex: state.intro.introductionStepIndex,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (introductionStepIndex) => dispatch(introductionStepIndexChanged(introductionStepIndex))
    })
)(IntroStepGoToProfile);

export function prepareIntroStepGoToProfile(afterReload) {
    return prepareIntroStep(afterReload,{
        stepId: INTRO_STEP_GO_TO_PROFILE,
        content: <IntroStepGoToProfileRedux/>
    });
}