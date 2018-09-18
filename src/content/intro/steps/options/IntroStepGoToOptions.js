import React from 'react';
import {
    INTRO_STEP_GO_TO_OPTIONS,
    INTRO_STEP_GO_TO_OPTIONS_TEXT_0,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import {getIntroText} from "../../../../lang/langIntro";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {APP_ROUTE, SETTINGS_ROUTE} from "../../../routes";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../../redux/reducer/intro";

class IntroStepGoToOptions extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {path, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_GO_TO_OPTIONS && path === SETTINGS_ROUTE && prevProps.path === APP_ROUTE) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_GO_TO_OPTIONS} renderContinue={false}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_OPTIONS_TEXT_0)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepGoToOptionsRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepGoToOptions);

export function prepareIntroStepGoToOptions(afterReload) {
    return prepareIntroStep(afterReload,{
        stepId: INTRO_STEP_GO_TO_OPTIONS,
        content: <IntroStepGoToOptionsRedux/>
    });
}