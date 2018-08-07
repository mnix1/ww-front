export const CLEARED = 'shop/cleared';
export const OPEN_CHEST_ID_CHANGED = 'shop/open-chest-id/changed';

const initialState = {
    openChestId: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case OPEN_CHEST_ID_CHANGED:
            return {...state, openChestId: action.openChestId};
        default:
            return state
    }
}

export function openChestIdChanged(openChestId) {
    return {type: OPEN_CHEST_ID_CHANGED, openChestId};
}



