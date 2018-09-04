import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {getWisor} from "../../util/wisorHelper";
import {getText, TEXT_CHANGE_NICK, TEXT_CHANGE_WISOR, TEXT_NAME_LENGTH} from "../../lang/langText";
import {push} from "connected-react-router";
import {SETTINGS_CHOOSE_WISOR_ROUTE, SETTINGS_ROUTE} from "../routes";
import {Route, Switch} from 'react-router';
import ChooseWisorPage from "./ChooseWisorPage";
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import {chosenNickAcceptChanged, chosenNickChanged} from "../../redux/reducer/settings";
import _ from 'lodash';
import MeshBackground from "../../component/background/MeshBackground";

export const NAME_MAX_LENGTH = 20;

class SettingsPage extends React.PureComponent {

    renderContent() {
        return <div>
            {this.renderActualNick()}
            {this.renderActualWisor()}
        </div>
    }

    renderActualWisor() {
        const {profile, screen, onRouteChange} = this.props;
        return <div className='right marginRem pointer boxShadow paddingRem'
                    onClick={() => onRouteChange(SETTINGS_CHOOSE_WISOR_ROUTE)}>
            <div>{getText(TEXT_CHANGE_WISOR)}</div>
            <div className='justifyCenter'>
                <img alt='' src={getWisor(profile.wisorType)} height={screen.wisieImgHeight * 2}/>
            </div>
        </div>
    }

    renderActualNick() {
        const {profile, chosenNick, onChoose, onChooseAccept} = this.props;
        return <div className='left marginRem boxShadow paddingRem'>
            <div>{getText(TEXT_CHANGE_NICK)}</div>
            <div className='justifyCenter'>
                <input maxLength={NAME_MAX_LENGTH} minLength={2} value={_.defaultTo(chosenNick, profile.name)} onChange={onChoose}/>
                <FaCheckCircle className='pointer' onClick={onChooseAccept} size={20}/>
            </div>
            <div className='justifyCenter fontSize07Rem paddingTopRem'>
                {getText(TEXT_NAME_LENGTH)}
            </div>
        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className='page settingsPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <MeshBackground/>
            <div className='pageContent overflowAuto'>
                <Switch>
                    <Route exact path={SETTINGS_CHOOSE_WISOR_ROUTE} render={() => <ChooseWisorPage/>}/>
                    <Route exact path={SETTINGS_ROUTE} render={() => this.renderContent()}/>
                </Switch>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        chosenNick: state.settings.chosenNick,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onChoose: (e) => {
            const value = e.target.value;
            if (value.length === 0 || /^[a-zA-Z0-9 _]+$/.test(value)) {
                dispatch(chosenNickChanged(value));
            }
        },
        onChooseAccept: () => dispatch(chosenNickAcceptChanged(true)),
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(SettingsPage);
