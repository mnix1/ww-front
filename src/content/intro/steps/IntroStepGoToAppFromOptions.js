import React from 'react';
import {getIntroText} from "../../../lang/langIntro";
import {
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_0,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_1,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_2,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_3,
    INTRO_STEP_WELCOME,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../introHelper";
import IntroStep, {prepareIntroStep} from "./IntroStep";
import {APP_ROUTE, SETTINGS_ROUTE} from "../../routes";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../redux/reducer/intro";

class IntroStepGoToAppFromOptions extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {path, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_GO_TO_APP_FROM_OPTIONS && path === APP_ROUTE && prevProps.path === SETTINGS_ROUTE) {
            // setTimeout(() => {
                onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
            // }, 100)
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_GO_TO_APP_FROM_OPTIONS} renderContinue={false}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_1)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_2)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_3)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepGoToAppFromOptionsRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepGoToAppFromOptions);

export function prepareIntroStepGoToAppFromOptions() {
    return prepareIntroStep({
        position: 'center',
        selector: `.${INTRO_STEP_WELCOME}`,
        stepId: INTRO_STEP_GO_TO_APP_FROM_OPTIONS,
        content: <IntroStepGoToAppFromOptionsRedux/>
    });
}