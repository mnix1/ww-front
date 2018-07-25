import React from 'react';
import {connect} from 'react-redux';
import FriendListFetch, {clearFriendListFetch} from "./fetch/FriendListFetch";
import styles from './styles.css';
import request from './../../util/fetchHelper';
import {
    getText,
    TEXT_ADD_FRIEND,
    TEXT_ADD_FRIEND_ALREADY,
    TEXT_ADD_FRIEND_TAG,
    TEXT_FRIENDS, TEXT_REQUEST_SENT,
    TEXT_WRONG_TAG
} from "../../lang";
import {randomHero} from "../../util/media/HeroHelper";
import FaBan from 'react-icons/lib/fa/ban';
import FaGavel from 'react-icons/lib/fa/gavel';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import IoAndroidSync from 'react-icons/lib/io/android-sync';
import {tagChanged} from "../../redux/reducer/friend";
import AddFriendFetch, {clearAddFriendFetch} from "./fetch/AddFriendFetch";

const FRIEND_STATUS_REQUESTED = 'REQUESTED';
const FRIEND_STATUS_ACCEPTED = 'ACCEPTED';

class FriendPage extends React.PureComponent {

    addFriendInputRef = React.createRef();

    renderActualFriends() {
        const {list} = this.props;
        if (!list || list.pending) {
            return 'LOADING'
        }
        if (list.rejected) {
            return 'REJECTED';
        }
        return <ul className={styles.friendList}>
            {list.value.friends.map(e => this.renderFriend(e))}
        </ul>
    }

    renderAddFriend() {
        const {onAddFriendClick, onAddFriendClear, addFriendResult, screen} = this.props;
        const fontSize = screen.isSmallHeight || screen.isSmallWidth
            ? 14 : 20;
        if (addFriendResult === undefined) {
            return <div className='addFriend'>
                <div>{getText(TEXT_ADD_FRIEND)}</div>
                <div className='addFriendActions'>
                    <input ref={this.addFriendInputRef}
                           placeholder={getText(TEXT_ADD_FRIEND_TAG)}
                           type='text'
                           maxLength={8}
                           style={{width: 120}}/>
                    <FaPlusCircle color="#fffdf1" size={fontSize + 4}
                                  onClick={() => onAddFriendClick(this.addFriendInputRef.current.value)}/>
                </div>
            </div>;
        }
        if (addFriendResult.pending) {
            return <div className='addFriend'>LOADING</div>
        }
        if (addFriendResult.rejected) {
            return <div className='addFriend'>REJECTED</div>
        }
        const code = addFriendResult.value.code;
        return <div className='addFriend' style={{display: 'flex'}}>
            {code === 1 && <span>{getText(TEXT_REQUEST_SENT)}</span>}
            {code === -2 && <span>{getText(TEXT_WRONG_TAG)}</span>}
            {(code === -1 || code === -3) && <span>{getText(TEXT_ADD_FRIEND_ALREADY)}</span>}
            <IoAndroidSync size={fontSize} color="#fffdf1" onClick={onAddFriendClear}/>
        </div>
    }

    renderFriend(friend) {
        const {onAcceptFriendClick, onDeleteFriendClick} = this.props;
        return <li key={friend.tag} className='friendContainer'>
            <div className='friend'>
                <img src={randomHero()} height={80}/>
                <div className='details'>
                    <div className='actions'>
                        {friend.status === FRIEND_STATUS_ACCEPTED && <FaGavel color="#fffdf1"/>}
                        {friend.status === FRIEND_STATUS_REQUESTED &&
                        <FaPlusCircle color="#fffdf1" onClick={() => onAcceptFriendClick(friend.tag)}/>}
                        <FaBan color="#fffdf1" onClick={() => onDeleteFriendClick(friend.tag)}/>
                    </div>
                    <div>
                        <div className='name'>{friend.name}</div>
                        <div className='tag'>#{friend.tag}</div>

                        {/*<div>{friend.level}</div>*/}
                        {/*<div>{friend.status}</div>*/}
                    </div>
                </div>
            </div>
        </li>
    }

    renderContent() {
        return <div>
            {this.renderAddFriend()}
            {this.renderActualFriends()}
        </div>
    }

    render() {
        const { tag,list } = this.props;
        return <div>
            <div className="pageHeader" style={{position: 'relative'}}><span>{getText(TEXT_FRIENDS)}</span></div>
            {this.renderContent()}
            <AddFriendFetch tag={tag}/>
            <FriendListFetch list={list}/>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        list: state.repository.friendList,
        addFriendResult: state.repository.addFriend,
        tag: state.friend.tag,
    }),
    (dispatch) => ({
        onDeleteFriendClick: (tag) => {
            request('/friend/delete', {tag}).then(() => {
                clearFriendListFetch(dispatch);
            })
        },
        onAcceptFriendClick:  (tag) => {
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
