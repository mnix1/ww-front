export const CLEARED = 'shop/cleared';
export const BUY_BOOK_ID_CHANGED = 'shop/buy-book-id/changed';
export const BOOK_FILTER_LEVEL_CHANGED = 'shop/book-filter-level/changed';
export const SHOW_BOOKS_CHANGED = 'shop/show-books/changed';

const initialState = {
    buyBookId: undefined,
    showBooks: true,
    bookFilterLevel: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case BUY_BOOK_ID_CHANGED:
            return {...state, buyBookId: action.buyBookId};
        case BOOK_FILTER_LEVEL_CHANGED:
            return {...state, bookFilterLevel: action.bookFilterLevel};
        case SHOW_BOOKS_CHANGED:
            return {...state, showBooks: action.showBooks};
        default:
            return state
    }
}

export function buyBookIdChanged(buyBookId) {
    return {type: BUY_BOOK_ID_CHANGED, buyBookId};
}

export function bookFilterLevelChanged(bookFilterLevel) {
    return {type: BOOK_FILTER_LEVEL_CHANGED, bookFilterLevel};
}

export function showBooksChanged(showBooks) {
    return {type: SHOW_BOOKS_CHANGED, showBooks};
}
