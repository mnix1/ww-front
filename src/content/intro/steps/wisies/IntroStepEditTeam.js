import React from 'react';
import {
    INTRO_STEP_EDIT_TEAM,
    INTRO_STEP_EDIT_TEAM_TEXT_0,
    INTRO_STEP_EDIT_TEAM_TEXT_1,
    INTRO_STEP_EDIT_TEAM_TEXT_2,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../../redux/reducer/intro";
import {getIntroText} from "../../../../lang/langIntro";
import {isRepValueCode1} from "../../../../util/repositoryHelper";

class IntroStepEditTeam extends React.PureComponent {

    componentDidMount() {
        this.nextStep();
    }

    componentDidUpdate(prevProps) {
        this.nextStep();
    }

    nextStep() {
        const {wisieTeamSaveRep, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_EDIT_TEAM && isRepValueCode1(wisieTeamSaveRep)) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_EDIT_TEAM} renderContinue={false} enableOpacity renderHide>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_EDIT_TEAM_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_EDIT_TEAM_TEXT_1)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_EDIT_TEAM_TEXT_2)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepEditTeamRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        wisieTeamSaveRep: state.repository.wisieTeamSave,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepEditTeam);

export function prepareIntroStepEditTeam(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_EDIT_TEAM,
        content: <IntroStepEditTeamRedux/>
    });
}