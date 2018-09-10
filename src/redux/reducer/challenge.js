export const CLEARED = 'challenge/cleared';
export const TAGS_CHANGED = 'challenge/tags/changed';
export const INIT_CHANGED = 'challenge/init/changed';
export const RESPONSE_ID_CHANGED = 'challenge/response-id/changed';
export const SUMMARY_ID_CHANGED = 'challenge/summary-id/changed';

const initialState = {
    tags: [],
    init: undefined,
    responseId: undefined,
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

export function responseIdChanged(responseId) {
    return {type: RESPONSE_ID_CHANGED, responseId};
}


