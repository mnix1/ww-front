import _ from 'lodash';

export const FRIENDS_CHANGED = 'friend/friends/changed';
export const FRIEND_ADDED = 'friend/friend/added';
export const FRIEND_DELETED = 'friend/friend/deleted';
export const FRIEND_ONLINE = 'friend/friend/online';
export const FRIEND_OFFLINE = 'friend/friend/offline';
export const TAG_CHANGED = 'friend/tag/changed';
export const SUGGEST_CHANGED = 'friend/suggest/changed';

const initialState = {
    friends: [],
    tag: undefined,
    suggest: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FRIENDS_CHANGED:
            return {...state, friends: action.friends};
        case FRIEND_ADDED:
            return {
                ...state, friends: [
                    ...state.friends,
                    action.friend
                ]
            };
        case FRIEND_DELETED:
            return {...state, friends: _.filter(state.friends, e => e.tag !== action.tag)};
        case FRIEND_ONLINE:
            return {...state, friends: _.map(state.friends, e => e.tag === action.tag ? {...e, isOnline: true} : e)};
        case FRIEND_OFFLINE:
            return {...state, friends: _.map(state.friends, e => e.tag === action.tag ? {...e, isOnline: false} : e)};
        case TAG_CHANGED:
            return {...state, tag: action.tag};
        case SUGGEST_CHANGED:
            return {...state, suggest: action.suggest};
        default:
            return state
    }
}

export function friendsChanged(friends) {
    return {type: FRIENDS_CHANGED, friends};
}

export function friendAdded(friend) {
    return {type: FRIEND_ADDED, friend};
}

export function friendDeleted(tag) {
    return {type: FRIEND_DELETED, tag};
}

export function friendOnline(tag) {
    return {type: FRIEND_ONLINE, tag};
}

export function friendOffline(tag) {
    return {type: FRIEND_OFFLINE, tag};
}

export function tagChanged(tag) {
    return {type: TAG_CHANGED, tag};
}

export function suggestChanged(suggest) {
    return {type: SUGGEST_CHANGED, suggest};
}

