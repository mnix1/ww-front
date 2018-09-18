export const STEP_INDEX_CHANGED = 'socket/stepIndex/changed';
export const ENABLE_CHANGED = 'socket/enable/changed';
export const SHOW_CHANGED = 'socket/show/changed';

const initialState = {
    stepIndex: undefined,
    enable: false,
    show: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case STEP_INDEX_CHANGED:
            return {...state, stepIndex: action.stepIndex};
        case SHOW_CHANGED:
            return {...state, show: action.show};
        case ENABLE_CHANGED:
            return {...state, enable: action.enable};
        default:
            return state
    }
}

export const stepIndexChanged = (stepIndex) => {
    return {type: STEP_INDEX_CHANGED, stepIndex}
};

export const enableChanged = (enable) => {
    return {type: ENABLE_CHANGED, enable}
};

export const showChanged = (show) => {
    return {type: SHOW_CHANGED, show}
};
