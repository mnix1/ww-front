import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_ADDED, TEXT_BATTLE_ADD_FRIENDS, TEXT_START_BATTLE} from "../../../lang";
import styles from './styles.css';
import {Friend} from "../../../component/friend/Friend";
import _ from 'lodash';
import {statusChanged, tagsChanged} from "../../../redux/reducer/battle";
import {Button} from "../../../component/button/Button";
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

    renderFriends() {
        const {tags, friends} = this.props;
        const tagsMap = _.keyBy(tags);
        return <div className={styles.friendList}>
            {friends.map(e => this.renderFriend(e, !_.isNil(tagsMap[e.tag])))}
        </div>;
    }

    renderStartBattle() {
        const {onStartBattleClick} = this.props;
        const label = getText(TEXT_START_BATTLE);
        return <Button onClick={onStartBattleClick}
                       style={{margin: '0.5rem', boxShadow: '0 0 4px #dadada'}}>{label}</Button>;
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
        friends: _.get(state.repository.friendList, 'value.friends'),
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
