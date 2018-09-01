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
import background from '../../media/image/background/backgroundWithHeroesProd.png';
import play from '../../media/image/menu/swordShield.svg';
import friend from '../../media/image/menu/friend.svg';
import shop from '../../media/image/menu/shop.png';
import wisie from '../../media/image/menu/wisie.svg';
import owl from '../../media/image/menu/owl.svg';
import {Route, Switch} from 'react-router'

import {ConnectedRouter, push} from 'connected-react-router'
import {
    APP_ROUTE,
    BATTLE_FAST_ROUTE,
    BATTLE_ROUTE,
    CHALLENGE_FAST_ROUTE,
    CHALLENGE_FRIEND_ROUTE,
    CHALLENGE_HISTORY_ROUTE,
    CHALLENGE_LIST_ROUTE,
    CHALLENGE_RESPONSE_ROUTE,
    CHALLENGE_SUMMARY_ROUTE,
    FRIEND_ROUTE, PLAY_BATTLE_ROUTE, PLAY_CHALLENGE_ROUTE,
    PLAY_ROUTE, PLAY_TRAINING_ROUTE, PLAY_WAR_ROUTE,
    PROFILE_ROUTE,
    SHOP_ROUTE,
    TRAINING_ROUTE,
    TRAINING_TASK_ROUTE,
    WAR_FAST_ROUTE,
    WAR_ROUTE,
    WISIES_ROUTE
} from "../routes";
import ChallengeFriendPage from "../challenge/create/ChallengeFriendPage";
import ChallengeResponsePage from "../challenge/create/ChallengeResponsePage";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import PlayPage from "../play/PlayPage";
import ChallengeListPage from "../challenge/list/ChallengeListPage";
import ChallengeFetchContainer from "../challenge/fetch/ChallengeFetchContainer";
import ChallengeHistoryPage from "../challenge/list/ChallengeHistoryPage";
import ChallengeSummaryPage from "../challenge/list/ChallengeSummaryPage";
import BattlePage from "../rival/battle/page/BattlePage";
import ChallengeFastPage from "../challenge/create/ChallengeFastPage";
import HeroPage from "../hero/HeroPage";
import ShopPage from "../shop/ShopPage";
import ShopFetchContainer from "../shop/fetch/ShopFetchContainer";
import ProfilePage from "../profile/ProfilePage";
import ProfileFetchContainer from "../profile/fetch/ProfileFetchContainer";
import ProfileFetch from "./ProfileFetch";
import HeroFetchContainer from "../hero/fetch/HeroFetchContainer";
import WakeLock from "../../component/wake-lock/WakeLock";
import WarPage from "../rival/war/page/WarPage";
import RivalCommunication from "../rival/RivalCommunication";
import RivalFetchContainer from "../rival/fetch/RivalFetchContainer";
import {
    RIVAL_STATUS_IN_PROGRESS,
    RIVAL_STATUS_READY_TO_BEGIN_FRIEND,
    RIVAL_STATUS_WAITING_FAST,
    RIVAL_TYPE_BATTLE,
    RIVAL_TYPE_WAR
} from "../../util/rivalHelper";
import RivalFastPage from "../rival/RivalFastPage";
import PlayWarPage from "../play/PlayWarPage";
import PlayBattlePage from "../play/PlayBattlePage";
import PlayChallengePage from "../play/PlayChallengePage";

class App extends React.PureComponent {

    componentDidMount() {
        const socket = new CommunicationWebSocket();
        this.props.onInit(socket);
        this.rivalCommunication = new RivalCommunication(socket);
    }

