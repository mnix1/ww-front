import React from 'react';
import {connect} from 'react-redux';
import {clearFriendListFetch} from "./fetch/FriendListFetch";
import './styles.css';
import request from './../../util/fetchHelper';
import _ from 'lodash';
import {
    getText,
    TEXT_ACTUAL_FRIENDS, TEXT_ADD, TEXT_BATTLE, TEXT_CHALLENGE, TEXT_DELETE,
    TEXT_FRIENDS, TEXT_INVITES,
    TEXT_NONE_FRIENDS, TEXT_NONE_SUGGESTED_FRIENDS,
    TEXT_SUGGEST_FRIENDS,
    TEXT_SUGGESTED_FRIENDS,
} from "../../lang";
import {suggestChanged, addTagChanged} from "../../redux/reducer/friend";
import AddFriendFetch, {clearAddFriendFetch} from "./fetch/AddFriendFetch";
import {idChanged} from "../../redux/reducer/content";
import {tagsChanged} from "../../redux/reducer/challenge";
import {OBJECT_CHALLENGE_FRIEND} from "../object-group/objectsChallenge";
import Friend, {STATUS_ACCEPTED, STATUS_REQUESTED, STATUS_SUGGESTED} from "../../component/friend/Friend";
import {AddFriend} from "../../component/friend/AddFriend";
import FaBan from 'react-icons/lib/fa/ban';
import FaGavel from 'react-icons/lib/fa/gavel';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import TiFlash from 'react-icons/lib/ti/flash';
import FriendSuggestFetch from "./fetch/FriendSuggestFetch";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {CREAM_COLOR} from "../../util/style/constant";
import {statusChanged, tagChanged} from "../../redux/reducer/battle";
import {OBJECT_BATTLE_FRIEND} from "../object-group/objectsBattle";
import {BATTLE_STATUS_OPEN} from "../../util/battleHelper";

class FriendPage extends React.PureComponent {

    renderFriends(friends) {
        if (!friends) {
            return null;
        }
        return <div>
            {_.sortBy(friends, e => _.toLower(e.name))
                .map(e => this.renderFriend(e))}
        </div>;
    }

    renderActualFriends() {
        const {friends} = this.props;
        const filteredFriends = _.filter(friends,e => e.status === STATUS_ACCEPTED);
        return <div className='pageInsideContainer'>
            <div className='title'>{getText(_.isEmpty(filteredFriends) ? TEXT_NONE_FRIENDS : TEXT_ACTUAL_FRIENDS)}</div>
            {this.renderFriends(filteredFriends)}
        </div>;
    }

    renderInvites() {
        const {friends} = this.props;
        const filteredFriends = _.filter(friends, e => e.status === STATUS_REQUESTED);
        if(_.isEmpty(filteredFriends)){
            return null;
        }
        return <div className='pageInsideContainer'>
            <div className='title'>{getText(TEXT_INVITES)}</div>
            {this.renderFriends(filteredFriends)}
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
        const {onAcceptFriendClick, onDeleteFriendClick, onChallengeFriendClick, onBattleFriendClick} = this.props;
        return <Friend
            key={friend.tag}
            friend={friend}
            actions={<div className='actions'>
                {friend.status === STATUS_ACCEPTED && friend.isOnline &&
                <div onClick={() => onBattleFriendClick(friend.tag)}><span>{getText(TEXT_BATTLE)}</span><TiFlash color={CREAM_COLOR}/></div>}
                {friend.status === STATUS_ACCEPTED &&
                <div onClick={() => onChallengeFriendClick(friend.tag)}><span>{getText(TEXT_CHALLENGE)}</span><FaGavel color={CREAM_COLOR}/></div>}
                {(friend.status === STATUS_REQUESTED || friend.status === STATUS_SUGGESTED) &&
                <div onClick={() => onAcceptFriendClick(friend.tag)}><span>{getText(TEXT_ADD)}</span><FaPlusCircle color={CREAM_COLOR}/></div>}
                {friend.status !== STATUS_SUGGESTED &&
                <div onClick={() => onDeleteFriendClick(friend.tag)}><span>{getText(TEXT_DELETE)}</span><FaBan color={CREAM_COLOR}/></div>}
            </div>}
        />;
    }

    renderSuggestedFriends() {
        const {friendSuggestRep, friends} = this.props;
        const suggestedFriends = _.get(friendSuggestRep, 'value.suggestedFriends');
        if (!suggestedFriends) {
            return null;
        }
        const friendsMap = _.keyBy(friends,'tag');
        const filteredSuggestedFriends = suggestedFriends.filter(e => !friendsMap[e.tag]);
        return <div className='pageInsideContainer suggestedFriendsContainer'>
            <div className='title'>{getText(_.isEmpty(filteredSuggestedFriends) ? TEXT_NONE_SUGGESTED_FRIENDS : TEXT_SUGGESTED_FRIENDS)}</div>
            {this.renderFriends(filteredSuggestedFriends)}
        </div>
    }

    renderContent() {
        const {onSuggestFriendClick} = this.props;
        return <div>
            <div className='rightTopContainer'>
                {this.renderAddFriend()}
                <Button style={{marginTop: '0.5rem'}} material={BUTTON_MATERIAL_BOX_SHADOW}
                        onClick={onSuggestFriendClick}>{getText(TEXT_SUGGEST_FRIENDS)}</Button>
            </div>
            {this.renderActualFriends()}
            {this.renderInvites()}
            {this.renderSuggestedFriends()}
        </div>;
    }

    render() {
        const {addTag, addFriendRep,friendSuggestRep, suggest} = this.props;
        return <div>
            <div className="pageHeader" style={{position: 'relative'}}><span>{getText(TEXT_FRIENDS)}</span></div>
            {this.renderContent()}
            <AddFriendFetch rep={addFriendRep} addTag={addTag}/>
            <FriendSuggestFetch rep={friendSuggestRep} suggest={suggest}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        friends: state.friend.friends,
        addFriendRep: state.repository.addFriend,
        friendSuggestRep: state.repository.friendSuggest,
        addTag: state.friend.addTag,
        suggest: state.friend.suggest,
    }),
    (dispatch) => ({
        onBattleFriendClick: (tag) => {
            dispatch(tagChanged(tag));
            dispatch(statusChanged(BATTLE_STATUS_OPEN));
            dispatch(idChanged(OBJECT_BATTLE_FRIEND));
        },
        onChallengeFriendClick: (tag) => {
            dispatch(tagsChanged([tag]));
            dispatch(idChanged(OBJECT_CHALLENGE_FRIEND));
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
        onAddFriendClick: (tag) => dispatch(addTagChanged(tag)),
        onAddFriendClearClick: () => {
            clearAddFriendFetch(dispatch);
            dispatch(addTagChanged(undefined));
        },
        onSuggestFriendClick: () => {
            dispatch(suggestChanged(_.uniqueId('suggest')));
        }
    })
)(FriendPage);
