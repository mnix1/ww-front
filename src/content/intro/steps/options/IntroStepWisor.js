import React from 'react';
import {
    INTRO_STEP_WISOR,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../../redux/reducer/intro";
import {isRepValueCode1} from "../../../../util/repositoryHelper";

class IntroStepWisor extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {settingsChangeWisorRep, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_WISOR && isRepValueCode1(settingsChangeWisorRep)) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_WISOR} renderContinue={false} render={false}>
        </IntroStep>
    }
}

const IntroStepWisorRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        settingsChangeWisorRep: state.repository.settingsChangeWisor,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepWisor);

export function prepareIntroStepWisor(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_WISOR,
        content: <IntroStepWisorRedux/>
    });
}