    componentDidUpdate() {
        const {path, rivalStatus, rivalType, onRouteChange} = this.props;
        if (path === BATTLE_ROUTE) {
            if (rivalStatus === RIVAL_STATUS_WAITING_FAST) {
                this.rivalCommunication.battleReadyFast();
            } else if (rivalStatus === RIVAL_STATUS_READY_TO_BEGIN_FRIEND) {
                this.rivalCommunication.battleReady();
            }
        } else if (rivalStatus === RIVAL_STATUS_IN_PROGRESS && rivalType === RIVAL_TYPE_BATTLE) {
            onRouteChange(BATTLE_ROUTE);
        } else if (path === WAR_ROUTE) {
            if (rivalStatus === RIVAL_STATUS_WAITING_FAST) {
                this.rivalCommunication.warReadyFast();
            } else if (rivalStatus === RIVAL_STATUS_READY_TO_BEGIN_FRIEND) {
                this.rivalCommunication.warReady();
            }
        } else if (rivalStatus === RIVAL_STATUS_IN_PROGRESS && rivalType === RIVAL_TYPE_WAR) {
            onRouteChange(WAR_ROUTE);
        }
    }

    componentWillUnmount() {
        this.rivalCommunication.dispose();
    }

    renderMenuItem(route, imgSrc) {
        const {screen, onRouteChange} = this.props;
        const iconHeight = screen.heroImgHeight + 10;
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
                <Route path={WISIES_ROUTE} render={() => <HeroPage/>}/>
                <Route exact path={SHOP_ROUTE} render={() => <ShopPage/>}/>

                <Route exact path={PLAY_WAR_ROUTE} render={() => <PlayWarPage/>}/>
                <Route exact path={PLAY_BATTLE_ROUTE} render={() => <PlayBattlePage/>}/>
                <Route exact path={PLAY_CHALLENGE_ROUTE} render={() => <PlayChallengePage/>}/>
                {/*<Route exact path={PLAY_TRAINING_ROUTE} render={() => <PlayTrainingPage/>}/>*/}

                <Route exact path={WAR_ROUTE} render={() => <WarPage communication={this.rivalCommunication}/>}/>
                <Route exact path={WAR_FAST_ROUTE} render={() => <RivalFastPage/>}/>

                <Route exact path={BATTLE_ROUTE} render={() => <BattlePage communication={this.rivalCommunication}/>}/>
                <Route exact path={BATTLE_FAST_ROUTE} render={() => <RivalFastPage/>}/>

                <Route path={TRAINING_ROUTE} render={() => <PractisePage/>}/>

                <Route exact path={CHALLENGE_FRIEND_ROUTE} render={() => <ChallengeFriendPage/>}/>
                <Route exact path={CHALLENGE_RESPONSE_ROUTE} render={() => <ChallengeResponsePage/>}/>

                <Route exact path={CHALLENGE_FAST_ROUTE} render={() => <ChallengeFastPage/>}/>
                <Route exact path={CHALLENGE_SUMMARY_ROUTE} render={() => <ChallengeSummaryPage/>}/>
                <Route exact path={CHALLENGE_LIST_ROUTE} render={() => <ChallengeListPage/>}/>
                <Route exact path={CHALLENGE_HISTORY_ROUTE} render={() => <ChallengeHistoryPage/>}/>
            </Switch>
        </ConnectedRouter>;
    }

    renderFetch() {
        const {friendListRep, path} = this.props;
        return <div>
            <ProfileFetch/>
            <FriendListFetch path={path} friendListRep={friendListRep}/>
            <RivalFetchContainer/>
            <ChallengeFetchContainer/>
            <HeroFetchContainer/>
            <ShopFetchContainer/>
            <ProfileFetchContainer/>
        </div>
    }

    canRenderInvitedToBattle() {
        const {path} = this.props;
        return path !== BATTLE_ROUTE
            && path !== WAR_ROUTE
            && path !== TRAINING_TASK_ROUTE
            && path !== CHALLENGE_FAST_ROUTE
            && path !== CHALLENGE_RESPONSE_ROUTE
            && path !== CHALLENGE_FRIEND_ROUTE;
    }

    render() {
        const {screen} = this.props;
        const {height, contentWidth} = screen;
        return <div className='app'>
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
        }
    })
)(App);
