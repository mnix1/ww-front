import React from 'react';
import _ from 'lodash';
import {connect} from "react-redux";
import {showChanged, stepIndexChanged} from "../../redux/reducer/intro";
import {STEP_ID_TO_ROUTE, STEP_INDEX_TO_STEP_ID} from "./introHelper";
import {push} from "connected-react-router";

class IntroUpdate extends React.PureComponent {

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prevProps) {
        this.update(prevProps);
    }

    update() {
        const {stepIndex, path, onRouteChange, show, afterReload, onShowChanged} = this.props;
        const stepId = STEP_INDEX_TO_STEP_ID[stepIndex];
        const introPaths = _.flatten([STEP_ID_TO_ROUTE[stepId]]);
        if ((!show && _.head(introPaths) !== path) || !_.includes(introPaths, path)) {
            onRouteChange(_.head(introPaths));
        }
        if (show) {
            return;
        }
        if (afterReload && stepIndex !== 0) {
            setTimeout(() => {
                onShowChanged(true);
            }, 1000)
        } else {
            onShowChanged(true);
        }
    }

    render() {
        return null;
    }
}

export default connect(
    (state) => ({
        afterReload: state.profile.profile.introductionStepIndex === state.intro.stepIndex,
        profile: state.profile.profile,
        stepIndex: state.intro.stepIndex,
        enable: state.intro.enable,
        open: state.socket.open,
        show: state.intro.show,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStepIndexChange: (stepIndex) => dispatch(stepIndexChanged(stepIndex)),
        onRouteChange: (e) => {
            dispatch(push(e))
        },
        onShowChanged: (e) => {
            dispatch(showChanged(e))
        }
    })
)(IntroUpdate);
