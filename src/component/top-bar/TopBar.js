import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import {getText, TEXT_APP_NAME} from "../../lang/langText";
import {push} from "connected-react-router";
import {APP_ROUTE} from "../../content/routes";
import {INTRO_STEP_WELCOME} from "../../content/intro/introHelper";
import {RIVAL_STATUS_IN_PROGRESS} from "../../util/rivalHelper";

class TopBar extends React.PureComponent {

    renderLogo() {
        const {screen, onAppNameClick, rivalStatus} = this.props;
        const {contentWidth, height} = screen;
        if (rivalStatus === RIVAL_STATUS_IN_PROGRESS && screen.isSmallHeight) {
            return null;
        }
        const fontSize = Math.min(contentWidth / 14, height / 14);
        return <div className='justifyCenter'>
            <span style={{fontSize}} onClick={onAppNameClick}
                  className={`topBarContentValue ${INTRO_STEP_WELCOME}`}>
                {getText(TEXT_APP_NAME)}
                </span>
        </div>
    }

    render() {
        return <div className='topBar'>
            {this.renderLogo()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        rivalStatus: state.rival.status,
    }),
    (dispatch) => ({
        onAppNameClick: () => {
            dispatch(push(APP_ROUTE));
        }
    })
)(TopBar);
