import React from 'react';
import _ from 'lodash';
import Tour from "../../component/tour/Tour";
import {connect} from "react-redux";
import {remToPixels} from "../../util/fontHelper";
import {prepareIntroStepWelcome} from "./steps/IntroStepWelcome";
import {prepareIntroStepGoToOptions} from "./steps/IntroStepGoToOptions";
import {prepareIntroStepOptions} from "./steps/IntroStepOptions";
import {prepareIntroStepGoToProfile} from "./steps/IntroStepGoToProfile";
import {stepIndexChanged} from "../../redux/reducer/intro";
import {prepareIntroStepGoToWisor} from "./steps/IntroStepGoToWisor";
import {prepareIntroStepWisor} from "./steps/IntroStepWisor";
import {STEP_ID_TO_ROUTE, STEP_INDEX_TO_STEP_ID} from "./introHelper";
import {push} from "connected-react-router";
import {prepareIntroStepGoToAppFromOptions} from "./steps/IntroStepGoToAppFromOptions";
import {prepareIntroStepGoToWisies} from "./steps/IntroStepGoToWisies";

export function prepareIntroSteps() {
    return [
        prepareIntroStepWelcome(),
        prepareIntroStepGoToOptions(),
        prepareIntroStepOptions(),
        prepareIntroStepGoToWisor(),
        prepareIntroStepWisor(),
        prepareIntroStepGoToAppFromOptions(),
        prepareIntroStepGoToWisies(),
        prepareIntroStepGoToProfile(),
    ];
}

class Intro extends React.PureComponent {

    componentDidUpdate(prevProps) {
        const {stepIndex, path, onRouteChange} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        const introPaths = _.flatten([STEP_ID_TO_ROUTE[stepId]]);
        console.log('Intro', introPaths, path);
        if (!_.includes(introPaths, path)) {
            onRouteChange(_.head(introPaths));
        }
    }

    render() {
        const {stepIndex} = this.props;
        return <div className="">
            <Tour
                showNavigation={false}
                showNavigationNumber={false}
                showNumber={false}
                showButtons={false}
                showClose={false}
                rounded={remToPixels(0.5)}
                goToStep={stepIndex}
                steps={prepareIntroSteps()}
                isOpen={true}
                onRequestClose={_.noop}/>
        </div>
    }
}

export default connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex)),
        onRouteChange: (e) => dispatch(push(e))
    })
)(Intro);
