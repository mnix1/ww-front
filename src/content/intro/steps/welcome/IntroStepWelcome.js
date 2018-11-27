import React from 'react';
import {
    INTRO_STEP_WELCOME,
    INTRO_STEP_WELCOME_TEXT_0,
    INTRO_STEP_WELCOME_TEXT_1,
    INTRO_STEP_WELCOME_TEXT_2,
    INTRO_STEP_WELCOME_TEXT_3
} from "../../introHelper";
import {getIntroText} from "../../../../lang/langIntro";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import connect from "react-redux/es/connect/connect";

class IntroStepWelcome extends React.PureComponent {

    render() {
        const {lang} = this.props;
        return <IntroStep stepId={INTRO_STEP_WELCOME} renderChangeLanguage={true}>
            <div>
                <div className='fontSize12Rem paddingBottomRem'>{getIntroText(INTRO_STEP_WELCOME_TEXT_0, lang)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WELCOME_TEXT_1, lang)}</div>
                <div className=''>{getIntroText(INTRO_STEP_WELCOME_TEXT_2, lang)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WELCOME_TEXT_3, lang)}</div>
                {/*<div className=''>{getIntroText(INTRO_STEP_WELCOME_TEXT_4)}</div>*/}
            </div>
        </IntroStep>
    }
}

const IntroStepWelcomeRedux = connect(
    (state) => ({
        lang: state.language.lang,
    }),
    (dispatch) => ({
    })
)(IntroStepWelcome);

export function prepareIntroStepWelcome(afterReload) {
    return prepareIntroStep(afterReload,{
        position: 'center',
        stepId: INTRO_STEP_WELCOME,
        content: <IntroStepWelcomeRedux/>
    });
}