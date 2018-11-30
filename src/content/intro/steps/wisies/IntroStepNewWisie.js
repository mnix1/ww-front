import React from 'react';
import {
    INTRO_STEP_NEW_WISIE,
    INTRO_STEP_NEW_WISIE_TEXT_0,
    INTRO_STEP_NEW_WISIE_TEXT_1,
    INTRO_STEP_NEW_WISIE_TEXT_2,
    INTRO_STEP_NEW_WISIE_TEXT_3,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import {getIntroText} from "../../../../lang/langIntro";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {introductionStepIndexChanged} from "../../../../redux/reducer/intro";
import _ from 'lodash';

class IntroStepNewWisie extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {wisieDetails, introductionStepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[introductionStepIndex];
        if (stepId === INTRO_STEP_NEW_WISIE && !_.isNil(wisieDetails)) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_NEW_WISIE} renderContinue={false} wisorHeightFactor={2}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_NEW_WISIE_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_NEW_WISIE_TEXT_1)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_NEW_WISIE_TEXT_2)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_NEW_WISIE_TEXT_3)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepNewWisieRedux = connect(
    (state) => ({
        introductionStepIndex: state.intro.introductionStepIndex,
        wisieDetails: state.wisie.wisieDetails,
    }),
    (dispatch) => ({
        onStepIndexChange: (introductionStepIndex) => dispatch(introductionStepIndexChanged(introductionStepIndex))
    })
)(IntroStepNewWisie);

export function prepareIntroStepNewWisie(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_NEW_WISIE,
        content: <IntroStepNewWisieRedux/>
    });
}