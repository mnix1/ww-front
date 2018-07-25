export const TAG_CHANGED = 'friend/tag/changed';

const initialState = {
    tag: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TAG_CHANGED:
            return {...state, tag: action.tag};
        default:
            return state
    }
}

export function tagChanged(tag) {
    return {type: TAG_CHANGED, tag};
}

