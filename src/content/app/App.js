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
import {socketCreated} from "../../redux/reducer/socket";
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
    FRIEND_ROUTE,
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
import {
    RIVAL_STATUS_IN_PROGRESS,
    RIVAL_STATUS_READY_TO_BEGIN_FRIEND,
    RIVAL_STATUS_WAITING_FRIEND,
    RIVAL_STATUS_WAITING_RANDOM_OPPONENT,
    RIVAL_TYPE_BATTLE,
    RIVAL_TYPE_CAMPAIGN_WAR,
    RIVAL_TYPE_CHALLENGE,
    RIVAL_TYPE_WAR
} from "../../util/rivalHelper";
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

class App extends React.PureComponent {

    componentDidMount() {
        const socket = new CommunicationWebSocket();
        this.props.onInit(socket);
        this.rivalCommunication = new RivalCommunication(socket, this);
    }

    componentDidUpdate() {
        const {path, rivalStatus, rivalType, onRouteChange} = this.props;
        if (path === BATTLE_ROUTE) {
            if (rivalStatus === RIVAL_STATUS_WAITING_RANDOM_OPPONENT) {
                this.rivalCommunication.readyRandomOpponent(RIVAL_TYPE_BATTLE);
            } else if (rivalStatus === RIVAL_STATUS_READY_TO_BEGIN_FRIEND) {
                this.rivalCommunication.readyFriend(RIVAL_TYPE_BATTLE);
            }
        } else if (rivalStatus === RIVAL_STATUS_IN_PROGRESS && rivalType === RIVAL_TYPE_BATTLE) {
            onRouteChange(BATTLE_ROUTE);
        } else if (path === WAR_ROUTE) {
            if (rivalStatus === RIVAL_STATUS_WAITING_RANDOM_OPPONENT) {
                this.rivalCommunication.readyRandomOpponent(RIVAL_TYPE_WAR);
            } else if (rivalStatus === RIVAL_STATUS_READY_TO_BEGIN_FRIEND) {
                this.rivalCommunication.readyFriend(RIVAL_TYPE_WAR);
            }
        } else if (rivalStatus === RIVAL_STATUS_IN_PROGRESS && rivalType === RIVAL_TYPE_WAR) {
            onRouteChange(WAR_ROUTE);
        } else if (path === CAMPAIGN_WAR_ROUTE) {
            if (rivalStatus === RIVAL_STATUS_WAITING_RANDOM_OPPONENT) {
                this.rivalCommunication.readyRandomOpponent(RIVAL_TYPE_CAMPAIGN_WAR);
            }
        } else if (rivalStatus === RIVAL_STATUS_IN_PROGRESS && rivalType === RIVAL_TYPE_CAMPAIGN_WAR) {
            onRouteChange(CAMPAIGN_WAR_ROUTE);
        } else if (path === CHALLENGE_ROUTE) {
            if (rivalStatus === RIVAL_STATUS_WAITING_FRIEND) {
                this.rivalCommunication.readyFriend(RIVAL_TYPE_CHALLENGE);
            }
        } else if (rivalStatus === RIVAL_STATUS_IN_PROGRESS && rivalType === RIVAL_TYPE_CHALLENGE) {
            onRouteChange(CHALLENGE_ROUTE);
        }
    }

    componentWillUnmount() {
        this.rivalCommunication.dispose();
    }

    renderMenuItem(route, imgSrc) {
        const {screen, onRouteChange} = this.props;
        const iconHeight = screen.wisieImgHeight + 10;
        return <MenuItem onClick={onRouteChange} imgSrc={imgSrc} iconHeight={iconHeight} route={route}/>
    }

    renderMenu() {
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(PLAY_ROUTE, play)}
                    {this.renderMenuItem(FRIEND_ROUTE, friend)}
                    {this.renderMenuItem(PROFILE_ROUTE, wisie)}
                </div>
            </Menu>
            <Menu className='menuRight'>
                <div className='menuItems'>
                    {this.renderMenuItem(WISIES_ROUTE, owl)}
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

                <Route exact path={CAMPAIGN_WAR_ROUTE} render={() => <WarPage communication={this.rivalCommunication}/>}/>
                <Route path={CAMPAIGN_ROUTE} render={() => <CampaignPage/>}/>

                <Route path={TRAINING_ROUTE} render={() => <PractisePage/>}/>

                <Route exact path={CHALLENGE_FRIEND_INIT_ROUTE} render={() => <ChallengeFriendInit/>}/>
                <Route exact path={CHALLENGE_ROUTE} render={() => <WarPage communication={this.rivalCommunication}/>}/>

                <Route exact path={CHALLENGE_SUMMARY_ROUTE} render={() => <ChallengeSummaryPage/>}/>
                <Route exact path={CHALLENGE_LIST_ROUTE} render={() => <ChallengeListPage/>}/>
                <Route exact path={CHALLENGE_HISTORY_ROUTE} render={() => <ChallengeHistoryPage/>}/>

                <Route path={SETTINGS_ROUTE} render={() => <SettingsPage/>}/>
            </Switch>
        </ConnectedRouter>;
    }

    renderFetch() {
        const {friendListRep, path} = this.props;
        return <div>
            <ProfileFetch/>
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
        const isInRival = getSurrenderMsg(path) !== null;
        return <div className='showOption'>
            <FaCogs size={imgHeight} onClick={isInRival ? onOptionShowChange : () => onRouteChange(SETTINGS_ROUTE)}/>
        </div>;
    }

    render() {
        const {screen} = this.props;
        const {height, contentWidth} = screen;
        return <div className='app'>
            {this.renderShowOption()}
            <Option communication={this.rivalCommunication}/>
            <img alt='' src={background} height={screen.height} width={screen.width} className="fixedBackgroundMix"/>
            {this.canRenderInvitedToBattle() && <InvitedToBattleBy/>}
            <InviteToBattle/>
            <div style={{height, width: contentWidth}} className='content'>
                <TopBar/>
                {this.renderContent()}
                {/*<div style={{position: 'absolute', bottom: 0, right: 0, fontSize: 8}}>*/}
                {/*{JSON.stringify(screen)}*/}
                {/*</div>*/}
            </div>
            <WakeLock/>
            {this.renderFetch()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        friendListRep: state.repository.friendList,
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
            dispatch(socketCreated(socket));
        },
        onOptionShowChange: () => dispatch(optionShowChanged(true))
    })
)(App);
