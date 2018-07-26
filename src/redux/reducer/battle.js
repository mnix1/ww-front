
export const TAGS_CHANGED = 'battle/tags/changed';
export const STATUS_CHANGED = 'battle/status/changed';
export const QUESTION_INDEX_CHANGED = 'battle/question-index/changed';
export const QUESTION_ID_ANSWER_ID_MAP_CHANGED = 'battle/question-id-answer-id-map/changed';

const initialState = {
    tags: undefined,
    questionIndex: 0,
    questionIdAnswerIdMap: {},
    status: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TAGS_CHANGED:
            return {...state, tags: action.tags};
        case STATUS_CHANGED:
            return {...state, status: action.status};
        case QUESTION_INDEX_CHANGED:
            return {...state, questionIndex: action.questionIndex};
        case QUESTION_ID_ANSWER_ID_MAP_CHANGED:
            return {...state, questionIdAnswerIdMap: action.questionIdAnswerIdMap};
        default:
            return state
    }
}

export function tagsChanged(tags) {
    return {type: TAGS_CHANGED, tags};
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

