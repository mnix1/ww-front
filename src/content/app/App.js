import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {idChanged} from "../../redux/reducer/content";
import Back from "../../component/back/Back";
import PractisePage from "../practise/PractisePage";
import TopBar from "../../component/top-bar/TopBar";
import {OBJECT_APP_FRIEND, OBJECT_APP_TRAINING, OBJECTS_APP} from "../object-group/objectsApp";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";
import FriendPage from "../friend/FriendPage";
import {OBJECT_BATTLE_FRIEND} from "../object-group/objectsBattle";
import FriendListFetch from "../friend/fetch/FriendListFetch";
import BattleFriendPage from "../battle/friend/BattleFriendPage";

class App extends React.PureComponent {

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
        if (contentId === OBJECT_BATTLE_FRIEND) {
            return <BattleFriendPage/>
        }
    }

    renderBack() {
        const {contentId} = this.props;
        if (contentId === undefined) {
            return null;
        }
        return <Back/>;
    }

    render() {
        const {screen, friendListRep} = this.props;
        const {height, contentWidth} = screen;
        return <div className={styles.app}>
            <div style={{height, width: contentWidth}} className={styles.content}>
                <TopBar/>
                {this.renderBack()}
                {this.renderContent()}
                <div style={{position: 'absolute', bottom: 0, right: 0, fontSize: 8}}>
                    {JSON.stringify(screen)}
                </div>
            </div>
            <FriendListFetch friendListRep={friendListRep}/>
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
        onContentIdChange: (e) => dispatch(idChanged(e.id)),
    })
)(App);
