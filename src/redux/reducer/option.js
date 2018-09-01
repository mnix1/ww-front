export const OPTION_SHOW_CHANGED = 'option/show/changed';

const initialState = {
    show: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case OPTION_SHOW_CHANGED:
            return {...state, show: action.show};
        default:
            return state
    }
}

export const optionShowChanged = (show) => {
    return {type: OPTION_SHOW_CHANGED, show}
};
