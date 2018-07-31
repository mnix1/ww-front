export const CLEARED = 'battle/cleared';
export const TAG_CHANGED = 'battle/tag/changed';
const initialState = {
    tag: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        default:
            return state
    }
}

export function battleCleared() {
    return {type: CLEARED};
}

export function tagChanged(tag) {
    return {type: TAG_CHANGED, tag};
}
