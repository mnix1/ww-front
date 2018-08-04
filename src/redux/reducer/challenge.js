export const CLEARED = 'challenge/cleared';
export const TAGS_CHANGED = 'challenge/tags/changed';
export const IN_PROGRESS_ID_CHANGED = 'challenge/in-progress-id/changed';
export const STATUS_CHANGED = 'challenge/status/changed';
export const ANSWER_ID_CHANGED = 'challenge/answer-id/changed';
export const SKIP_ANIMATION_CHANGED = 'challenge/skip-animation/changed';
export const SUMMARY_ID_CHANGED = 'challenge/summary-id/changed';

const initialState = {
    tags: [],
    inProgressId: undefined,
    answerId: null,
    skipAnimation: false,
    status: undefined,
    summaryId: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case TAGS_CHANGED:
            return {...state, tags: action.tags};
        case IN_PROGRESS_ID_CHANGED:
            return {...state, inProgressId: action.inProgressId};
        case STATUS_CHANGED:
            return {...state, status: action.status};
        case ANSWER_ID_CHANGED:
            return {...state, answerId: action.answerId};
        case SKIP_ANIMATION_CHANGED:
            return {...state, skipAnimation: action.skipAnimation};
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

export function inProgressIdChanged(inProgressId) {
    return {type: IN_PROGRESS_ID_CHANGED, inProgressId};
}

export function statusChanged(status) {
    return {type: STATUS_CHANGED, status};
}

export function answerIdChanged(answerId) {
    return {type: ANSWER_ID_CHANGED, answerId};
}

export function skipAnimationChanged(skipAnimation) {
    return {type: SKIP_ANIMATION_CHANGED, skipAnimation};
}

export function summaryIdChanged(summaryId) {
    return {type: SUMMARY_ID_CHANGED, summaryId};
}


