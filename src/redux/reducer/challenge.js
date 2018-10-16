import {
    CHALLENGE_DURATION_8,
    CHALLENGE_RESOURCE_COST_1,
    CHALLENGE_ACCESS_UNLOCK, CHALLENGE_APPROACH_MANY
} from "../../util/challengeHelper";
import {RESOURCE_GOLD} from "../../util/resourceHelper";

export const CLEARED = 'challenge/cleared';
export const TAGS_CHANGED = 'challenge/tags/changed';
export const INIT_CHANGED = 'challenge/init/changed';
export const RESPONSE_ID_CHANGED = 'challenge/response-id/changed';
export const SUMMARY_ID_CHANGED = 'challenge/summary-id/changed';
export const JOIN_ID_CHANGED = 'challenge/join-id/changed';
export const TRY_AGAIN_ID_CHANGED = 'challenge/try-again-id/changed';
export const CREATOR_TAG_CHANGED = 'challenge/creator-tag/changed';
export const ACCESS_CHANGED = 'challenge/access/changed';
export const APPROACH_CHANGED = 'challenge/approach/changed';
export const RESOURCE_COST_CHANGED = 'challenge/resource-cost/changed';
export const RESOURCE_TYPE_CHANGED = 'challenge/resource-type/changed';
export const DURATION_CHANGED = 'challenge/duration/changed';

const initialState = {
    tags: [],
    init: undefined,
    access: CHALLENGE_ACCESS_UNLOCK,
    approach: CHALLENGE_APPROACH_MANY,
    resourceCost: CHALLENGE_RESOURCE_COST_1,
    resourceType: RESOURCE_GOLD,
    duration: CHALLENGE_DURATION_8,
    responseId: undefined,
    joinId: undefined,
    tryAgainId: undefined,
    creatorTag: undefined,
    summaryId: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case TAGS_CHANGED:
            return {...state, tags: action.tags};
        case INIT_CHANGED:
            return {...state, init: action.init};
        case RESPONSE_ID_CHANGED:
            return {...state, responseId: action.responseId};
        case SUMMARY_ID_CHANGED:
            return {...state, summaryId: action.summaryId};
        case JOIN_ID_CHANGED:
            return {...state, joinId: action.joinId};
        case TRY_AGAIN_ID_CHANGED:
            return {...state, tryAgainId: action.tryAgainId};
        case CREATOR_TAG_CHANGED:
            return {...state, creatorTag: action.creatorTag};
        case ACCESS_CHANGED:
            return {...state, access: action.access};
        case APPROACH_CHANGED:
            return {...state, approach: action.approach};
        case RESOURCE_COST_CHANGED:
            return {...state, resourceCost: action.resourceCost};
        case RESOURCE_TYPE_CHANGED:
            return {...state, resourceType: action.resourceType};
        case DURATION_CHANGED:
            return {...state, duration: action.duration};
        default:
            return state
    }
}

export function challengeCleared() {
    return {type: CLEARED};
}

export function tagsChanged(tags) {
    return {type: TAGS_CHANGED, tags};
}

export function initChanged(init) {
    return {type: INIT_CHANGED, init};
}

export function summaryIdChanged(summaryId) {
    return {type: SUMMARY_ID_CHANGED, summaryId};
}

export function joinIdChanged(joinId) {
    return {type: JOIN_ID_CHANGED, joinId};
}
export function tryAgainIdChanged(tryAgainId) {
    return {type: TRY_AGAIN_ID_CHANGED, tryAgainId};
}

export function creatorTagChanged(creatorTag) {
    return {type: CREATOR_TAG_CHANGED, creatorTag};
}

export function responseIdChanged(responseId) {
    return {type: RESPONSE_ID_CHANGED, responseId};
}

export function accessChanged(access) {
    return {type: ACCESS_CHANGED, access};
}

export function approachChanged(approach) {
    return {type: APPROACH_CHANGED, approach};
}

export function resourceCostChanged(resourceCost) {
    return {type: RESOURCE_COST_CHANGED, resourceCost};
}

export function resourceTypeChanged(resourceType) {
    return {type: RESOURCE_TYPE_CHANGED, resourceType};
}

export function durationChanged(duration) {
    return {type: DURATION_CHANGED, duration};
}


