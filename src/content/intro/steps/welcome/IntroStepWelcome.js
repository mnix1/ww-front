import React from 'react';
import {
    INTRO_STEP_WELCOME,
    INTRO_STEP_WELCOME_TEXT_0,
    INTRO_STEP_WELCOME_TEXT_1,
    INTRO_STEP_WELCOME_TEXT_2,
    INTRO_STEP_WELCOME_TEXT_3,
    INTRO_STEP_WELCOME_TEXT_4
} from "../../introHelper";
import {getIntroText} from "../../../../lang/langIntro";
import IntroStep, {prepareIntroStep} from "../IntroStep";

class IntroStepWelcome extends React.PureComponent {

    render() {
        return <IntroStep stepId={INTRO_STEP_WELCOME}>
            <div>
                <div className='fontSize12Rem paddingBottomRem'>{getIntroText(INTRO_STEP_WELCOME_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WELCOME_TEXT_1)}</div>
                <div className=''>{getIntroText(INTRO_STEP_WELCOME_TEXT_2)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WELCOME_TEXT_3)}</div>
                {/*<div className=''>{getIntroText(INTRO_STEP_WELCOME_TEXT_4)}</div>*/}
            </div>
        </IntroStep>
    }
}

export function prepareIntroStepWelcome(afterReload) {
    return prepareIntroStep(afterReload,{
        position: 'center',
        stepId: INTRO_STEP_WELCOME,
        content: <IntroStepWelcome/>
    });
}