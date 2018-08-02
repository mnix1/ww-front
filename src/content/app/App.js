import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import {idChanged} from "../../redux/reducer/content";
import Back from "../../component/back/Back";
import PractisePage from "../practise/PractisePage";
import TopBar from "../../component/top-bar/TopBar";
import {
    OBJECT_APP_BATTLE,
    OBJECT_APP_FRIEND,
    OBJECT_APP_HISTORY, OBJECT_APP_SHOP,
    OBJECT_APP_TRAINING, OBJECT_APP_WISIES,
} from "../object-group/objectsApp";
import FriendPage from "../friend/FriendPage";
import {OBJECT_CHALLENGE_FRIEND, OBJECT_CHALLENGE_LIST} from "../object-group/objectsChallenge";
import FriendListFetch from "../friend/fetch/FriendListFetch";
import ChallengeFriendPage from "../challenge/friend/ChallengeFriendPage";
import ChallengePage from "../challenge/ChallengePage";
import ChallengeListPage from "../challenge/list/ChallengeListPage";
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

class App extends React.PureComponent {

    componentDidMount() {
        this.props.onInit(new CommunicationWebSocket());
    }

    renderMenu() {
        const {screen, onContentIdChange} = this.props;
        const iconWidth = Math.max(Math.min(screen.width / 8, 70), 40);
        return <div>
            <div className='menu menuLeft'>
                <div className='menuBackground'/>
                <div className='menuItems'>
                    <div onClick={() => onContentIdChange(OBJECT_APP_BATTLE)} className='menuItem'><img src={battle} width={iconWidth}/><span>{getObjectLabel(OBJECT_APP_BATTLE)}</span></div>
                    <div onClick={() => onContentIdChange(OBJECT_APP_FRIEND)} className='menuItem'><img src={friend} width={iconWidth}/><span>{getObjectLabel(OBJECT_APP_FRIEND)}</span></div>
                </div>
            </div>
            <div className='menu menuRight'>
                <div className='menuBackground'/>
                <div className='menuItems'>
                    <div onClick={() => onContentIdChange(OBJECT_APP_WISIES)} className='menuItem'><img src={wisie} width={iconWidth}/><span>{getObjectLabel(OBJECT_APP_WISIES)}</span></div>
                    <div onClick={() => onContentIdChange(OBJECT_APP_SHOP)} className='menuItem'><img src={shop} width={iconWidth}/><span>{getObjectLabel(OBJECT_APP_SHOP)}</span></div>
                    <div onClick={() => onContentIdChange(OBJECT_APP_TRAINING)} className='menuItem'><img src={practise} width={iconWidth}/><span>{getObjectLabel(OBJECT_APP_TRAINING)}</span></div>
                </div>
            </div>
        </div>;
    }

    renderContent() {
        const {contentId, screen, onContentIdChange} = this.props;
        if (contentId === undefined) {
            return this.renderMenu();
        }
        if (contentId === OBJECT_BATTLE) {
            return <BattlePage/>
        }
        if (contentId === OBJECT_APP_TRAINING) {
            return <PractisePage/>
        }
        if (contentId === OBJECT_APP_FRIEND) {
            return <FriendPage/>
        }
        if (contentId === OBJECT_CHALLENGE_FRIEND) {
            return <ChallengeFriendPage/>
        }
        if (contentId === OBJECT_CHALLENGE_LIST) {
            return <ChallengeListPage/>
        }
        if (contentId === OBJECT_APP_BATTLE) {
            return <ChallengePage/>
        }
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
        contentId: state.content.id,
    }),
    (dispatch) => ({
        onContentIdChange: (e) => {
            dispatch(idChanged(e));
        },
        onInit: (socket) => {
            socket.setDispatch(dispatch);
            dispatch(socketCreated(socket));
        }
    })
)(App);
