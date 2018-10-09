import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import {getText, TEXT_APP_NAME} from "../../lang/langText";
import {push} from "connected-react-router";
import {APP_ROUTE} from "../../content/routes";
import {INTRO_STEP_WELCOME} from "../../content/intro/introHelper";

class TopBar extends React.PureComponent {

    renderLogo() {
        const {screen, onAppNameClick} = this.props;
        const {topBarFontSizeRem} = screen;
        return <div className='textAlignCenter'>
            <span style={{fontSize: topBarFontSizeRem}} onClick={onAppNameClick}
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
        lang: state.language.lang
    }),
    (dispatch) => ({
        onAppNameClick: () => {
            dispatch(push(APP_ROUTE));
        }
    })
)(TopBar);
