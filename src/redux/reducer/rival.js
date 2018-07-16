export const CLEARED = 'rival/cleared';
export const CATEGORY_CHANGED = 'rival/category/changed';
export const ANSWER_ID_CHANGED = 'rival/answer-id/changed';

const initialState = {
    category: undefined,
    answerId: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case CATEGORY_CHANGED:
            return {...state, category: action.category};
        case ANSWER_ID_CHANGED:
            return {...state, answerId: action.answerId};
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

export function cleared() {
    return {type: CLEARED};
}

