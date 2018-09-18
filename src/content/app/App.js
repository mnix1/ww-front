import React from 'react';
import './styles.css';
import './commonStyles.css';
import './pageStyles.css';
import {connect} from 'react-redux';
import PractisePage from "../practise/PractisePage";
import TopBar from "../../component/top-bar/TopBar";
import FriendPage from "../friend/FriendPage";
import FriendListFetch from "../friend/fetch/FriendListFetch";
import CommunicationWebSocket from "./CommunicationWebSocket";
import InvitedToBattleBy from "../rival/invite/InvitedToRivalBy";
import InviteToBattle from "../rival/invite/InviteToRival";
import background from '../../media/image/background/backgroundWithWisiesProd.jpg';
import play from '../../media/image/menu/swordShield.svg';
import friend from '../../media/image/menu/friend.svg';
import shop from '../../media/image/menu/shop.png';
import wisie from '../../media/image/menu/robot.svg';
import owl from '../../media/image/menu/owl.svg';
import {Route, Switch} from 'react-router'
import {FaCogs} from "react-icons/fa";
import {ConnectedRouter, push} from 'connected-react-router'
import {
    APP_ROUTE,
    BATTLE_FAST_ROUTE,
    BATTLE_RANKING_ROUTE,
    BATTLE_ROUTE,
    CAMPAIGN_ROUTE,
    CAMPAIGN_WAR_ROUTE,
    CHALLENGE_FRIEND_INIT_ROUTE,
    CHALLENGE_HISTORY_ROUTE,
    CHALLENGE_LIST_ROUTE,
    CHALLENGE_RESPONSE_ROUTE,
    CHALLENGE_ROUTE,
    CHALLENGE_SUMMARY_ROUTE,
    CLASSIFICATION_BATTLE_ROUTE,
    CLASSIFICATION_WAR_ROUTE,
    FRIEND_ROUTE,
    LOGIN_ROUTE,
    PLAY_BATTLE_ROUTE,
    PLAY_CHALLENGE_ROUTE,
    PLAY_ROUTE,
    PLAY_WAR_ROUTE,
    PROFILE_ROUTE,
    SETTINGS_ROUTE,
    SHOP_ROUTE,
    TRAINING_ROUTE,
    TRAINING_TASK_ROUTE,
    WAR_FAST_ROUTE,
    WAR_RANKING_ROUTE,
    WAR_ROUTE,
    WISIES_ROUTE
} from "../routes";
import ChallengeFriendInit from "../challenge/create/ChallengeFriendInit";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import PlayPage from "../play/PlayPage";
import ChallengeListPage from "../challenge/list/ChallengeListPage";
import ChallengeFetchContainer from "../challenge/fetch/ChallengeFetchContainer";
import ChallengeHistoryPage from "../challenge/list/ChallengeHistoryPage";
import ChallengeSummaryPage from "../challenge/list/ChallengeSummaryPage";
import BattlePage from "../rival/battle/page/BattlePage";
import WisiePage from "../wisie/WisiePage";
import ShopPage from "../shop/ShopPage";
import ShopFetchContainer from "../shop/fetch/ShopFetchContainer";
import ProfilePage from "../profile/ProfilePage";
import ProfileFetchContainer from "../profile/fetch/ProfileFetchContainer";
import ProfileFetch from "./ProfileFetch";
import WisieFetchContainer from "../wisie/fetch/WisieFetchContainer";
import WakeLock from "../../component/wake-lock/WakeLock";
import WarPage from "../rival/war/page/WarPage";
import RivalCommunication from "../rival/RivalCommunication";
import RivalFetchContainer from "../rival/fetch/RivalFetchContainer";
import {RIVAL_STATUS_IN_PROGRESS, RIVAL_TYPE_ROUTE} from "../../util/rivalHelper";
import PlayWarPage from "../play/PlayWarPage";
import PlayBattlePage from "../play/PlayBattlePage";
import PlayChallengePage from "../play/PlayChallengePage";
import Option, {getSurrenderMsg} from "../../component/option/Option";
import {optionShowChanged} from "../../redux/reducer/option";
import SettingsPage from "../settings/SettingsPage";
import SettingsFetchContainer from "../settings/fetch/SettingsFetchContainer";
import RivalSearchOpponentPage from "../rival/RivalSearchOpponentPage";
import CampaignFetchContainer from "../campaign/fetch/CampaignFetchContainer";
import CampaignPage from "../campaign/CampaignPage";
import _ from 'lodash';
import Modal from "../../component/modal/Modal";
import {socketChanged} from "../../redux/reducer/socket";
import {ERROR_CONNECTION_PROBLEM, getError} from "../../lang/langError";
import LoginPage from "../../component/auth/LoginPage";
import {repFulfilled} from "../../util/repositoryHelper";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {getText, TEXT_RECONNECT} from "../../lang/langText";
import {Loading} from "../../component/loading/Loading";
import ClassificationPage from "../rival/classification/ClassificationPage";
import Intro from "../intro/Intro";
import {INTRO_STEP_GO_TO_OPTIONS, INTRO_STEP_GO_TO_PROFILE, INTRO_STEP_GO_TO_WISIES} from "../intro/introHelper";
import IntroUpdate from "../intro/IntroUpdate";

