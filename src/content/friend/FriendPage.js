import React from 'react';
import {connect} from 'react-redux';
import {clearFriendListFetch} from "./fetch/FriendListFetch";
import styles from './styles.css';
import request from './../../util/fetchHelper';
import _ from 'lodash';
import {
    getText,
    TEXT_FRIENDS,
} from "../../lang";
import {tagChanged} from "../../redux/reducer/friend";
import AddFriendFetch, {clearAddFriendFetch} from "./fetch/AddFriendFetch";
import {idChanged} from "../../redux/reducer/content";
import {tagsChanged} from "../../redux/reducer/battle";
import {OBJECT_BATTLE_FRIEND} from "../object-group/objectsBattle";
import {Friend, STATUS_ACCEPTED, STATUS_REQUESTED} from "../../component/friend/Friend";
import {AddFriend} from "../../component/friend/AddFriend";
import FaBan from 'react-icons/lib/fa/ban';
import FaGavel from 'react-icons/lib/fa/gavel';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';

class FriendPage extends React.PureComponent {

    renderActualFriends() {
        const {friendListRep} = this.props;
        if (!friendListRep || friendListRep.pending) {
            return 'LOADING'
        }
        if (friendListRep.rejected) {
            return 'REJECTED';
        }
        return <div className={styles.friendList}>
            {_.sortBy(friendListRep.value.friends, e => _.toLower(e.name))
                .map(e => this.renderFriend(e))}
        </div>;
    }

    renderAddFriend() {
        const {onAddFriendClick, onAddFriendClearClick, addFriendRep, screen} = this.props;
        return <AddFriend
            screen={screen}
            onAddClick={onAddFriendClick}
            onClearClick={onAddFriendClearClick}
            addFriendRep={addFriendRep}
        />;
    }

    renderFriend(friend) {
        const {onAcceptFriendClick, onDeleteFriendClick, onBattleFriendClick} = this.props;
        return <Friend
            key={friend.tag}
            friend={friend}
            actions={<div className='actions'>
                {friend.status === STATUS_ACCEPTED &&
                <FaGavel color="#fffdf1" onClick={() => onBattleFriendClick(friend.tag)}/>}
                {friend.status === STATUS_REQUESTED &&
                <FaPlusCircle color="#fffdf1" onClick={() => onAcceptFriendClick(friend.tag)}/>}
                {<FaBan color="#fffdf1" onClick={() => onDeleteFriendClick(friend.tag)}/>}
            </div>}
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
        onAddFriendClearClick: () => {
            clearAddFriendFetch(dispatch);
            dispatch(tagChanged(undefined));
        }
    })
)(FriendPage);
