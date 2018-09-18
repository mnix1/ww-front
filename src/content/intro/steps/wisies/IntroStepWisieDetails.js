import React from 'react';
import {INTRO_STEP_WISIE_DETAILS, STEP_ID_TO_NEXT_STEP_INDEX, STEP_INDEX_TO_STEP_ID} from "../../introHelper";
import IntroStep, {prepareIntroStep} from "../IntroStep";
import {connect} from "react-redux";
import {isRepValueCode1} from "../../../../util/repositoryHelper";
import {stepIndexChanged} from "../../../../redux/reducer/intro";

class IntroStepWisieDetails extends React.PureComponent {

    componentDidUpdate(prevProps) {
        // const {wisieWisieDetailsRep, stepIndex, onStepIndexChange} = this.props;
        // const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        // if (stepId === INTRO_STEP_WISIE_DETAILS && isRepValueCode1(wisieWisieDetailsRep)) {
        //     setTimeout(() => {
        //         onStepIndexChange(STEP_ID_TO_NEXT_STEP_INDEX[stepId]);
        //     }, 1000)
        // }
    }

    render() {
        return <IntroStep stepId={INTRO_STEP_WISIE_DETAILS} render={false}>
            <div>
                {/*<div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WISIE_DETAILS_TEXT_0)}</div>*/}
                {/*<div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WISIE_DETAILS_TEXT_1)}</div>*/}
                {/*<div className='paddingBottomRem'>{getIntroText(INTRO_STEP_WISIE_DETAILS_TEXT_2)}</div>*/}
            </div>
        </IntroStep>
    }
}

const IntroStepWisieDetailsRedux = connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        wisieDetails: state.repository.wisieWisieDetails,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex))
    })
)(IntroStepWisieDetails);

export function prepareIntroStepWisieDetails(afterReload) {
    return prepareIntroStep(afterReload, {
        selector: 'body',
        stepId: INTRO_STEP_WISIE_DETAILS,
        content: <IntroStepWisieDetailsRedux/>
    });
}