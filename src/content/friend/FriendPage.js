import React from 'react';
import {connect} from 'react-redux';
import {clearFriendListFetch} from "./fetch/FriendListFetch";
import styles from './styles.css';
import request from './../../util/fetchHelper';
import {
    getText,
    TEXT_FRIENDS,
} from "../../lang";
import {tagChanged} from "../../redux/reducer/friend";
import AddFriendFetch, {clearAddFriendFetch} from "./fetch/AddFriendFetch";
import {idChanged} from "../../redux/reducer/content";
import {tagsChanged} from "../../redux/reducer/battle";
import {OBJECT_BATTLE_FRIEND} from "../object-group/objectsBattle";
import {Friend} from "../../component/friend/Friend";
import {AddFriend} from "../../component/friend/AddFriend";

class FriendPage extends React.PureComponent {

    renderActualFriends() {
        const {friendListRep} = this.props;
        if (!friendListRep || friendListRep.pending) {
            return 'LOADING'
        }
        if (friendListRep.rejected) {
            return 'REJECTED';
        }
        return <ul className={styles.friendList}>
            {friendListRep.value.friends.map(e => this.renderFriend(e))}
        </ul>;
    }

    renderAddFriend() {
        const {onAddFriendClick, onAddFriendClear, addFriendRep, screen} = this.props;
        return <AddFriend
            screen={screen}
            onAddFriendClick={onAddFriendClick}
            onAddFriendClear={onAddFriendClear}
            addFriendRep={addFriendRep}
        />;
    }

    renderFriend(friend) {
        const {onAcceptFriendClick, onDeleteFriendClick, onBattleFriendClick} = this.props;
        return <Friend
            friend={friend}
            onAcceptFriendClick={onAcceptFriendClick}
            onDeleteFriendClick={onDeleteFriendClick}
            onBattleFriendClick={onBattleFriendClick}
        />;
    }

    renderContent() {
        return <div>
            {this.renderAddFriend()}
            {this.renderActualFriends()}
        </div>;
    }

    render() {
        const {tag} = this.props;
        return <div>
            <div className="pageHeader" style={{position: 'relative'}}><span>{getText(TEXT_FRIENDS)}</span></div>
            {this.renderContent()}
            <AddFriendFetch tag={tag}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        friendListRep: state.repository.friendList,
        addFriendRep: state.repository.addFriend,
        tag: state.friend.tag,
    }),
    (dispatch) => ({
        onBattleFriendClick: (tag) => {
            dispatch(tagsChanged([tag]));
            dispatch(idChanged(OBJECT_BATTLE_FRIEND));
        },
        onDeleteFriendClick: (tag) => {
            request('/friend/delete', {tag}).then(() => {
                clearFriendListFetch(dispatch);
            })
        },
        onAcceptFriendClick: (tag) => {
            request('/friend/add', {tag}).then(() => {
                clearFriendListFetch(dispatch);
            })
        },
        onAddFriendClick: (tag) => dispatch(tagChanged(tag)),
        onAddFriendClear: () => {
            clearAddFriendFetch(dispatch);
            dispatch(tagChanged(undefined));
        }
    })
)(FriendPage);
