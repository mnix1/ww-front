export const CLEARED = 'challenge/cleared';
export const TAGS_CHANGED = 'challenge/tags/changed';
export const SUMMARY_ID_CHANGED = 'challenge/summary-id/changed';

const initialState = {
    tags: [],
    summaryId: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case TAGS_CHANGED:
            return {...state, tags: action.tags};
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

export function summaryIdChanged(summaryId) {
    return {type: SUMMARY_ID_CHANGED, summaryId};
}


