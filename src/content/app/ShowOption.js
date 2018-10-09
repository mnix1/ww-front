import React from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {optionShowChanged} from "../../redux/reducer/option";
import {INTRO_STEP_GO_TO_OPTIONS} from "../intro/introHelper";
import {SETTINGS_ROUTE} from "../routes";
import {RIVAL_STATUS_CLOSED, RIVAL_STATUS_IN_PROGRESS, ROUTE_RIVAL_TYPE} from "../../util/rivalHelper";
import {FaCogs} from "react-icons/fa";

class ShowOption extends React.PureComponent {
    render() {
        const {onOptionShowChange, onRouteChange, screen, path, rivalStatus} = this.props;
        if (path === SETTINGS_ROUTE || ((rivalStatus === RIVAL_STATUS_IN_PROGRESS || rivalStatus === RIVAL_STATUS_CLOSED) && screen.isSmallHeight)) {
            return null;
        }
        const imgHeight = screen.topBarFontSizeRem;
        return <div className={`showOption ${INTRO_STEP_GO_TO_OPTIONS}`}>
            <FaCogs size={imgHeight} onClick={ROUTE_RIVAL_TYPE[path] ? onOptionShowChange : () => onRouteChange(SETTINGS_ROUTE)}/>
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


