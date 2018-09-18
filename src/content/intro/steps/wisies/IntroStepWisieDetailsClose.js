import React from 'react';
import {
    INTRO_STEP_WISIE_DETAILS_CLOSE,
    INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_0, INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_1, INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_2,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../../redux/reducer/intro";
import {getIntroText} from "../../../../lang/langIntro";
import _ from "lodash";

class IntroStepWisieDetailsClose extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {wisieDetails, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_WISIE_DETAILS_CLOSE && _.isNil(wisieDetails)) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_WISIE_DETAILS_CLOSE} wisorHeightFactor={2} renderContinue={false}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_1)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WISIE_DETAILS_CLOSE_TEXT_2)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepWisieDetailsCloseRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        wisieDetails: state.wisie.wisieDetails,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepWisieDetailsClose);

export function prepareIntroStepWisieDetailsClose(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_WISIE_DETAILS_CLOSE,
        content: <IntroStepWisieDetailsCloseRedux/>
    });
}