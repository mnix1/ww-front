import _ from 'lodash';

export const CLEARED = 'wisie/cleared';
export const EXPERIMENT_CHANGED = 'wisie/experiment/changed';
export const HERO_DETAILS_CHANGED = 'wisie/wisie-details/changed';
export const SHOW_NOT_OWNED_CHANGED = 'wisie/show-not-owned/changed';
export const TEAM_CHANGED = 'wisie/team/changed';
export const TEAM_SAVE_CHANGED = 'wisie/team-save/changed';
export const UPGRADE_PROPS_CHANGED = 'wisie/upgrade-props/changed';
export const PROFILE_HEROES_CHANGED = 'wisie/profile-wisies/changed';

const initialState = {
    experiment: false,
    wisieDetails: undefined,
    showNotOwned: false,
    team: [],
    profileWisies: [],
    teamSave: false,
    upgradeProps: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case EXPERIMENT_CHANGED:
            return {...state, experiment: action.experiment};
        case HERO_DETAILS_CHANGED: {
            let wisieDetails = undefined;
            if (_.isObject(action.wisieDetails)) {
                wisieDetails = {...state.wisieDetails, ...action.wisieDetails};
            }
            return {...state, wisieDetails};
        }
        case SHOW_NOT_OWNED_CHANGED:
            return {...state, showNotOwned: action.showNotOwned};
        case TEAM_CHANGED:
            return {...state, team: action.team};
        case TEAM_SAVE_CHANGED:
            return {...state, teamSave: action.teamSave};
        case UPGRADE_PROPS_CHANGED:
            return {...state, upgradeProps: action.upgradeProps};
        case PROFILE_HEROES_CHANGED: {
            let profileWisies = action.profileWisies;
            if (!_.isArray(profileWisies) && _.isObject(profileWisies)) {
                profileWisies = _.flatten([state.profileWisies.filter(e => e.id !== action.profileWisies.id), action.profileWisies]);
            }
            return {...state, profileWisies};
        }

        default:
            return state
    }
}

export function experimentChanged(experiment) {
    return {type: EXPERIMENT_CHANGED, experiment};
}

export function wisieDetailsChanged(wisieDetails) {
    return {type: HERO_DETAILS_CHANGED, wisieDetails};
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

export function upgradePropsChanged(upgradeProps) {
    return {type: UPGRADE_PROPS_CHANGED, upgradeProps};
}

export function profileWisiesChanged(profileWisies) {
    return {type: PROFILE_HEROES_CHANGED, profileWisies};
}
