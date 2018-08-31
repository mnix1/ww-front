import {
    RIVAL_STATUS_ACCEPTED_FRIEND,
    RIVAL_STATUS_INVITED_FRIEND,
    RIVAL_STATUS_REJECTED_FRIEND
} from "../../util/rivalHelper";

export const CLEARED = 'rival/cleared';
export const TAG_CHANGED = 'rival/tag/changed';
export const RIVAL_TYPE_CHANGED = 'rival/type/changed';
export const STATUS_CHANGED = 'rival/status/changed';
export const RIVAL_INVITED = 'rival/invited';
export const RIVAL_CANCELLED = 'rival/invite-canceled';
export const RIVAL_REJECTED = 'rival/invite-rejected';
export const RIVAL_ACCEPTED = 'rival/invite-accepted';

const initialState = {
    tag: undefined,
    rivalType: undefined,
    status: undefined,
    invitedBy: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case TAG_CHANGED:
            return {...state, tag: action.tag};
        case RIVAL_TYPE_CHANGED:
            return {...state, rivalType: action.rivalType};
        case STATUS_CHANGED:
            return {...state, status: action.status};
        case RIVAL_INVITED:
            return {...state, invitedBy: action.invitedBy, status: RIVAL_STATUS_INVITED_FRIEND};
        case RIVAL_CANCELLED:
            return {...state, invitedBy: undefined, status: undefined};
        case RIVAL_REJECTED:
            return {...state, status: RIVAL_STATUS_REJECTED_FRIEND};
        case RIVAL_ACCEPTED:
            return {...state, status: RIVAL_STATUS_ACCEPTED_FRIEND};
        default:
            return state
    }
}

export function rivalCleared() {
    return {type: CLEARED};
}

export function tagChanged(tag) {
    return {type: TAG_CHANGED, tag};
}

export function rivalTypeChanged(rivalType) {
    return {type: RIVAL_TYPE_CHANGED, rivalType};
}

export function statusChanged(status) {
    return {type: STATUS_CHANGED, status};
}

export function rivalInvited(invitedBy) {
    return {type: RIVAL_INVITED, invitedBy};
}

export function rivalInviteCancelled() {
    return {type: RIVAL_CANCELLED};
}

export function rivalInviteRejected() {
    return {type: RIVAL_REJECTED};
}

export function rivalInviteAccepted() {
    return {type: RIVAL_ACCEPTED};
}