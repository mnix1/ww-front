import React from 'react';
import {connect} from 'react-redux';
import {
    getText,
    TEXT_ADD,
    TEXT_ADDED,
    TEXT_CHALLENGE_ADD_FRIENDS,
    TEXT_NONE_FRIENDS,
    TEXT_START_CHALLENGE
} from "../../../lang/langText";
import _ from 'lodash';
import {initChanged, tagsChanged} from "../../../redux/reducer/challenge";
import {Button, BUTTON_MATERIAL_ACCEPT} from "../../../component/button/Button";
import {MAX_CHALLENGE_FRIENDS} from "../../../util/challengeHelper";
import Profile from "../../../component/profile/Profile";
import {FRIEND_STATUS_ACCEPTED} from "../../../util/friendHelper";
import MeshBackground from "../../../component/background/MeshBackground";

class ChallengeFriendPage extends React.PureComponent {

    renderFriend(friend, isAdded) {
        const {tags, screen, onFriendToggle} = this.props;
        return <Profile
            blackBackground={true}
            imgHeight={screen.wisieImgHeight}
            key={friend.tag}
            {...friend}
            actions={
                <div className='actions'>
                    <label className='pointer' style={{display: 'block', minWidth: 60}}>
                        {isAdded ? getText(TEXT_ADDED) : getText(TEXT_ADD)}
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
        const sortedFriends = _.sortBy(friends.filter(e => e.status === FRIEND_STATUS_ACCEPTED), (e) => (this.isFriendAdded(tagsMap, e) ? 0 : 1) + _.toLower(e.name));
        return <div>
            {sortedFriends.map(e => this.renderFriend(e, this.isFriendAdded(tagsMap, e)))}
        </div>;
    }

    renderStartChallenge() {
        const {tags, onStartChallengeClick} = this.props;
        const label = getText(TEXT_START_CHALLENGE);
        if (tags.length > 0) {
            return <Button className='marginRem relative' onClick={onStartChallengeClick}
                           material={BUTTON_MATERIAL_ACCEPT}>{label}</Button>;
        }
        return null;
    }

    render() {
        const {tags, friends, screen} = this.props;
        if (_.isEmpty(friends)) {
            return <div className="pageHeader">{getText(TEXT_NONE_FRIENDS)}</div>;
        }
        const friendsCounter = `(${tags.length}/${Math.min(friends.length, MAX_CHALLENGE_FRIENDS)})`;
        return <div className='page challengePage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <MeshBackground/>
            <div className="pageHeader">
                <span>{getText(TEXT_CHALLENGE_ADD_FRIENDS)} {friendsCounter}</span>
            </div>
            {this.renderFriends()}
            {this.renderStartChallenge()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        tags: state.challenge.tags,
        friends: state.friend.friends
    }),
    (dispatch) => ({
        onStartChallengeClick: () => {
            dispatch(initChanged(true));
        },
        onFriendToggle: (tag, tags) => {
            const newTags = _.filter(tags, (e) => e !== tag);
            if (newTags.length === tags.length) {
                newTags.push(tag);
            }
            dispatch(tagsChanged(newTags));
        }
    })
)(ChallengeFriendPage);
