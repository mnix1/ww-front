import React from 'react';
import {
    INTRO_STEP_WISIE_DETAILS,
    INTRO_STEP_WISIE_DETAILS_TEXT_0,
    INTRO_STEP_WISIE_DETAILS_TEXT_1,
    INTRO_STEP_WISIE_DETAILS_TEXT_2,
    INTRO_STEP_WISIE_DETAILS_TEXT_3,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../../redux/reducer/intro";
import {getIntroText} from "../../../../lang/langIntro";
import {GREEN_COLOR} from "../../../../util/style/constant";
import {FaPlusCircle} from "react-icons/fa";
import {isRepValueCode1} from "../../../../util/repositoryHelper";

class IntroStepWisieDetails extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {wisieUpgradeAttributeRep, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_WISIE_DETAILS && isRepValueCode1(wisieUpgradeAttributeRep)) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_WISIE_DETAILS} wisorHeightFactor={2}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WISIE_DETAILS_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WISIE_DETAILS_TEXT_1)}</div>
                <div className='paddingBottomRem'>
                    {getIntroText(INTRO_STEP_WISIE_DETAILS_TEXT_2)}
                    <div className='inlineBlock paddingLeftRem paddingRightRem'><FaPlusCircle color={GREEN_COLOR}/></div>
                    {getIntroText(INTRO_STEP_WISIE_DETAILS_TEXT_3)}
                </div>
            </div>
        </IntroStep>
    }
}

const IntroStepWisieDetailsRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        wisieUpgradeAttributeRep: state.repository.wisieUpgradeAttribute,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepWisieDetails);

export function prepareIntroStepWisieDetails(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_WISIE_DETAILS,
        content: <IntroStepWisieDetailsRedux/>
    });
}