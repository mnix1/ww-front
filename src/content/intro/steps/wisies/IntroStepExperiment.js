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
import {introductionStepIndexChanged} from "../../../../redux/reducer/intro";
import {experimentCost} from "../../../../util/resourceHelper";

class IntroStepExperiment extends React.PureComponent {

    componentDidMount() {
        this.nextStep();
    }

    componentDidUpdate(prevProps) {
        this.nextStep();
    }

    nextStep() {
        const {wisieExperimentRep, profileWisieListRep, introductionStepIndex, profile, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[introductionStepIndex];
        if (stepId === INTRO_STEP_EXPERIMENT &&
            (isRepValueCode1(wisieExperimentRep) || !(experimentCost(profile, profileWisieListRep.value.length).isEnoughResource))
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
        introductionStepIndex: state.intro.introductionStepIndex,
        profile: state.profile,
        profileWisieListRep: state.repository.profileWisieList,
        wisieExperimentRep: state.repository.wisieExperiment,
    }),
    (dispatch) => ({
        onStepIndexChange: (introductionStepIndex) => dispatch(introductionStepIndexChanged(introductionStepIndex))
    })
)(IntroStepExperiment);

export function prepareIntroStepWisies(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_EXPERIMENT,
        content: <IntroStepWisiesRedux/>
    });
}