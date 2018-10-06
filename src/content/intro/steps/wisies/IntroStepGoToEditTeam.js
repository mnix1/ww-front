import React from 'react';
import {
    INTRO_STEP_GO_TO_EDIT_TEAM,
    INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_0,
    INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_1,
    STEP_ID_TO_NEXT_STEP_INDEX,
    STEP_INDEX_TO_STEP_ID
} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {stepIndexChanged} from "../../../../redux/reducer/intro";
import {getIntroText} from "../../../../lang/langIntro";
import {WISIES_ROUTE, WISIES_TEAM_EDIT_ROUTE} from "../../../routes";

class IntroStepGoToEditTeam extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {path, stepIndex, onStepIndexChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        if (stepId === INTRO_STEP_GO_TO_EDIT_TEAM && path === WISIES_TEAM_EDIT_ROUTE && prevProps.path === WISIES_ROUTE) {
            onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_GO_TO_EDIT_TEAM} renderContinue={false} renderHide={true}>
            <div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_0)}</div>
                <div className='paddingBottomRem'>{getIntroText(INTRO_STEP_GO_TO_EDIT_TEAM_TEXT_1)}</div>
            </div>
        </IntroStep>
    }
}

const IntroStepGoToEditTeamRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepGoToEditTeam);

export function prepareIntroStepGoToEditTeam(afterReload) {
    return prepareIntroStep(afterReload, {
        stepId: INTRO_STEP_GO_TO_EDIT_TEAM,
        content: <IntroStepGoToEditTeamRedux/>
    });
}