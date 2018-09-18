export const STEP_INDEX_CHANGED = 'socket/stepIndex/changed';
export const ENABLE_CHANGED = 'socket/enable/changed';

const initialState = {
    stepIndex: 0,
    enable: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case STEP_INDEX_CHANGED:
            return {...state, stepIndex: action.stepIndex};
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
