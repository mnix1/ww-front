import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {idChanged} from "../../redux/reducer/content";
import Back from "../../component/back/Back";
import PractisePage from "../practise/PractisePage";
import TopBar from "../../component/top-bar/TopBar";
import {OBJECT_APP_CHALLENGE, OBJECT_APP_FRIEND, OBJECT_APP_TRAINING, OBJECTS_APP} from "../object-group/objectsApp";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";
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

class App extends React.PureComponent {

    componentDidMount() {
        this.props.onInit(new CommunicationWebSocket());
    }

    renderContent() {
        const {contentId, screen, onContentIdChange} = this.props;
        if (contentId === undefined) {
            return <SimpleObjectGroup
                objects={OBJECTS_APP}
                onObjectClick={onContentIdChange}
                screen={screen}
            />;
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
        if (contentId === OBJECT_APP_CHALLENGE) {
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
        return <div className={styles.app}>
            <InvitedToBattleBy/>
            <InviteToBattle/>
            <div style={{height, width: contentWidth}} className={styles.content}>
                <TopBar/>
                {this.renderBack()}
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
            dispatch(idChanged(e.id));
        },
        onInit: (socket) => {
            socket.setDispatch(dispatch);
            dispatch(socketCreated(socket));
        }
    })
)(App);
