export const PROFILE_CHANGED = 'profile/changed';
export const PROFILE_PART_CHANGED = 'profile/part/changed';
export const PROFILE_TAG_CHANGED = 'profile/tag/changed';
export const START_READ_BOOK_ID_CHANGED = 'profile/start-read-book-id/changed';
export const STOP_READ_BOOK_ID_CHANGED = 'profile/stop-read-book-id/changed';
export const DISCARD_BOOK_ID_CHANGED = 'profile/discard-book-id/changed';
export const CLAIM_REWARD_BOOK_ID_CHANGED = 'profile/claim-reward-book-id/changed';
export const SPEED_UP_BOOK_ID_CHANGED = 'profile/speed-up-book-id/changed';

const initialState = {
    profileTag: undefined,
    profile: {},
    startReadBookId: undefined,
    stopReadBookId: undefined,
    discardBookId: undefined,
    claimRewardBookId: undefined,
    speedUpBookId: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PROFILE_CHANGED:
            return {...state, profile: action.profile};
        case PROFILE_PART_CHANGED:
            return {...state, profile: {...state.profile, ...action.profile}};
        case PROFILE_TAG_CHANGED:
            return {...state, profileTag: action.profileTag};
        case START_READ_BOOK_ID_CHANGED:
            return {...state, startReadBookId: action.startReadBookId};
        case STOP_READ_BOOK_ID_CHANGED:
            return {...state, stopReadBookId: action.stopReadBookId};
        case DISCARD_BOOK_ID_CHANGED:
            return {...state, discardBookId: action.discardBookId};
        case CLAIM_REWARD_BOOK_ID_CHANGED:
            return {...state, claimRewardBookId: action.claimRewardBookId};
        case SPEED_UP_BOOK_ID_CHANGED:
            return {...state, speedUpBookId: action.speedUpBookId};
        default:
            return state
    }
}

export function profileChanged(profile) {
    return {type: PROFILE_CHANGED, profile};
}

export function profilePartChanged(profile) {
    return {type: PROFILE_PART_CHANGED, profile};
}

export function profileTagChanged(profileTag) {
    return {type: PROFILE_TAG_CHANGED, profileTag};
}

export function startReadBookIdChanged(startReadBookId) {
    return {type: START_READ_BOOK_ID_CHANGED, startReadBookId};
}

export function stopReadBookIdChanged(stopReadBookId) {
    return {type: STOP_READ_BOOK_ID_CHANGED, stopReadBookId};
}

export function discardBookIdChanged(discardBookId) {
    return {type: DISCARD_BOOK_ID_CHANGED, discardBookId};
}

export function claimRewardBookIdChanged(claimRewardBookId) {
    return {type: CLAIM_REWARD_BOOK_ID_CHANGED, claimRewardBookId};
}

export function speedUpBookIdChanged(speedUpBookId) {
    return {type: SPEED_UP_BOOK_ID_CHANGED, speedUpBookId};
}