class App extends React.PureComponent {

    componentDidMount() {
        if (this.maybeRedirectToLogin()) {
            return;
        }
        this.maybeInitSocket();
    }

    maybeInitSocket() {
        const {onInit, socket, profileRep} = this.props;
        if (repFulfilled(profileRep) && _.isNil(socket)) {
            const socket = new CommunicationWebSocket(onInit);
            this.rivalCommunication = new RivalCommunication(socket, this);
        }
    }

    maybeRedirectToLogin() {
        const {onRouteChange, profileRep, path} = this.props;
        if (profileRep && profileRep.rejected && !profileRep.pending && path !== LOGIN_ROUTE) {
            onRouteChange(LOGIN_ROUTE);
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        if (this.maybeRedirectToLogin()) {
            return;
        }
        this.maybeInitSocket();
        const {path, rivalStatus, rivalType, onRouteChange} = this.props;
        if (_.isNil(rivalStatus)) {
            return;
        }
        const routeFromRivalType = RIVAL_TYPE_ROUTE[rivalType];
        if (rivalStatus === RIVAL_STATUS_IN_PROGRESS && path !== routeFromRivalType) {
            onRouteChange(routeFromRivalType);
        }
    }

    componentWillUnmount() {
        this.rivalCommunication.dispose();
    }

    renderMenuItem(route, imgSrc, className) {
        const {screen, lang, onRouteChange} = this.props;
        const iconHeight = screen.wisieImgHeight + 10;
        return <MenuItem className={className} onClick={onRouteChange} lang={lang} imgSrc={imgSrc}
                         iconHeight={iconHeight} route={route}/>
    }

    renderMenu() {
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(PLAY_ROUTE, play)}
                    {this.renderMenuItem(FRIEND_ROUTE, friend)}
                    {this.renderMenuItem(PROFILE_ROUTE, wisie, INTRO_STEP_GO_TO_PROFILE)}
                </div>
            </Menu>
            <Menu className='menuRight'>
                <div className='menuItems'>
                    {this.renderMenuItem(WISIES_ROUTE, owl, INTRO_STEP_GO_TO_WISIES)}
                    {this.renderMenuItem(SHOP_ROUTE, shop)}
                </div>
            </Menu>
        </div>;
    }

    renderContent() {
        const {history} = this.props;
        return <ConnectedRouter history={history}>
            <Switch>
                <Route exact path={APP_ROUTE} render={() => this.renderMenu()}/>
                <Route exact path={PLAY_ROUTE} render={() => <PlayPage/>}/>
                <Route exact path={FRIEND_ROUTE} render={() => <FriendPage/>}/>
                <Route exact path={PROFILE_ROUTE} render={() => <ProfilePage/>}/>
                <Route path={WISIES_ROUTE} render={() => <WisiePage/>}/>
                <Route exact path={SHOP_ROUTE} render={() => <ShopPage/>}/>

                <Route exact path={PLAY_WAR_ROUTE} render={() => <PlayWarPage/>}/>
                <Route exact path={PLAY_BATTLE_ROUTE} render={() => <PlayBattlePage/>}/>
                <Route exact path={PLAY_CHALLENGE_ROUTE} render={() => <PlayChallengePage/>}/>

                <Route exact path={WAR_ROUTE} render={() => <WarPage communication={this.rivalCommunication}/>}/>
                <Route exact path={WAR_FAST_ROUTE} render={() => <RivalSearchOpponentPage/>}/>
                <Route exact path={WAR_RANKING_ROUTE} render={() => <RivalSearchOpponentPage/>}/>

                <Route exact path={BATTLE_ROUTE} render={() => <BattlePage communication={this.rivalCommunication}/>}/>
                <Route exact path={BATTLE_FAST_ROUTE} render={() => <RivalSearchOpponentPage/>}/>
                <Route exact path={BATTLE_RANKING_ROUTE} render={() => <RivalSearchOpponentPage/>}/>

                <Route exact path={CAMPAIGN_WAR_ROUTE}
                       render={() => <WarPage communication={this.rivalCommunication}/>}/>
                <Route path={CAMPAIGN_ROUTE} render={() => <CampaignPage/>}/>

                <Route path={TRAINING_ROUTE} render={() => <PractisePage/>}/>

                <Route exact path={CHALLENGE_FRIEND_INIT_ROUTE} render={() => <ChallengeFriendInit/>}/>
                <Route exact path={CHALLENGE_ROUTE} render={() => <WarPage communication={this.rivalCommunication}/>}/>

                <Route exact path={CHALLENGE_SUMMARY_ROUTE} render={() => <ChallengeSummaryPage/>}/>
                <Route exact path={CHALLENGE_LIST_ROUTE} render={() => <ChallengeListPage/>}/>
                <Route exact path={CHALLENGE_HISTORY_ROUTE} render={() => <ChallengeHistoryPage/>}/>

                <Route exact path={CLASSIFICATION_WAR_ROUTE} render={() => <ClassificationPage/>}/>
                <Route exact path={CLASSIFICATION_BATTLE_ROUTE} render={() => <ClassificationPage/>}/>

                <Route path={SETTINGS_ROUTE} render={() => <SettingsPage/>}/>

                <Route path={LOGIN_ROUTE} render={() => <LoginPage/>}/>
            </Switch>
        </ConnectedRouter>;
    }

