import React from 'react';
import {
    INTRO_STEP_NEW_WISIE,
    INTRO_STEP_NEW_WISIE_TEXT_0,
    INTRO_STEP_NEW_WISIE_TEXT_1,
    INTRO_STEP_NEW_WISIE_TEXT_2, INTRO_STEP_NEW_WISIE_TEXT_3,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import {getIntroText} from "../../../../lang/langIntro";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../../redux/reducer/intro";
import {GREEN_COLOR} from "../../../../util/style/constant";
import {FaPlusCircle} from "react-icons/fa";
import _ from 'lodash';

class IntroStepNewWisie extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {wisieDetails, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_NEW_WISIE && !_.isNil(wisieDetails)) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_NEW_WISIE} renderContinue={false} wisorHeightFactor={2}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_NEW_WISIE_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_NEW_WISIE_TEXT_1)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_NEW_WISIE_TEXT_2)}
                    <div className='inlineBlock paddingLeftRem'><FaPlusCircle color={GREEN_COLOR}/></div>
                </div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_NEW_WISIE_TEXT_3)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepNewWisieRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        wisieDetails: state.wisie.wisieDetails,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepNewWisie);

export function prepareIntroStepNewWisie(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_NEW_WISIE,
        content: <IntroStepNewWisieRedux/>
    });
}