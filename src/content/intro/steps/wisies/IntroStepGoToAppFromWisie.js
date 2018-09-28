import React from 'react';
import {
    INTRO_STEP_GO_TO_APP_FROM_WISIE,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_0,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_1,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_2,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_3,
    INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_4
} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {completeChanged} from "../../../../redux/reducer/intro";
import {getIntroText} from "../../../../lang/langIntro";

class IntroStepGoToAppFromWisie extends React.PureComponent {

    // componentDidUpdate(prevProps) {
    //     const {wisieTeamSaveRep, stepIndex, onStepIndexChange} = this.props;
    //     const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
    //     if (stepId === INTRO_STEP_GO_TO_APP_FROM_WISIE && isRepFulfilled(wisieTeamSaveRep)) {
    //         onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
    //     }
    // }

    render() {
        const {onStepIndexChange} = this.props;
        return <IntroStep
            stepId={INTRO_STEP_GO_TO_APP_FROM_WISIE}
            renderContinue={true}
            enableOpacity
            onContinueClick={onStepIndexChange}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_1)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_2)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_3)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_APP_FROM_WISIE_TEXT_4)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepGoToAppFromWisieRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        wisieTeamSaveRep: state.repository.wisieTeamSave,
    }),
    (dispatch) => ({
        // onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
        onStepIndexChange: (stepIndex) => dispatch(completeChanged(stepIndex))
    })
)(IntroStepGoToAppFromWisie);

export function prepareIntroStepGoToAppFromWisie(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_GO_TO_APP_FROM_WISIE,
        content: <IntroStepGoToAppFromWisieRedux/>
    });
}