    renderFetch() {
        const {friendListRep, path} = this.props;
        return <div>
            <FriendListFetch path={path} friendListRep={friendListRep}/>
            <SettingsFetchContainer/>
            <CampaignFetchContainer/>
            <RivalFetchContainer/>
            <ChallengeFetchContainer/>
            <WisieFetchContainer/>
            <ShopFetchContainer/>
            <ProfileFetchContainer/>
        </div>
    }

    canRenderInvitedToBattle() {
        const {path} = this.props;
        return path !== BATTLE_ROUTE
            && path !== WAR_ROUTE
            && path !== CAMPAIGN_WAR_ROUTE
            && path !== TRAINING_TASK_ROUTE
            && path !== CHALLENGE_ROUTE
            && path !== CHALLENGE_RESPONSE_ROUTE
            && path !== CHALLENGE_FRIEND_INIT_ROUTE;
    }

    renderShowOption() {
        const {onOptionShowChange, onRouteChange, screen, path} = this.props;
        if (path === SETTINGS_ROUTE) {
            return null;
        }
        const imgHeight = screen.isSmallHeight ? 30 : 40;
        const isInRival = !_.isNil(getSurrenderMsg(path));
        return <div className={`showOption ${INTRO_STEP_GO_TO_OPTIONS}`}>
            <FaCogs size={imgHeight} onClick={isInRival ? onOptionShowChange : () => onRouteChange(SETTINGS_ROUTE)}/>
        </div>;
    }

    renderBackground() {
        const {screen} = this.props;
        return <img alt='' src={background} height={screen.height} width={screen.width}
                    className="fixedBackgroundMix"/>;
    }

    renderConnectionProblem() {
        const {socket} = this.props;
        return <Modal renderExit={false}>
            <div>
                {getError(ERROR_CONNECTION_PROBLEM)}
            </div>
            <div className='marginTopRem justifyCenter paddingTopRem'>
                <div className='justifyCenter flexColumn'>
                    <Button material={BUTTON_MATERIAL_BOX_SHADOW} onClick={() => {
                        if (!_.isNil(socket)) {
                            socket.init();
                        }
                    }}>{getText(TEXT_RECONNECT)}</Button>
                </div>
                <Loading/>
            </div>
        </Modal>
    }

    renderLogged() {
        const {enable} = this.props;
        return <div>
            {enable && <div>
                {/*<IntroUpdate/>*/}
                {/*<Intro/>*/}
            </div>}
            {this.renderShowOption()}
            <Option communication={this.rivalCommunication}/>
            {this.canRenderInvitedToBattle() && <InvitedToBattleBy/>}
            <InviteToBattle/>
            {this.renderFetch()}
        </div>;
    }

    render() {
        const {screen, socketOpen, profile, path} = this.props;
        const {height, contentWidth} = screen;
        return <div className='app'>
            {this.renderBackground()}
            {profile && this.renderLogged()}
            <div style={{height, width: contentWidth}} className='content'>
                <TopBar/>
                {profile && !socketOpen && this.renderConnectionProblem()}
                {socketOpen && this.renderContent()}
            </div>
            <ProfileFetch path={path}/>
            <WakeLock/>
            {/*<Bot communication={this.rivalCommunication} {...BOTS[window.name]}/>*/}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        lang: state.language.lang,
        socket: state.socket.socket,
        enable: state.intro.enable,
        socketOpen: state.socket.open,
        friendListRep: state.repository.friendList,
        profileRep: state.repository.profile,
        rivalStatus: state.rival.status,
        rivalType: state.rival.rivalType,
        profile: state.profile.profile,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onRouteChange: (e) => {
            dispatch(push(e));
        },
        onInit: (socket) => {
            socket.setDispatch(dispatch);
            dispatch(socketChanged(socket));
        },
        onOptionShowChange: () => dispatch(optionShowChanged(true))
    })
)(App);
