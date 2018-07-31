import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_ADDED, TEXT_BATTLE_ADD_FRIENDS, TEXT_START_BATTLE} from "../../../lang";
import styles from './styles.css';
import Friend from "../../../component/friend/Friend";
import _ from 'lodash';
import {statusChanged, tagsChanged} from "../../../redux/reducer/battle";
import {Button, BUTTON_MATERIAL_ACCEPT} from "../../../component/button/Button";
import {BATTLE_STATUS_OPEN, MAX_BATTLE_FRIENDS} from "../../../util/battleHelper";

class BattleFriendPage extends React.PureComponent {

    renderFriend(friend, isAdded) {
        const {tags, onFriendToggle} = this.props;
        return <Friend
            key={friend.tag}
            friend={friend}
            actions={
                <div className='actions'>
                    <label className='pointer'>
                        {isAdded ? getText(TEXT_ADDED) : ''}
                        <br/>
                        <input className='pointer' type='checkbox' checked={isAdded}
                               onChange={() => onFriendToggle(friend.tag, tags)}/>
                    </label>
                </div>
            }
        />;
    }

    isFriendAdded(tagsMap, friend) {
        return !_.isNil(tagsMap[friend.tag]);
    }

    renderFriends() {
        const {tags, friends} = this.props;
        const tagsMap = _.keyBy(tags);
        const sortedFriends = _.sortBy(friends, (e) => (this.isFriendAdded(tagsMap, e) ? 0 : 1) + _.toLower(e.name));
        return <div className={styles.friendList}>
            {sortedFriends.map(e => this.renderFriend(e, this.isFriendAdded(tagsMap, e)))}
        </div>;
    }

    renderStartBattle() {
        const {onStartBattleClick} = this.props;
        const label = getText(TEXT_START_BATTLE);
        return <Button onClick={onStartBattleClick}
                       material={BUTTON_MATERIAL_ACCEPT}
                       style={{margin: '0.5rem'}}>{label}</Button>;
    }

    render() {
        const {tags, friends} = this.props;
        const friendsCounter = `(${tags.length}/${Math.min(friends.length, MAX_BATTLE_FRIENDS)})`;
        return <div>
            <div className="pageHeader" style={{position: 'relative'}}>
                <span>{getText(TEXT_BATTLE_ADD_FRIENDS)} {friendsCounter}</span>
            </div>
            {this.renderFriends()}
            {this.renderStartBattle()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        tags: state.battle.tags,
        friends: state.friend.friends
    }),
    (dispatch) => ({
        onStartBattleClick: () => {
            dispatch(statusChanged(BATTLE_STATUS_OPEN));
        },
        onFriendToggle: (tag, tags) => {
            const newTags = _.filter(tags, (e) => e !== tag);
            console.log(tag, tags, newTags);
            if (newTags.length === tags.length) {
                newTags.push(tag);
            }
            dispatch(tagsChanged(newTags));
        }
    })
)(BattleFriendPage);
