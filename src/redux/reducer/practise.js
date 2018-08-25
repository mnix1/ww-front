import {EXTREMELY_EASY} from "../../util/difficultyHelper";

export const CLEARED = 'practise/cleared';
export const CATEGORY_CHANGED = 'practise/category/changed';
export const DIFFICULTY_LEVEL_CHANGED = 'practise/difficulty-level/changed';
export const ANSWER_ID_CHANGED = 'practise/answer-id/changed';
export const SKIP_ANIMATION_CHANGED = 'practise/skip-animation/changed';

const initialState = {
    category: undefined,
    difficultyLevel: EXTREMELY_EASY,
    answerId: undefined,
    skipAnimation: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case CATEGORY_CHANGED:
            return {...state, category: action.category};
        case DIFFICULTY_LEVEL_CHANGED:
            return {...state, difficultyLevel: action.difficultyLevel};
        case ANSWER_ID_CHANGED:
            return {...state, answerId: action.answerId};
        case SKIP_ANIMATION_CHANGED:
            return {...state, skipAnimation: action.skipAnimation};
        default:
            return state
    }
}

export function categoryChanged(category) {
    return {type: CATEGORY_CHANGED, category};
}

export function difficultyLevelChanged(difficultyLevel) {
    return {type: DIFFICULTY_LEVEL_CHANGED, difficultyLevel};
}

export function answerIdChanged(answerId) {
    return {type: ANSWER_ID_CHANGED, answerId};
}

export function skipAnimationChanged(skipAnimation) {
    return {type: SKIP_ANIMATION_CHANGED, skipAnimation};
}

export function practiseCleared() {
    return {type: CLEARED};
}

