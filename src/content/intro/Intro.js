import React from 'react';
import _ from 'lodash';
import Tour from "../../component/tour/Tour";
import {connect} from "react-redux";
import {remToPixels} from "../../util/fontHelper";
import {prepareIntroStepWelcome} from "./steps/welcome/IntroStepWelcome";
import {prepareIntroStepGoToOptions} from "./steps/options/IntroStepGoToOptions";
import {prepareIntroStepOptions} from "./steps/options/IntroStepOptions";
import {prepareIntroStepGoToProfile} from "./steps/profile/IntroStepGoToProfile";
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
import {repFulfilled} from "../../util/repositoryHelper";

export function prepareIntroSteps(afterReload) {
    return [
        prepareIntroStepWelcome(afterReload),
        prepareIntroStepGoToOptions(afterReload),
        prepareIntroStepOptions(afterReload),
        prepareIntroStepGoToWisor(afterReload),
        prepareIntroStepWisor(afterReload),
        prepareIntroStepGoToAppFromOptions(afterReload),
        prepareIntroStepGoToWisies(afterReload),
        prepareIntroStepWisies(afterReload),
        prepareIntroStepNewWisie(false),
        prepareIntroStepWisieDetails(afterReload),
        prepareIntroStepWisieDetailsClose(afterReload),
        prepareIntroStepPickWisies(afterReload),
        prepareIntroStepGoToEditTeam(false),
        prepareIntroStepGoToProfile(afterReload),
    ];
}

class Intro extends React.PureComponent {

    get canRender() {
        const {show, path, isProfileWisiesActual} = this.props;
        return show
            && (path !== WISIES_ROUTE || (path === WISIES_ROUTE && isProfileWisiesActual ));
    }

    get isOpen() {
        const {open} = this.props;
        return open && this.canRender;
    }

    render() {
        const {stepIndex, afterReload} = this.props;
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
                steps={prepareIntroSteps(afterReload)}
                isOpen={this.isOpen}
                update={stepIndex + ''}
                onRequestClose={_.noop}/>
        </div>
    }
}

export default connect(
    (state) => ({
        afterReload: state.profile.profile.introductionStepIndex === state.intro.stepIndex,
        stepIndex: state.intro.stepIndex,
        isProfileWisiesActual: state.wisie.isProfileWisiesActual,
        enable: state.intro.enable,
        show: state.intro.show,
        open: state.socket.open,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex)),
        onRouteChange: (e) => dispatch(push(e))
    })
)(Intro);
