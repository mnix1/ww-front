import React from 'react';
import _ from 'lodash';
import Tour from "../../component/tour/Tour";
import {connect} from "react-redux";
import {remToPixels} from "../../util/fontHelper";
import {prepareIntroStepWelcome} from "./steps/welcome/IntroStepWelcome";
import {prepareIntroStepGoToOptions} from "./steps/options/IntroStepGoToOptions";
import {prepareIntroStepOptions} from "./steps/options/IntroStepOptions";
import {stepIndexChanged} from "../../redux/reducer/intro";
import {prepareIntroStepGoToWisor} from "./steps/options/IntroStepGoToWisor";
import {prepareIntroStepWisor} from "./steps/options/IntroStepWisor";
import {push} from "connected-react-router";
import {prepareIntroStepGoToAppFromOptions} from "./steps/options/IntroStepGoToAppFromOptions";
import {prepareIntroStepGoToWisies} from "./steps/wisies/IntroStepGoToWisies";
import {prepareIntroStepWisies} from "./steps/wisies/IntroStepExperiment";
import {prepareIntroStepNewWisie} from "./steps/wisies/IntroStepNewWisie";
import {prepareIntroStepWisieDetails} from "./steps/wisies/IntroStepWisieDetails";
import {prepareIntroStepWisieDetailsClose} from "./steps/wisies/IntroStepWisieDetailsClose";
import {prepareIntroStepPickWisies} from "./steps/wisies/IntroStepPickWisies";
import {prepareIntroStepGoToEditTeam} from "./steps/wisies/IntroStepGoToEditTeam";
import {WISIES_ROUTE} from "../routes";
import {prepareIntroStepEditTeam} from "./steps/wisies/IntroStepEditTeam";
import {prepareIntroStepGoToAppFromWisie} from "./steps/wisies/IntroStepGoToAppFromWisie";

export function prepareIntroSteps() {
    return [
        prepareIntroStepWelcome(),
        prepareIntroStepGoToOptions(),
        prepareIntroStepOptions(),
        prepareIntroStepGoToWisor(),
        prepareIntroStepWisor(),
        prepareIntroStepGoToAppFromOptions(),
        prepareIntroStepGoToWisies(),
        prepareIntroStepWisies(),
        prepareIntroStepNewWisie(false),
        prepareIntroStepWisieDetails(),
        prepareIntroStepWisieDetailsClose(),
        prepareIntroStepPickWisies(),
        prepareIntroStepGoToEditTeam(false),
        prepareIntroStepEditTeam(),
        prepareIntroStepGoToAppFromWisie(),
        // prepareIntroStepGoToProfile(),
    ];
}

class Intro extends React.PureComponent {

    get canRender() {
        const {show, path, isProfileWisiesActual} = this.props;
        return show
            && (path !== WISIES_ROUTE || (path === WISIES_ROUTE && isProfileWisiesActual));
    }

    get isOpen() {
        const {open} = this.props;
        return open && this.canRender;
    }

    render() {
        const {stepIndex, } = this.props;
        if (!this.canRender) {
            return null;
        }
        return <div className="">
            <Tour
                showNavigation={false}
                showNavigationNumber={false}
                showNumber={false}
                disableKeyboardNavigation={true}
                disableDotsNavigation={true}
                showButtons={false}
                showClose={false}
                rounded={remToPixels(0.5)}
                goToStep={stepIndex}
                startAt={stepIndex}
                steps={prepareIntroSteps()}
                isOpen={this.isOpen}
                update={stepIndex + ''}
                onRequestClose={_.noop}/>
        </div>
    }
}

export default connect(
    (state) => ({
        stepIndex: state.intro.stepIndex,
        isProfileWisiesActual: state.wisie.isProfileWisiesActual,
        show: state.intro.show,
        open: state.socket.open,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex)),
        onRouteChange: (e) => dispatch(push(e))
    })
)(Intro);
