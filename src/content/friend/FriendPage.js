import React from 'react';
import {connect} from 'react-redux';
import {clearFriendListFetch} from "./fetch/FriendListFetch";
import './styles.css';
import request from './../../util/fetchHelper';
import _ from 'lodash';
import {
    getText,
    TEXT_ACTUAL_FRIENDS,
    TEXT_FRIENDS, TEXT_INVITES,
    TEXT_NONE_FRIENDS, TEXT_NONE_SUGGESTED_FRIENDS,
    TEXT_SUGGEST_FRIENDS,
    TEXT_SUGGESTED_FRIENDS,
} from "../../lang";
import {suggestChanged, tagChanged} from "../../redux/reducer/friend";
import AddFriendFetch, {clearAddFriendFetch} from "./fetch/AddFriendFetch";
import {idChanged} from "../../redux/reducer/content";
import {tagsChanged} from "../../redux/reducer/challenge";
import {OBJECT_CHALLENGE_FRIEND} from "../object-group/objectsChallenge";
import Friend, {STATUS_ACCEPTED, STATUS_REQUESTED, STATUS_SUGGESTED} from "../../component/friend/Friend";
import {AddFriend} from "../../component/friend/AddFriend";
import FaBan from 'react-icons/lib/fa/ban';
import FaGavel from 'react-icons/lib/fa/gavel';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import FriendSuggestFetch from "./fetch/FriendSuggestFetch";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {CREAM_COLOR} from "../../util/style/constant";

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
        const {onAcceptFriendClick, onDeleteFriendClick, onChallengeFriendClick} = this.props;
        return <Friend
            key={friend.tag}
            friend={friend}
            actions={<div className='actions'>
                {friend.status === STATUS_ACCEPTED &&
                <FaGavel color={CREAM_COLOR} onClick={() => onChallengeFriendClick(friend.tag)}/>}
                {(friend.status === STATUS_REQUESTED || friend.status === STATUS_SUGGESTED) &&
                <FaPlusCircle color={CREAM_COLOR} onClick={() => onAcceptFriendClick(friend.tag)}/>}
                {friend.status !== STATUS_SUGGESTED &&
                <FaBan color={CREAM_COLOR} onClick={() => onDeleteFriendClick(friend.tag)}/>}
            </div>}
        />;
    }

    renderSuggestedFriends() {
        const {friendSuggestRep} = this.props;
        const friends = _.get(friendSuggestRep, 'value.suggestedFriends');
        if (!friends) {
            return null;
        }
        return <div className='pageInsideContainer suggestedFriendsContainer'>
            <div className='title'>{getText(_.isEmpty(friends) ? TEXT_NONE_SUGGESTED_FRIENDS : TEXT_SUGGESTED_FRIENDS)}</div>
            {this.renderFriends(friends)}
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
        const {tag, suggest} = this.props;
        return <div>
            <div className="pageHeader" style={{position: 'relative'}}><span>{getText(TEXT_FRIENDS)}</span></div>
            {this.renderContent()}
            <AddFriendFetch tag={tag}/>
            <FriendSuggestFetch suggest={suggest}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        friends: state.friend.friends,
        addFriendRep: state.repository.addFriend,
        friendSuggestRep: state.repository.friendSuggest,
        tag: state.friend.tag,
        suggest: state.friend.suggest,
    }),
    (dispatch) => ({
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
        onAddFriendClick: (tag) => dispatch(tagChanged(tag)),
        onAddFriendClearClick: () => {
            clearAddFriendFetch(dispatch);
            dispatch(tagChanged(undefined));
        },
        onSuggestFriendClick: () => {
            dispatch(suggestChanged(_.uniqueId('suggest')));
        }
    })
)(FriendPage);
