import React from 'react';
import {connect} from 'react-redux';
import {clearFriendListFetch} from "./fetch/FriendListFetch";
import './styles.css';
import request from './../../util/fetchHelper';
import _ from 'lodash';
import {
    getText,
    TEXT_ACTUAL_FRIENDS,
    TEXT_ADD,
    TEXT_ADDED,
    TEXT_BATTLE,
    TEXT_CHALLENGE,
    TEXT_DELETE,
    TEXT_INVITES,
    TEXT_NONE_FRIENDS,
    TEXT_NONE_SUGGESTED_FRIENDS,
    TEXT_SUGGEST_FRIENDS,
    TEXT_SUGGESTED_FRIENDS,
    TEXT_WAR,
} from "../../lang/langText";
import {addedSuggestedChanged, addTagChanged, suggestChanged} from "../../redux/reducer/friend";
import AddFriendFetch, {clearAddFriendFetch} from "./fetch/AddFriendFetch";
import {challengeCleared, tagsChanged} from "../../redux/reducer/challenge";
import {AddFriend} from "../../component/add-friend/AddFriend";
import FaQq from 'react-icons/lib/fa/qq';
import FaBan from 'react-icons/lib/fa/ban';
import FaGavel from 'react-icons/lib/fa/gavel';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import TiFlash from 'react-icons/lib/ti/flash';
import FriendSuggestFetch from "./fetch/FriendSuggestFetch";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {CREAM_COLOR} from "../../util/style/constant";
import {statusChanged, tagChanged, rivalTypeChanged} from "../../redux/reducer/rival";
import {RIVAL_STATUS_START_FRIEND, RIVAL_TYPE_BATTLE, RIVAL_TYPE_WAR} from "../../util/rivalHelper";
import Profile from "../../component/profile/Profile";
import {push} from 'connected-react-router'
import {CHALLENGE_FRIEND_ROUTE} from "../routes";
import {FRIEND_STATUS_ACCEPTED, FRIEND_STATUS_REQUESTED, FRIEND_STATUS_SUGGESTED} from "../../util/friendHelper";

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
        const filteredFriends = _.filter(friends, e => e.status === FRIEND_STATUS_ACCEPTED);
        return <div className='contentFragment'>
            <div className='title'>{getText(_.isEmpty(filteredFriends) ? TEXT_NONE_FRIENDS : TEXT_ACTUAL_FRIENDS)}</div>
            {this.renderFriends(filteredFriends)}
        </div>;
    }

    renderInvites() {
        const {friends} = this.props;
        const filteredFriends = _.filter(friends, e => e.status === FRIEND_STATUS_REQUESTED);
        if (_.isEmpty(filteredFriends)) {
            return null;
        }
        return <div className='contentFragment'>
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
        const {addedSuggested, screen, onAddSuggestedFriendClick, onAcceptFriendClick, onDeleteFriendClick, onChallengeFriendClick, onRivalFriendClick, profile} = this.props;
        return <Profile
            imgHeight={screen.wisieImgHeight}
            key={friend.tag}
            {...friend}
            actions={<div className='actions'>
                {profile.teamInitialized && friend.status === FRIEND_STATUS_ACCEPTED && friend.isOnline && friend.teamInitialized &&
                <div onClick={() => onRivalFriendClick(friend.tag, RIVAL_TYPE_WAR)}>
                    <span>{getText(TEXT_WAR)}</span><FaQq
                    color={CREAM_COLOR}/></div>}
                {friend.status === FRIEND_STATUS_ACCEPTED && friend.isOnline &&
                <div onClick={() => onRivalFriendClick(friend.tag, RIVAL_TYPE_BATTLE)}>
                    <span>{getText(TEXT_BATTLE)}</span><TiFlash
                    color={CREAM_COLOR}/></div>}
                {friend.status === FRIEND_STATUS_ACCEPTED &&
                <div onClick={() => onChallengeFriendClick(friend.tag)}><span>{getText(TEXT_CHALLENGE)}</span><FaGavel
                    color={CREAM_COLOR}/></div>}
                {friend.status === FRIEND_STATUS_REQUESTED &&
                <div onClick={() => onAcceptFriendClick(friend.tag)}><span>{getText(TEXT_ADD)}</span><FaPlusCircle
                    color={CREAM_COLOR}/></div>}
                {friend.status === FRIEND_STATUS_SUGGESTED && _.isNil(addedSuggested[friend.tag]) &&
                <div onClick={() => onAddSuggestedFriendClick(friend.tag, addedSuggested)}>
                    <span>{getText(TEXT_ADD)}</span><FaPlusCircle color={CREAM_COLOR}/></div>}
                {friend.status === FRIEND_STATUS_SUGGESTED && addedSuggested[friend.tag] === true &&
                <div><span>{getText(TEXT_ADDED)}</span><FaCheckCircle color={CREAM_COLOR}/></div>}
                {friend.status !== FRIEND_STATUS_SUGGESTED &&
                <div onClick={() => onDeleteFriendClick(friend.tag)}><span>{getText(TEXT_DELETE)}</span><FaBan
                    color={CREAM_COLOR}/></div>}
            </div>}
        />;
    }

    renderSuggestedFriends() {
        const {friendSuggestRep, friends} = this.props;
        const suggestedFriends = _.get(friendSuggestRep, 'value.suggestedFriends');
        if (!suggestedFriends) {
            return null;
        }
        const friendsMap = _.keyBy(friends, 'tag');
        const filteredSuggestedFriends = suggestedFriends.filter(e => !friendsMap[e.tag]);
        return <div className='contentFragment suggestedFriendsContainer'>
            <div
                className='title'>{getText(_.isEmpty(filteredSuggestedFriends) ? TEXT_NONE_SUGGESTED_FRIENDS : TEXT_SUGGESTED_FRIENDS)}</div>
            {this.renderFriends(filteredSuggestedFriends)}
        </div>
    }

    renderContent() {
        const {onSuggestFriendClick} = this.props;
        return <div className="pageContent friendContent">
            <div className='rightTopContainer'>
                {this.renderAddFriend()}
                <Button style={{marginTop: '0.25rem'}} material={BUTTON_MATERIAL_BOX_SHADOW}
                        onClick={onSuggestFriendClick}>{getText(TEXT_SUGGEST_FRIENDS)}</Button>
            </div>
            {this.renderActualFriends()}
            {this.renderInvites()}
            {this.renderSuggestedFriends()}
        </div>;
    }

    render() {
        const {addTag, addFriendRep, friendSuggestRep, suggest} = this.props;
        return <div className="page">
            <div className="pageBackground absoluteBackgroundMix"/>
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
        addedSuggested: state.friend.addedSuggested,
        addFriendRep: state.repository.addFriend,
        friendSuggestRep: state.repository.friendSuggest,
        addTag: state.friend.addTag,
        suggest: state.friend.suggest,
        profile: state.profile.profile,
    }),
    (dispatch) => ({
        onRivalFriendClick: (tag, type) => {
            dispatch(tagChanged(tag));
            dispatch(rivalTypeChanged(type));
            dispatch(statusChanged(RIVAL_STATUS_START_FRIEND));
        },
        onChallengeFriendClick: (tag) => {
            // clearChallengeStartFriendFetch(dispatch);
            // clearChallengeEndTaskFetch(dispatch);
            dispatch(challengeCleared());
            dispatch(tagsChanged([tag]));
            dispatch(push(CHALLENGE_FRIEND_ROUTE));
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
        onAddSuggestedFriendClick: (tag, addedSuggested) => {
            dispatch(addedSuggestedChanged({...addedSuggested, [tag]: true}));
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
