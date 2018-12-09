import React from 'react';
import {connect} from "react-redux";
import {FaExternalLinkSquareAlt, FaFacebook, FaGoogle} from 'react-icons/fa';
import {getText, TEXT_APP_NAME} from "../../lang/langText";
import {push} from "connected-react-router";
import {LOGIN_WISIEMANIA_ROUTE} from "../../content/routes";
import AuthButton from "./AuthButton";
import AuthPage from "./AuthPage";
import {getLoginText, TEXT_LOG_IN_WITH} from "../../lang/langLogin";

class LoginPage extends AuthPage {

    onClickHref(url) {
        return () => window.location.href = url;
    }

    renderContent() {
        const {lang, goToMainScreen} = this.props;
        return <div className='justifyCenter flexColumn'>
            <AuthButton
                backgroundColor='#8f8e90'
                text={`${getLoginText(TEXT_LOG_IN_WITH, lang)} ${getText(TEXT_APP_NAME, lang)}`}
                logo={<FaExternalLinkSquareAlt/>}
                onClick={goToMainScreen}
            />
            <AuthButton
                backgroundColor='#4285f4'
                text={`${getLoginText(TEXT_LOG_IN_WITH, lang)} Google`}
                logo={<FaGoogle/>}
                onClick={this.onClickHref('/_login/google')}
            />
            <AuthButton
                backgroundColor='#4267b2'
                text={`${getLoginText(TEXT_LOG_IN_WITH, lang)} Facebook`}
                logo={<FaFacebook/>}
                onClick={this.onClickHref('/_login/facebook')}
            />
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        lang: state.language.lang,
    }),
    (dispatch) => ({
        goToMainScreen: () => {
            dispatch(push(LOGIN_WISIEMANIA_ROUTE));
        },
    })
)(LoginPage);
