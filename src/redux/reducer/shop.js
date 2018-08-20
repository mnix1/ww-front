export const CLEARED = 'shop/cleared';
export const BUY_BOOK_ID_CHANGED = 'shop/buy-book-id/changed';

const initialState = {
    buyBookId: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case BUY_BOOK_ID_CHANGED:
            return {...state, openChestId: action.openChestId};
        default:
            return state
    }
}

export function buyBookIdChanged(openChestId) {
    return {type: BUY_BOOK_ID_CHANGED, openChestId};
}



