import React from 'react';
import {
    INTRO_STEP_EXPERIMENT,
    INTRO_STEP_EXPERIMENT_TEXT_0,
    INTRO_STEP_EXPERIMENT_TEXT_1,
    INTRO_STEP_EXPERIMENT_TEXT_2,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import {getIntroText} from "../../../../lang/langIntro";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {isRepValueCode1} from "../../../../util/repositoryHelper";
import {stepIndexChanged} from "../../../../redux/reducer/intro";
import {enoughResources} from "../../../../util/experimentHelper";

class IntroStepExperiment extends React.PureComponent {

    componentDidMount() {
        this.nextStep();
    }

    componentDidUpdate(prevProps) {
        this.nextStep();
    }

    nextStep() {
        const {wisieExperimentRep, stepIndex, profile, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_EXPERIMENT &&
            (isRepValueCode1(wisieExperimentRep) || !(enoughResources(profile)))
        ) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_EXPERIMENT} renderContinue={false}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_EXPERIMENT_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_EXPERIMENT_TEXT_1)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_EXPERIMENT_TEXT_2)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepWisiesRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        profile: state.profile.profile,
        wisieExperimentRep: state.repository.wisieExperiment,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepExperiment);

export function prepareIntroStepWisies(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_EXPERIMENT,
        content: <IntroStepWisiesRedux/>
    });
}