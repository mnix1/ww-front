import React from 'react';
import {
    INTRO_STEP_GO_TO_WISOR,
    INTRO_STEP_GO_TO_WISOR_TEXT_0, INTRO_STEP_GO_TO_WISOR_TEXT_1,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import {getIntroText} from "../../../../lang/langIntro";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {SETTINGS_CHOOSE_WISOR_ROUTE, SETTINGS_ROUTE} from "../../../routes";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../../redux/reducer/intro";

class IntroStepGoToWisor extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {path, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_GO_TO_WISOR && path === SETTINGS_CHOOSE_WISOR_ROUTE && prevProps.path === SETTINGS_ROUTE) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_GO_TO_WISOR} renderContinue={false} wisorHeightFactor={2}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_WISOR_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_WISOR_TEXT_1)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepGoToWisorRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepGoToWisor);

export function prepareIntroStepGoToWisor(afterReload) {
    return prepareIntroStep(afterReload,{
        stepId: INTRO_STEP_GO_TO_WISOR,
        content: <IntroStepGoToWisorRedux/>
    });
}