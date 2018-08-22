export const CLEARED = 'hero/cleared';
export const EXPERIMENT_CHANGED = 'hero/experiment/changed';

const initialState = {
    experiment: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case EXPERIMENT_CHANGED:
            return {...state, experiment: action.experiment};
        default:
            return state
    }
}

export function experimentChanged(experiment) {
    return {type: EXPERIMENT_CHANGED, experiment};
}
