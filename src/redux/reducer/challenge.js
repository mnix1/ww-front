export const CLEARED = 'challenge/cleared';
export const TAGS_CHANGED = 'challenge/tags/changed';
export const IN_PROGRESS_ID_CHANGED = 'challenge/in-progress-id/changed';
export const STATUS_CHANGED = 'challenge/status/changed';
export const QUESTION_INDEX_CHANGED = 'challenge/question-index/changed';
export const QUESTION_ID_ANSWER_ID_MAP_CHANGED = 'challenge/question-id-answer-id-map/changed';
export const QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED = 'challenge/question-id-skip-animation-map/changed';
export const SUMMARY_ID_CHANGED = 'challenge/summary-id/changed';

const initialState = {
    tags: [],
    inProgressId: undefined,
    questionIndex: 0,
    questionIdAnswerIdMap: {},
    questionIdSkipAnimationMap: {},
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
        case QUESTION_INDEX_CHANGED:
            return {...state, questionIndex: action.questionIndex};
        case QUESTION_ID_ANSWER_ID_MAP_CHANGED:
            return {...state, questionIdAnswerIdMap: action.questionIdAnswerIdMap};
        case QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED:
            return {...state, questionIdSkipAnimationMap: action.questionIdSkipAnimationMap};
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

export function questionIndexChanged(questionIndex) {
    return {type: QUESTION_INDEX_CHANGED, questionIndex};
}

export function questionIdAnswerIdMapChanged(questionIdAnswerIdMap) {
    return {type: QUESTION_ID_ANSWER_ID_MAP_CHANGED, questionIdAnswerIdMap};
}

export function questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap) {
    return {type: QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED, questionIdSkipAnimationMap};
}

export function summaryIdChanged(summaryId) {
    return {type: SUMMARY_ID_CHANGED, summaryId};
}


