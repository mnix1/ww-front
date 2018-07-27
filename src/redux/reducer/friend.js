export const TAG_CHANGED = 'friend/tag/changed';
export const SUGGEST_CHANGED = 'friend/suggest/changed';

const initialState = {
    tag: undefined,
    suggest: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TAG_CHANGED:
            return {...state, tag: action.tag};
        case SUGGEST_CHANGED:
            return {...state, suggest: action.suggest};
        default:
            return state
    }
}

export function tagChanged(tag) {
    return {type: TAG_CHANGED, tag};
}
export function suggestChanged(suggest) {
    return {type: SUGGEST_CHANGED, suggest};
}

