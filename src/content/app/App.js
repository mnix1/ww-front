import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import Back from "../../component/back/Back";
import PractisePage from "../practise/PractisePage";
import TopBar from "../../component/top-bar/TopBar";
import FriendPage from "../friend/FriendPage";
import FriendListFetch from "../friend/fetch/FriendListFetch";
import CommunicationWebSocket from "./CommunicationWebSocket";
import {socketCreated} from "../../redux/reducer/socket";
import InvitedToBattleBy from "../battle/invite/InvitedToBattleBy";
import InviteToBattle from "../battle/invite/InviteToBattle";
import BattleFetchContainer from "../battle/friend/fetch/BattleFetchContainer";
import {OBJECT_BATTLE} from "../object-group/objectsBattle";
import BattlePage from "../battle/friend/BattlePage";
import background from '../../media/image/background/backgroundWithHeroesProd.png';
import battle from '../../media/image/icon/battle.svg';
import friend from '../../media/image/icon/friend.svg';
import practise from '../../media/image/icon/practise.svg';
import shop from '../../media/image/icon/shop.svg';
import wisie from '../../media/image/icon/wisie.svg';
import {getObjectLabel} from "../../lang";
import {Route, Switch} from 'react-router' // react-router v4
import {ConnectedRouter, push} from 'connected-react-router'
import {BATTLE_ROUTE, FRIEND_ROUTE, SHOP_ROUTE, TRAINING_ROUTE, WISIES_ROUTE} from "./appRoutes";

class App extends React.PureComponent {

    componentDidMount() {
        this.props.onInit(new CommunicationWebSocket());
    }

    renderMenuItem(path, imgSrc) {
        const {screen, onContentIdChange} = this.props;
        const iconWidth = Math.max(Math.min(screen.width / 8, 70), 40);
        return <div onClick={() => onContentIdChange(path)} className='menuItem'>
            <img src={imgSrc} width={iconWidth}/><span>{getObjectLabel(path)}</span>
        </div>
    }

    renderMenu() {
        return <div>
            <div className='menu menuLeft'>
                <div className='menuBackground'/>
                <div className='menuItems'>
                    {this.renderMenuItem(BATTLE_ROUTE, battle)}
                    {this.renderMenuItem(FRIEND_ROUTE, friend)}
                </div>
            </div>
            <div className='menu menuRight'>
                <div className='menuBackground'/>
                <div className='menuItems'>
                    {this.renderMenuItem(WISIES_ROUTE, wisie)}
                    {this.renderMenuItem(SHOP_ROUTE, shop)}
                    {this.renderMenuItem(TRAINING_ROUTE, practise)}
                </div>
            </div>
        </div>;
    }

    renderContent() {
        const {contentId, screen, onContentIdChange, history} = this.props;
        // if (contentId === undefined) {
        //     return this.renderMenu();
        // }
        return <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route exact path="/" render={() => this.renderMenu()}/>
                    <Route path={BATTLE_ROUTE} render={() => <BattlePage/>}/>
                    <Route path={FRIEND_ROUTE} render={() => <FriendPage/>}/>
                    <Route path={TRAINING_ROUTE} render={() => <PractisePage/>}/>
                </Switch>
            </div>
        </ConnectedRouter>;
        // if (contentId === OBJECT_BATTLE) {
        //     return <BattlePage/>
        // }
        // if (contentId === OBJECT_APP_TRAINING) {
        //     return <PractisePage/>
        // }
        // if (contentId === OBJECT_APP_FRIEND) {
        //     return <FriendPage/>
        // }
        // if (contentId === OBJECT_CHALLENGE_FRIEND) {
        //     return <ChallengeFriendPage/>
        // }
        // if (contentId === OBJECT_CHALLENGE_LIST) {
        //     return <ChallengeListPage/>
        // }
        // if (contentId === OBJECT_APP_BATTLE) {
        //     return <ChallengePage/>
        // }
    }

    renderBack() {
        const {contentId} = this.props;
        if (contentId === undefined) {
            return null;
        }
        return <Back/>;
    }

    renderFetch() {
        const {friendListRep, contentId} = this.props;
        return <div>
            <FriendListFetch contentId={contentId} friendListRep={friendListRep}/>
            <BattleFetchContainer/>
        </div>
    }

    render() {
        const {screen} = this.props;
        const {height, contentWidth} = screen;
        return <div className='app'>
            <img src={background} height={screen.height} width={screen.width} className="background"/>
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
    }),
    (dispatch) => ({
        onContentIdChange: (e) => {
            dispatch(push(e));
        },
        onInit: (socket) => {
            socket.setDispatch(dispatch);
            dispatch(socketCreated(socket));
        }
    })
)(App);
