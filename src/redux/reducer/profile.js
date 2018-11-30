export const PROFILE_CHANGED = 'profile/profile/changed';
export const SIGNED_IN_CHANGED = 'profile/signedIn/changed';
export const START_READ_BOOK_ID_CHANGED = 'profile/start-read-book-id/changed';
export const STOP_READ_BOOK_ID_CHANGED = 'profile/stop-read-book-id/changed';
export const DISCARD_BOOK_ID_CHANGED = 'profile/discard-book-id/changed';
export const CLAIM_REWARD_BOOK_ID_CHANGED = 'profile/claim-reward-book-id/changed';
export const SPEED_UP_BOOK_ID_CHANGED = 'profile/speed-up-book-id/changed';
export const EXPERIENCE_CHANGED = 'profile/experience/changed';
export const RESOURCES_CHANGED = 'profile/resources/changed';

const initialState = {
    signedIn: undefined,
    startReadBookId: undefined,
    stopReadBookId: undefined,
    discardBookId: undefined,
    claimRewardBookId: undefined,
    speedUpBookId: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PROFILE_CHANGED:
            return {...state, ...action.profile};
        case SIGNED_IN_CHANGED:
            return {...state, signedIn: action.signedIn};
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
        case EXPERIENCE_CHANGED:
            return {...state, experience: action.experience, level: action.level};
        case RESOURCES_CHANGED:
            return {...state, resources: action.resources};
        default:
            return state
    }
}

export function profileChanged(profile) {
    return {type: PROFILE_CHANGED, profile};
}

export function signedInChanged(signedIn) {
    return {type: SIGNED_IN_CHANGED, signedIn};
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

export function experienceChanged(experience, level) {
    return {type: EXPERIENCE_CHANGED, experience, level};
}

export function resourcesChanged(resources) {
    return {type: RESOURCES_CHANGED, resources};
}
