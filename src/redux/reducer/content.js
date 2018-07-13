export const ID_CHANGED = 'content/id/changed';

const initialState = {
    id: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ID_CHANGED:
            return {...state, id: action.id};
        default:
            return state
    }
}

export function idChanged(id) {
    return {type: ID_CHANGED, id};
}

