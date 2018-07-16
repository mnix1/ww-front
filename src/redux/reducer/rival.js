export const CATEGORY_CHANGED = 'rival/category/changed';

const initialState = {
    category: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CATEGORY_CHANGED:
            return {...state, category: action.category};
        default:
            return state
    }
}

export function categoryChanged(category) {
    return {type: CATEGORY_CHANGED, category};
}

