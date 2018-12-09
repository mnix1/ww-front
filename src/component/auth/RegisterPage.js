import React from 'react';
import {connect} from "react-redux";
import AuthPage from "./AuthPage";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import {FaUserPlus} from "react-icons/fa";
import {push} from "connected-react-router";
import {cleared, emailChanged, loadingChanged, messageChanged, usernameChanged} from "../../redux/reducer/login";
import request from "../../util/fetchHelper";
import {checkCode, isCode1} from "../../util/repositoryHelper";
import {LOGIN_WISIEMANIA_ROUTE} from "../../content/routes";
import {
    ERROR_CANT_SEND_EMAIL,
    ERROR_EMAIL_ALREADY_EXISTS,
    ERROR_NOT_VALID_EMAIL,
    ERROR_NOT_VALID_USERNAME,
    ERROR_USERNAME_ALREADY_EXISTS,
    ERROR_WRONG_CREDENTIALS,
    getLoginText,
    TEXT_CREATE_ACCOUNT,
    TEXT_NEW_PASSWORD_EMAIL_SENT
} from "../../lang/langLogin";
import {ERROR_TYPE} from "../../lang/langError";
import {TEXT_TYPE} from "../../lang/langText";
import {Loading} from "../loading/Loading";

class RegisterPage extends AuthPage {

    componentDidMount() {
        this.props.clear();
    }

    getTitle() {
        return TEXT_CREATE_ACCOUNT;
    }

    handleCreate = () => {
        const {username, email, lang, messageChange, loadingChange, clear, goToLoginWisiemania} = this.props;
        if (!username || !email) {
            messageChange(ERROR_WRONG_CREDENTIALS, ERROR_TYPE);
            return;
        }
        loadingChange(true);
        request('/profile/register', {username, email, lang})
            .then(res => {
                loadingChange(false);
                if (isCode1(res)) {
                    clear();
                    messageChange(TEXT_NEW_PASSWORD_EMAIL_SENT, TEXT_TYPE);
                    goToLoginWisiemania();
                } else if (checkCode(res, -2)) {
                    messageChange(ERROR_NOT_VALID_USERNAME, ERROR_TYPE);
                } else if (checkCode(res, -3)) {
                    messageChange(ERROR_NOT_VALID_EMAIL, ERROR_TYPE);
                } else if (checkCode(res, -4)) {
                    messageChange(ERROR_EMAIL_ALREADY_EXISTS, ERROR_TYPE);
                } else if (checkCode(res, -5)) {
                    messageChange(ERROR_USERNAME_ALREADY_EXISTS, ERROR_TYPE);
                } else if (checkCode(res, -6)) {
                    messageChange(ERROR_CANT_SEND_EMAIL, ERROR_TYPE);
                }
            });
    };


    renderContent() {
        const {lang, usernameChange, emailChange, username, email, loading} = this.props;
        return <div className='justifyCenter flexColumn'>
            {this.renderMessage()}
            <AuthInput
                value={username}
                type='text'
                placeholder='login'
                onChange={usernameChange}
                onEnter={this.handleCreate}
                className='marginBottomRem fontSize09Rem'
            />
            <AuthInput
                value={email}
                type='email'
                placeholder='e-mail'
                onChange={emailChange}
                onEnter={this.handleCreate}
                className='marginBottomRem fontSize09Rem'
            />
            {loading
                ? <Loading/>
                : <AuthButton
                    backgroundColor='#4ecb45'
                    text={getLoginText(TEXT_CREATE_ACCOUNT, lang)}
                    logo={<FaUserPlus/>}
                    onClick={this.handleCreate}
                />}
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        lang: state.language.lang,
        username: state.login.username,
        email: state.login.email,
        loading: state.login.loading,
        message: state.login.message,
    }),
    (dispatch) => ({
        goToLoginWisiemania: () => {
            dispatch(push(LOGIN_WISIEMANIA_ROUTE));
        },
        messageChange: (id, type) => {
            dispatch(messageChanged(id, type));
        },
        usernameChange: (username) => {
            dispatch(usernameChanged(username));
        },
        emailChange: (password) => {
            dispatch(emailChanged(password));
        },
        loadingChange: (loading) => {
            dispatch(loadingChanged(loading));
        },
        clear: () => {
            dispatch(cleared());
        },
    })
)(RegisterPage);
