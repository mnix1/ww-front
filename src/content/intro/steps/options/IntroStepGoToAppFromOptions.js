import React from 'react';
import {getIntroText} from "../../../../lang/langIntro";
import {
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_0,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_1,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_2,
    INTRO_STEP_GO_TO_APP_FROM_OPTIONS_TEXT_3,
    INTRO_STEP_WELCOME,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {APP_ROUTE, SETTINGS_ROUTE} from "../../../routes";
import {connect} from "react-redux";
import {introductionStepIndexChanged} from "../../../../redux/reducer/intro";

class IntroStepGoToAppFromOptions extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {path, introductionStepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[introductionStepIndex];
        if (stepId === INTRO_STEP_GO_TO_APP_FROM_OPTIONS && path === APP_ROUTE && prevProps.path === SETTINGS_ROUTE) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_GO_TO_APP_FROM_OPTIONS} renderContinue={true}>
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
        introductionStepIndex: state.intro.introductionStepIndex,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (introductionStepIndex) => dispatch(introductionStepIndexChanged(introductionStepIndex))
    })
)(IntroStepGoToAppFromOptions);

export function prepareIntroStepGoToAppFromOptions(afterReload) {
    return prepareIntroStep(afterReload, {
        position: 'center',
        selector: `.${INTRO_STEP_WELCOME}`,
        stepId: INTRO_STEP_GO_TO_APP_FROM_OPTIONS,
        content: <IntroStepGoToAppFromOptionsRedux/>
    });
}