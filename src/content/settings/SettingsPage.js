import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {getWisor} from "../../util/wisorHelper";
import {
    getText,
    TEXT_CHANGE_LANGUAGE,
    TEXT_CHANGE_NICK,
    TEXT_CHANGE_WISOR,
    TEXT_CONFIRM_TO_SUBMIT,
    TEXT_DELETE_PROFILE,
    TEXT_LOGOUT,
    TEXT_NAME_LENGTH,
    TEXT_NO,
    TEXT_SURE_TO_DELETE_PROFILE,
    TEXT_YES
} from "../../lang/langText";
import {push} from "connected-react-router";
import {SETTINGS_CHOOSE_WISOR_ROUTE, SETTINGS_ROUTE} from "../routes";
import {Route, Switch} from 'react-router';
import ChooseWisorPage from "./ChooseWisorPage";
import {FaCheckCircle, FaSignOutAlt, FaTrash} from 'react-icons/fa';
import {chosenNickAcceptChanged, chosenNickChanged} from "../../redux/reducer/settings";
import _ from 'lodash';
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {INTRO_STEP_GO_TO_WISOR, INTRO_STEP_OPTIONS, INTRO_STEP_WISOR} from "../intro/introHelper";
import ScreenPage from "../../component/page/ScreenPage";
import SettingsFetchContainer from "./fetch/SettingsFetchContainer";
import request from "../../util/fetchHelper";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import gbFlag from '../../media/image/flag/GB.svg';
import plFlag from '../../media/image/flag/PL.svg';
import {ENGLISH, langChanged, POLISH} from "../../redux/reducer/language";
import {isCode1} from "../../util/repositoryHelper";

export const NAME_MAX_LENGTH = 20;

class SettingsPage extends React.PureComponent {

    handleLogoutClick = () => {
        request('/_logout', {});
    };

    handleDeleteProfileClick = () => {
        const {lang} = this.props;
        confirmAlert({
            title: getText(TEXT_CONFIRM_TO_SUBMIT, lang),
            message: getText(TEXT_SURE_TO_DELETE_PROFILE, lang),
            buttons: [
                {
                    label: getText(TEXT_YES, lang),
                    onClick: () => request('/profile/delete', {}).then(this.handleLogoutClick)
                },
                {
                    label: getText(TEXT_NO, lang),
                    // onClick: () => alert('Click No')
                }
            ]
        })
    };

    renderChangeLanguage() {
        return <div className='left boxShadow marginRem paddingRem'>
            <div>
                {getText(TEXT_CHANGE_LANGUAGE, this.props.lang)}
            </div>
            <div className='justifyCenter'>
                <img className='paddingRightRem cover pointer' alt='' src={gbFlag} height={25} width={40}
                     onClick={() => this.handleLanguageClick(ENGLISH)}/>
                <img className='cover pointer' alt='' src={plFlag} height={25} width={40}
                     onClick={() => this.handleLanguageClick(POLISH)}/>
            </div>
        </div>
    }

    handleLanguageClick = (lang) => {
        const {onLangChange} = this.props;
        request('/profile/changeLanguage', {lang}).then((json) => {
            if (isCode1(json)) {
                onLangChange(json.lang);
            }
        });
    };

    renderRight() {
        return <div className='right justifyCenter flexColumn'>
            {this.renderLogout()}
            {this.renderDeleteProfile()}
        </div>
    }

    renderLogout() {
        return <Button
            onClick={this.handleLogoutClick}
            className='marginRem'
            icon={<FaSignOutAlt/>}
            material={BUTTON_MATERIAL_BOX_SHADOW}>
            {getText(TEXT_LOGOUT, this.props.lang)}
        </Button>;
    }

    renderDeleteProfile() {
        return <Button
            onClick={this.handleDeleteProfileClick}
            className='marginRem'
            icon={<FaTrash/>}
            material={BUTTON_MATERIAL_BOX_SHADOW}>
            {getText(TEXT_DELETE_PROFILE, this.props.lang)}
        </Button>;
    }

    renderContent() {
        if (_.isNil(this.props.profile)) {
            return null;
        }
        return <div>
            {this.renderRight()}
            {this.renderActualNick()}
            {this.renderActualWisor()}
            {this.renderChangeLanguage()}
        </div>
    }

    renderActualWisor() {
        const {profile, screen, onRouteChange, lang} = this.props;
        return <div className={`right marginRem pointer boxShadow paddingRem ${INTRO_STEP_GO_TO_WISOR}`}
                    onClick={() => onRouteChange(SETTINGS_CHOOSE_WISOR_ROUTE)}>
            <div>{getText(TEXT_CHANGE_WISOR, lang)}</div>
            <div className='justifyCenter'>
                <img alt='' src={getWisor(profile.wisorType)}
                     height={screen.standardImgHeight * 2}
                     width={screen.standardImgHeight * 2}/>
            </div>
        </div>
    }

    renderActualNick() {
        const {profile, chosenNick, onChoose, onChooseAccept, lang} = this.props;
        if (_.isNil(profile)) {
            return null;
        }
        return <div className={`left marginRem boxShadow paddingRem ${INTRO_STEP_OPTIONS}`}>
            <div>{getText(TEXT_CHANGE_NICK, lang)}</div>
            <div className='justifyCenter'>
                <input maxLength={NAME_MAX_LENGTH} minLength={2} value={_.defaultTo(chosenNick, profile.name)}
                       onChange={onChoose}/>
                <FaCheckCircle className='pointer' onClick={onChooseAccept} size={20}/>
            </div>
            <div className='justifyCenter fontSize07Rem paddingTopRem'>
                {getText(TEXT_NAME_LENGTH, lang)}
            </div>
        </div>
    }

    render() {
        return <ScreenPage contentClassName={INTRO_STEP_WISOR}>
            <Switch>
                <Route exact path={SETTINGS_CHOOSE_WISOR_ROUTE} render={() => <ChooseWisorPage/>}/>
                <Route exact path={SETTINGS_ROUTE} render={() => this.renderContent()}/>
            </Switch>
            <SettingsFetchContainer/>
        </ScreenPage>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        lang: state.language.lang,
        profile: state.profile.profile,
        chosenNick: state.settings.chosenNick,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onChoose: (e) => {
            const value = e.target.value;
            if (value.length === 0 || /^[\w\S _]+$/.test(value)) {
                dispatch(chosenNickChanged(value));
            }
        },
        onChooseAccept: () => dispatch(chosenNickAcceptChanged(true)),
        onLangChange: (lang) => dispatch(langChanged(lang)),
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(SettingsPage);
