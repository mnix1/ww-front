export const TAGS_CHANGED = 'battle/tags/changed';

const initialState = {
    tags: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TAGS_CHANGED:
            return {...state, tags: action.tags};
        default:
            return state
    }
}

export function tagsChanged(tags) {
    return {type: TAGS_CHANGED, tags};
}

