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
            return {...state, buyBookId: action.buyBookId};
        default:
            return state
    }
}

export function buyBookIdChanged(buyBookId) {
    return {type: BUY_BOOK_ID_CHANGED, buyBookId};
}
