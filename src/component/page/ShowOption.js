import React from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {optionShowChanged} from "../../redux/reducer/option";
import {INTRO_STEP_GO_TO_OPTIONS} from "../../content/intro/introHelper";
import {SETTINGS_ROUTE} from "../../content/routes";
import {RIVAL_STATUS_CLOSED, RIVAL_STATUS_IN_PROGRESS} from "../../util/rivalHelper";
import {getSurrenderMsg} from "../option/Option";
import _ from "lodash";
import {FaCogs} from "react-icons/fa";

class ShowOption extends React.PureComponent {
    render() {
        const {onOptionShowChange, onRouteChange, screen, path, rivalStatus} = this.props;
        if (path === SETTINGS_ROUTE || ((rivalStatus === RIVAL_STATUS_IN_PROGRESS || rivalStatus === RIVAL_STATUS_CLOSED) && screen.isSmallHeight)) {
            return null;
        }
        const imgHeight = screen.isSmallHeight ? 30 : 40;
        const isInRival = !_.isNil(getSurrenderMsg(path));
        return <div className={`showOption ${INTRO_STEP_GO_TO_OPTIONS}`}>
            <FaCogs size={imgHeight} onClick={isInRival ? onOptionShowChange : () => onRouteChange(SETTINGS_ROUTE)}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        screen: state.screen,
        rivalStatus: state.rival.status,
    }),
    (dispatch) => ({
        onRouteChange: (e) => dispatch(push(e)),
        onOptionShowChange: () => dispatch(optionShowChanged(true))
    })
)(ShowOption);


