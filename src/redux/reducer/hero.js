export const CLEARED = 'hero/cleared';
export const EXPERIMENT_CHANGED = 'hero/experiment/changed';
export const HERO_DETAILS_CHANGED = 'hero/hero-details/changed';


const initialState = {
    experiment: false,
    heroDetails: undefined
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case EXPERIMENT_CHANGED:
            return {...state, experiment: action.experiment};
        case HERO_DETAILS_CHANGED:
            return {...state, heroDetails: action.heroDetails};
        default:
            return state
    }
}

export function experimentChanged(experiment) {
    return {type: EXPERIMENT_CHANGED, experiment};
}

export function heroDetailsChanged(heroDetails) {
    return {type: HERO_DETAILS_CHANGED, heroDetails};
}
