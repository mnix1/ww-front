import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import PractisePage from "../practise/PractisePage";
import TopBar from "../../component/top-bar/TopBar";
import FriendPage from "../friend/FriendPage";
import FriendListFetch from "../friend/fetch/FriendListFetch";
import CommunicationWebSocket from "./CommunicationWebSocket";
import {socketCreated} from "../../redux/reducer/socket";
import InvitedToBattleBy from "../battle/invite/InvitedToBattleBy";
import InviteToBattle from "../battle/invite/InviteToBattle";
import BattleFetchContainer from "../battle/fetch/BattleFetchContainer";
import background from '../../media/image/background/backgroundWithHeroesProd.png';
import play from '../../media/image/icon/play.svg';
import friend from '../../media/image/icon/friend.svg';
import practise from '../../media/image/icon/practise.svg';
import shop from '../../media/image/icon/shop.svg';
import wisie from '../../media/image/icon/wisie.svg';
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
    FRIEND_ROUTE,
    PLAY_ROUTE,
    SHOP_ROUTE,
    TRAINING_ROUTE,
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
import BattlePage from "../battle/page/BattlePage";
import ChallengeFastPage from "../challenge/create/ChallengeFastPage";
import BattleFastPage from "../battle/fast/BattleFastPage";
import BattleCommunication from "../battle/BattleCommunication";
import {
    BATTLE_STATUS_IN_PROGRESS,
    BATTLE_STATUS_READY_TO_BEGIN_FRIEND,
    BATTLE_STATUS_WAITING_FAST,
} from "../../util/battleHelper";
import HeroPage from "../hero/HeroPage";
import HeroListFetch from "../hero/HeroListFetch";
import ShopPage from "../shop/ShopPage";
import ShopFetchContainer from "../shop/fetch/ShopFetchContainer";

class App extends React.PureComponent {

    componentDidMount() {
        const socket = new CommunicationWebSocket();
        this.props.onInit(socket);
        this.communication = new BattleCommunication(socket);
    }

    componentDidUpdate() {
        const {path, battleStatus, onRouteChange} = this.props;
        if (path === BATTLE_ROUTE) {
            if (battleStatus === BATTLE_STATUS_WAITING_FAST) {
                this.communication.readyFast();
            } else if (battleStatus === BATTLE_STATUS_READY_TO_BEGIN_FRIEND) {
                this.communication.ready();
            }
        } else if (battleStatus === BATTLE_STATUS_IN_PROGRESS) {
            onRouteChange(BATTLE_ROUTE);
        }
    }

    componentWillUnmount() {
        this.communication.dispose();
    }

    renderMenuItem(route, imgSrc) {
        const {screen, onRouteChange} = this.props;
        const iconWidth = Math.max(Math.min(screen.width / 8, 70), 40);
        return <MenuItem onClick={onRouteChange} imgSrc={imgSrc} iconWidth={iconWidth} route={route}/>
    }

    renderMenu() {
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(PLAY_ROUTE, play)}
                    {this.renderMenuItem(FRIEND_ROUTE, friend)}
                </div>
            </Menu>
            <Menu className='menuRight'>
                <div className='menuItems'>
                    {this.renderMenuItem(WISIES_ROUTE, wisie)}
                    {this.renderMenuItem(SHOP_ROUTE, shop)}
                    {this.renderMenuItem(TRAINING_ROUTE, practise)}
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
                <Route path={TRAINING_ROUTE} render={() => <PractisePage/>}/>
                <Route exact path={CHALLENGE_FRIEND_ROUTE} render={() => <ChallengeFriendPage/>}/>
                <Route exact path={CHALLENGE_RESPONSE_ROUTE} render={() => <ChallengeResponsePage/>}/>
                <Route exact path={BATTLE_ROUTE} render={() => <BattlePage communication={this.communication}/>}/>
                <Route exact path={BATTLE_FAST_ROUTE} render={() => <BattleFastPage/>}/>
                <Route exact path={CHALLENGE_FAST_ROUTE} render={() => <ChallengeFastPage/>}/>
                <Route exact path={CHALLENGE_SUMMARY_ROUTE} render={() => <ChallengeSummaryPage/>}/>
                <Route exact path={CHALLENGE_LIST_ROUTE} render={() => <ChallengeListPage/>}/>
                <Route exact path={CHALLENGE_HISTORY_ROUTE} render={() => <ChallengeHistoryPage/>}/>
                <Route exact path={WISIES_ROUTE} render={() => <HeroPage/>}/>
                <Route exact path={SHOP_ROUTE} render={() => <ShopPage/>}/>
            </Switch>
        </ConnectedRouter>;
    }

    renderFetch() {
        const {friendListRep, path} = this.props;
        return <div>
            <FriendListFetch path={path} friendListRep={friendListRep}/>
            <BattleFetchContainer/>
            <ChallengeFetchContainer/>
            <HeroListFetch path={path}/>
            <ShopFetchContainer/>
        </div>
    }

    render() {
        const {screen} = this.props;
        const {height, contentWidth} = screen;
        return <div className='app'>
            <img alt='' src={background} height={screen.height} width={screen.width} className="background"/>
            <InvitedToBattleBy/>
            <InviteToBattle/>
            <div style={{height, width: contentWidth}} className='content'>
                <TopBar/>
                {this.renderContent()}
                {/*<div style={{position: 'absolute', bottom: 0, right: 0, fontSize: 8}}>*/}
                {/*{JSON.stringify(screen)}*/}
                {/*</div>*/}
            </div>
            {this.renderFetch()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        friendListRep: state.repository.friendList,
        battleStatus: state.battle.status,
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
