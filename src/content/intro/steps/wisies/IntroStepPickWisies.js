import React from 'react';
import {INTRO_STEP_PICK_WISIES, STEP_ID_TO_NEXT_STEP_INDEX, STEP_INDEX_TO_STEP_ID} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {introductionStepIndexChanged} from "../../../../redux/reducer/intro";
import {isRepValueCode1} from "../../../../util/repositoryHelper";

class IntroStepPickWisies extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {introPickWisiesRep, introductionStepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[introductionStepIndex];
        if (stepId === INTRO_STEP_PICK_WISIES && isRepValueCode1(introPickWisiesRep)) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_PICK_WISIES} render={false}>
            <div>
            </div>
        </IntroStep>
    }
}

const IntroStepPickWisiesRedux = connect(
    (state) => ({
        introductionStepIndex: state.intro.introductionStepIndex,
        introPickWisiesRep: state.repository.introPickWisies,
    }),
    (dispatch) => ({
        onStepIndexChange: (introductionStepIndex) => dispatch(introductionStepIndexChanged(introductionStepIndex))
    })
)(IntroStepPickWisies);

export function prepareIntroStepPickWisies(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_PICK_WISIES,
        content: <IntroStepPickWisiesRedux/>
    });
}