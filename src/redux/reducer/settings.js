export const CHOSEN_WISOR_CHANGED = 'settings/chosen-wisor/changed';

const initialState = {
    chosenWisor: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHOSEN_WISOR_CHANGED:
            return {...state, chosenWisor: action.chosenWisor};
        default:
            return state
    }
}

export const chosenWisorChanged = (chosenWisor) => {
    return {type: CHOSEN_WISOR_CHANGED, chosenWisor}
};
