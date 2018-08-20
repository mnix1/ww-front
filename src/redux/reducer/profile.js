export const PROFILE_CHANGED = 'profile/changed';
export const READ_BOOK_ID_CHANGED = 'profile/read-book-id/changed';
export const CLAIM_REWARD_BOOK_ID_CHANGED = 'profile/claim-reward-book-id/changed';

const initialState = {
    readBookId: undefined,
    claimRewardBookId: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PROFILE_CHANGED:
            return {...state, profile: action.profile};
        case READ_BOOK_ID_CHANGED:
            return {...state, readBookId: action.readBookId};
        case CLAIM_REWARD_BOOK_ID_CHANGED:
            return {...state, claimRewardBookId: action.claimRewardBookId};
        default:
            return state
    }
}

export function profileChanged(profile) {
    return {type: PROFILE_CHANGED, profile};
}

export function readBookIdChanged(readBookId) {
    return {type: READ_BOOK_ID_CHANGED, readBookId};
}

export function claimRewardBookIdChanged(claimRewardBookId) {
    return {type: CLAIM_REWARD_BOOK_ID_CHANGED, claimRewardBookId};
}

