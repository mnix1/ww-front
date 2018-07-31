export const CLEARED = 'battle/cleared';
export const TAG_CHANGED = 'battle/tag/changed';
export const STATUS_CHANGED = 'battle/status/changed';
export const BATTLE_INVITED = 'battle/invited';
export const BATTLE_CANCELLED = 'battle/invite-canceled';
const initialState = {
    tag: undefined,
    status: undefined,
    invitedBy: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case TAG_CHANGED:
            return {...state, tag: action.tag};
        case STATUS_CHANGED:
            return {...state, status: action.status};
        case BATTLE_INVITED:
            return {...state, invitedBy: action.invitedBy};
        case BATTLE_CANCELLED:
            return {...state, invitedBy: undefined};
        default:
            return state
    }
}

export function battleCleared() {
    return {type: CLEARED};
}
export function tagChanged(tag) {
    return {type: TAG_CHANGED, tag};
}
export function statusChanged(status) {
    return {type: STATUS_CHANGED, status};
}
export function battleInvited(invitedBy) {
    return {type: BATTLE_INVITED, invitedBy};
}
export function battleInviteCancelled() {
    return {type: BATTLE_CANCELLED};
}
