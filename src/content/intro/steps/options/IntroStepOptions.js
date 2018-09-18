import React from 'react';
import {
    INTRO_STEP_OPTIONS,
    INTRO_STEP_OPTIONS_TEXT_0,
    INTRO_STEP_OPTIONS_TEXT_1,
    INTRO_STEP_OPTIONS_TEXT_2,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import {getIntroText} from "../../../../lang/langIntro";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../../redux/reducer/intro";
import {isRepValueCode1} from "../../../../util/repositoryHelper";

class IntroStepOptions extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {settingsChangeNickRep, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_OPTIONS && isRepValueCode1(settingsChangeNickRep)) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_OPTIONS}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_OPTIONS_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_OPTIONS_TEXT_1)}</div>
                <div className=''>{getIntroText(INTRO_STEP_OPTIONS_TEXT_2)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepOptionsRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        settingsChangeNickRep: state.repository.settingsChangeNick,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepOptions);

export function prepareIntroStepOptions(afterReload) {
    return prepareIntroStep(afterReload,{
        stepId: INTRO_STEP_OPTIONS,
        content: <IntroStepOptionsRedux/>
    });
}