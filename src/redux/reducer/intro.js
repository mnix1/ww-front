export const STEP_INDEX_CHANGED = 'intro/step-index/changed';
export const SHOW_CHANGED = 'intro/show/changed';
export const PICK_WISIES_CHANGED = 'intro/pick-wisies/changed';

const initialState = {
    stepIndex: undefined,
    show: false,
    pickWisies: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case STEP_INDEX_CHANGED:
            return {...state, stepIndex: action.stepIndex};
        case SHOW_CHANGED:
            return {...state, show: action.show};
        case PICK_WISIES_CHANGED:
            return {...state, pickWisies: action.pickWisies};
        default:
            return state
    }
}

export const stepIndexChanged = (stepIndex) => {
    return {type: STEP_INDEX_CHANGED, stepIndex}
};

export const showChanged = (show) => {
    return {type: SHOW_CHANGED, show}
};

export const pickWisiesChanged = (pickWisies) => {
    return {type: PICK_WISIES_CHANGED, pickWisies}
};
