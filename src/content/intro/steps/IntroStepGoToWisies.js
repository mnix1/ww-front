import React from 'react';
import {getIntroText} from "../../../lang/langIntro";
import {
    INTRO_STEP_GO_TO_WISIES,
    INTRO_STEP_GO_TO_WISIES_TEXT_0,
    INTRO_STEP_GO_TO_WISIES_TEXT_1,
    INTRO_STEP_GO_TO_WISIES_TEXT_2,
    INTRO_STEP_GO_TO_WISIES_TEXT_3,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../introHelper";
import IntroStep, {prepareIntroStep} from "./IntroStep";
import {APP_ROUTE, WISIES_ROUTE} from "../../routes";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../redux/reducer/intro";

class IntroStepGoToWisies extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {path, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_GO_TO_WISIES && path === WISIES_ROUTE && prevProps.path === APP_ROUTE) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        const {screen, profile} = this.props;
        const {name} = profile;
        const width = !screen.moreHeightThanWidth ? screen.contentWidth * 0.5 : undefined;
        return <IntroStep stepId={INTRO_STEP_GO_TO_WISIES} renderContinue={false} width={width}>
            <div>
                <div
                    className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_WISIES_TEXT_0).replace('^_^', name)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_WISIES_TEXT_1)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_WISIES_TEXT_2)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_WISIES_TEXT_3)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepGoToWisiesRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        path: state.router.location.pathname,
        profile: state.profile.profile,
        screen: state.screen,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepGoToWisies);

export function prepareIntroStepGoToWisies(afterReload) {
    return prepareIntroStep(afterReload,{
        stepId: INTRO_STEP_GO_TO_WISIES,
        content: <IntroStepGoToWisiesRedux/>
    });
}