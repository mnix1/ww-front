export const CLEARED = 'hero/cleared';
export const EXPERIMENT_CHANGED = 'hero/experiment/changed';
export const HERO_DETAILS_CHANGED = 'hero/hero-details/changed';
export const SHOW_NOT_OWNED_CHANGED = 'hero/show-not-owned/changed';
export const TEAM_CHANGED = 'hero/team/changed';
export const TEAM_SAVE_CHANGED = 'hero/team-save/changed';

const initialState = {
    experiment: false,
    heroDetails: undefined,
    showNotOwned: false,
    team: [],
    teamSave: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case EXPERIMENT_CHANGED:
            return {...state, experiment: action.experiment};
        case HERO_DETAILS_CHANGED:
            return {...state, heroDetails: action.heroDetails};
        case SHOW_NOT_OWNED_CHANGED:
            return {...state, showNotOwned: action.showNotOwned};
        case TEAM_CHANGED:
            return {...state, team: action.team};
        case TEAM_SAVE_CHANGED:
            return {...state, teamSave: action.teamSave};
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

export function showNotOwnedChanged(showNotOwned) {
    return {type: SHOW_NOT_OWNED_CHANGED, showNotOwned};
}

export function teamChanged(team) {
    return {type: TEAM_CHANGED, team};
}

export function teamSaveChanged(teamSave) {
    return {type: TEAM_SAVE_CHANGED, teamSave};
}
