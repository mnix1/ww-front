import React from 'react';
import _ from 'lodash';
import Tour from "../../component/tour/Tour";
import {connect} from "react-redux";
import IntroChangeStepIndexFetch from "./fetch/IntroChangeStepIndexFetch";
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
import IntroPickWisiesFetch from "./fetch/IntroPickWisiesFetch";

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
        prepareIntroStepGoToProfile(afterReload),
    ];
}

class Intro extends React.PureComponent {

    render() {
        const {stepIndex, profile, show, open, afterReload, pickWisies} = this.props;
        if (!show) {
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
                isOpen={open && show}
                update={stepIndex + ''}
                onRequestClose={_.noop}/>
            <IntroChangeStepIndexFetch stepIndex={stepIndex} profile={profile}/>
            <IntroPickWisiesFetch stepIndex={stepIndex} pickWisies={pickWisies} profile={profile}/>
        </div>
    }
}

export default connect(
    (state) => ({
        afterReload: state.profile.profile.introductionStepIndex === state.intro.stepIndex,
        profile: state.profile.profile,
        stepIndex: state.intro.stepIndex,
        pickWisies: state.intro.pickWisies,
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
