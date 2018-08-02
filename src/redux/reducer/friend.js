import _ from 'lodash';

export const FRIENDS_CHANGED = 'friend/friends/changed';
export const FRIEND_ADDED = 'friend/friend/added';
export const FRIEND_DELETED = 'friend/friend/deleted';
export const FRIEND_SIGNED_IN = 'friend/friend/signed-in';
export const FRIEND_SIGNED_OUT = 'friend/friend/signed-out';
export const ADD_TAG_CHANGED = 'friend/add-tag/changed';
export const SUGGEST_CHANGED = 'friend/suggest/changed';
export const ADDED_SUGGESTED_CHANGED = 'friend/added-suggested/changed';

const initialState = {
    friends: [],
    addTag: undefined,
    suggest: undefined,
    addedSuggested: {},
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
        case FRIEND_SIGNED_IN:
            return {...state, friends: _.map(state.friends, e => e.tag === action.tag ? {...e, isOnline: true} : e)};
        case FRIEND_SIGNED_OUT:
            return {...state, friends: _.map(state.friends, e => e.tag === action.tag ? {...e, isOnline: false} : e)};
        case ADD_TAG_CHANGED:
            return {...state, addTag: action.addTag};
        case SUGGEST_CHANGED:
            return {...state, suggest: action.suggest};
        case ADDED_SUGGESTED_CHANGED:
            return {...state, addedSuggested: action.addedSuggested};
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

export function friendSignedIn(tag) {
    return {type: FRIEND_SIGNED_IN, tag};
}

export function friendSignedOut(tag) {
    return {type: FRIEND_SIGNED_OUT, tag};
}

export function addTagChanged(addTag) {
    return {type: ADD_TAG_CHANGED, addTag};
}

export function suggestChanged(suggest) {
    return {type: SUGGEST_CHANGED, suggest};
}

export function addedSuggestedChanged(addedSuggested) {
    return {type: ADDED_SUGGESTED_CHANGED, addedSuggested};
}

