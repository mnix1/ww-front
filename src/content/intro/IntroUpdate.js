import React from 'react';
import _ from 'lodash';
import {connect} from "react-redux";
import {showChanged, introductionStepIndexChanged} from "../../redux/reducer/intro";
import {STEP_ID_TO_ROUTE, STEP_INDEX_TO_STEP_ID} from "./introHelper";
import {push} from "connected-react-router";
import IntroChangeStepIndexFetch from "./fetch/IntroChangeIntroductionStepIndexFetch";
import IntroPickWisiesFetch from "./fetch/IntroPickWisiesFetch";

class IntroUpdate extends React.PureComponent {

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prevProps) {
        this.update(prevProps);
    }

    update() {
        const {introductionStepIndex, path, onRouteChange, show, onShowChanged} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[introductionStepIndex];
        const introPaths = _.flatten([STEP_ID_TO_ROUTE[stepId]]);
        if ((!show && _.head(introPaths) !== path) || !_.includes(introPaths, path)) {
            onRouteChange(_.head(introPaths));
        }
        if (show || this.timeout) {
            return;
        }
        onShowChanged(true);
    }

    render() {
        const {introductionStepIndex, profile, pickWisies} = this.props;
        return <div>
            <IntroChangeStepIndexFetch introductionStepIndex={introductionStepIndex} profile={profile}/>
            <IntroPickWisiesFetch introductionStepIndex={introductionStepIndex} pickWisies={pickWisies}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        profile: state.profile,
        introductionStepIndex: state.intro.introductionStepIndex,
        pickWisies: state.intro.pickWisies,
        show: state.intro.show,
        open: state.socket.open,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (introductionStepIndex) => dispatch(introductionStepIndexChanged(introductionStepIndex)),
        onRouteChange: (e) => {
            dispatch(push(e))
        },
        onShowChanged: (e) => {
            dispatch(showChanged(e))
        }
    })
)(IntroUpdate);
