export const CLEARED = 'practise/cleared';
export const CATEGORY_CHANGED = 'practise/category/changed';
export const ANSWER_ID_CHANGED = 'practise/answer-id/changed';
export const SKIP_ANIMATION_CHANGED = 'practise/skip-animation/changed';

const initialState = {
    category: undefined,
    answerId: undefined,
    skipAnimation: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case CATEGORY_CHANGED:
            return {...state, category: action.category};
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

export function answerIdChanged(answerId) {
    return {type: ANSWER_ID_CHANGED, answerId};
}

export function skipAnimationChanged(skipAnimation) {
    return {type: SKIP_ANIMATION_CHANGED, skipAnimation};
}

export function practiseCleared() {
    return {type: CLEARED};
}

