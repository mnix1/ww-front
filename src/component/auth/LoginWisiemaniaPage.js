import React from 'react';
import {connect} from "react-redux";
import {FaExternalLinkSquareAlt, FaUserPlus} from 'react-icons/fa';
import {getText, TEXT_APP_NAME} from "../../lang/langText";
import {requestForm} from "../../util/fetchHelper";
import {ERROR_TYPE} from "../../lang/langError";
import {push} from "connected-react-router";
import {APP_ROUTE, REGISTER_ROUTE} from "../../content/routes";
import {cleared, messageChanged, passwordChanged, usernameChanged} from "../../redux/reducer/login";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthPage from "./AuthPage";
import {
    ERROR_WRONG_CREDENTIALS,
    getLoginText,
    TEXT_CREATE_ACCOUNT,
    TEXT_LOG_IN_WITH,
    TEXT_PASSWORD
} from "../../lang/langLogin";
import ChangeLanguage from "../change-language/ChangeLanguage";

class LoginWisiemaniaPage extends AuthPage {

    componentWillUnmount() {
        this.props.clear();
    }

    handleLogin = () => {
        const {goToMainScreen, username, password, messageChange, clear} = this.props;
        if (!username || !password) {
            messageChange(ERROR_WRONG_CREDENTIALS);
            return;
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        requestForm('/_login/wisiemania', formData)
            .then(res => {
                if (!res.ok) {
                    messageChange(ERROR_WRONG_CREDENTIALS);
                } else {
                    clear();
                    goToMainScreen();
                }
            });
    };

    renderContent() {
        const {lang, usernameChange, passwordChange, username, password, goToRegister} = this.props;
        return <div className='justifyCenter flexColumn'>
            {this.renderMessage()}
            <AuthInput
                value={username}
                type='text'
                placeholder='login'
                onChange={usernameChange}
                onEnter={this.handleLogin}
                className='marginBottomRem fontSize09Rem'
            />
            <AuthInput
                value={password}
                type={'password'}
                placeholder={getLoginText(TEXT_PASSWORD, lang)}
                onChange={passwordChange}
                onEnter={this.handleLogin}
                className='marginBottomRem fontSize09Rem'
            />
            <AuthButton
                backgroundColor='#8f8e90'
                text={`${getLoginText(TEXT_LOG_IN_WITH, lang)} ${getText(TEXT_APP_NAME, lang)}`}
                logo={<FaExternalLinkSquareAlt/>}
                onClick={this.handleLogin}
            />
            <AuthButton
                backgroundColor='#4ecb45'
                text={getLoginText(TEXT_CREATE_ACCOUNT, lang)}
                logo={<FaUserPlus/>}
                onClick={goToRegister}
            />
            <div className='justifyCenter' style={{paddingTop: '1rem'}}>
                <ChangeLanguage withRequest={false}/>
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        username: state.login.username,
        password: state.login.password,
        message: state.login.message,
        lang: state.language.lang,
    }),
    (dispatch) => ({
        goToMainScreen: () => {
            dispatch(push(APP_ROUTE));
        },
        goToRegister: () => {
            dispatch(push(REGISTER_ROUTE));
        },
        messageChange: (id) => {
            dispatch(messageChanged(id, ERROR_TYPE));
        },
        usernameChange: (username) => {
            dispatch(usernameChanged(username));
        },
        passwordChange: (password) => {
            dispatch(passwordChanged(password));
        },
        clear: () => {
            dispatch(cleared());
        },
    })
)(LoginWisiemaniaPage);
