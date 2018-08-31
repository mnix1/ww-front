import {WAR_STATUS_IN_PROGRESS} from "../../util/warHelper";

export const CLEARED = 'war/cleared';
export const STATUS_CHANGED = 'war/status/changed';
export const WAR_IN_PROGRESS_CONTENT = 'war/in-progress/content';

export const QUESTION_ID_ANSWER_ID_MAP_CHANGED = 'war/question-id-answer-id-map/changed';
export const QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED = 'war/question-id-skip-animation-map/changed';

export const SHOW_OPTIONS_CHANGED = 'war/show-options/changed';

const initialState = {
    status: undefined,
    content: undefined,
    questionIdAnswerIdMap: {},
    questionIdSkipAnimationMap: {},
    showOptions: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case STATUS_CHANGED:
            return {...state, status: action.status};
        case WAR_IN_PROGRESS_CONTENT:
            return {...state, content: {...state.content, ...action.content}, status: WAR_STATUS_IN_PROGRESS};
        case QUESTION_ID_ANSWER_ID_MAP_CHANGED:
            return {...state, questionIdAnswerIdMap: action.questionIdAnswerIdMap};
        case QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED:
            return {...state, questionIdSkipAnimationMap: action.questionIdSkipAnimationMap};
        case SHOW_OPTIONS_CHANGED:
            return {...state, showOptions: action.showOptions};
        default:
            return state
    }
}

export function warCleared() {
    return {type: CLEARED};
}

export function statusChanged(status) {
    return {type: STATUS_CHANGED, status};
}

export function warInProgressContent(content) {
    return {type: WAR_IN_PROGRESS_CONTENT, content};
}

export function questionIdAnswerIdMapChanged(questionIdAnswerIdMap) {
    return {type: QUESTION_ID_ANSWER_ID_MAP_CHANGED, questionIdAnswerIdMap};
}

export function questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap) {
    return {type: QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED, questionIdSkipAnimationMap};
}

export function showOptionsChanged(showOptions) {
    return {type: SHOW_OPTIONS_CHANGED, showOptions};
}
