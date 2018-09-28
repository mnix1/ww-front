import _ from 'lodash';

export const CLEARED = 'wisie/cleared';
export const EXPERIMENT_CHANGED = 'wisie/experiment/changed';
export const HERO_DETAILS_CHANGED = 'wisie/wisie-details/changed';
export const SHOW_NOT_OWNED_CHANGED = 'wisie/show-not-owned/changed';
export const TEAM_CHANGED = 'wisie/team/changed';
export const TEAM_SAVE_CHANGED = 'wisie/team-save/changed';
export const UPGRADE_ATTRIBUTE_PROPS_CHANGED = 'wisie/upgrade-attribute-props/changed';
export const HOBBY_CHANGE_PROPS_CHANGED = 'wisie/hobby-change-props/changed';
export const PROFILE_WISIES_CHANGED = 'wisie/profile-wisies/changed';
export const IS_PROFILE_WISIES_ACTUAL_CHANGED = 'wisie/is-profile-wisies-actual/changed';

const initialState = {
    experiment: false,
    wisieDetails: undefined,
    showNotOwned: false,
    team: [],
    profileWisies: [],
    isProfileWisiesActual: undefined,
    teamSave: false,
    upgradeAttributeProps: undefined,
    changeHobbyProps: undefined,
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
        case UPGRADE_ATTRIBUTE_PROPS_CHANGED:
            return {...state, upgradeAttributeProps: action.upgradeAttributeProps};
        case HOBBY_CHANGE_PROPS_CHANGED:
            return {...state, changeHobbyProps: action.changeHobbyProps};
        case IS_PROFILE_WISIES_ACTUAL_CHANGED:
            return {...state, isProfileWisiesActual: action.isProfileWisiesActual};
        case PROFILE_WISIES_CHANGED: {
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

export function upgradeAttributePropsChanged(upgradeAttributeProps) {
    return {type: UPGRADE_ATTRIBUTE_PROPS_CHANGED, upgradeAttributeProps};
}

export function changeHobbyPropsChanged(changeHobbyProps) {
    return {type: HOBBY_CHANGE_PROPS_CHANGED, changeHobbyProps};
}

export function profileWisiesChanged(profileWisies) {
    return {type: PROFILE_WISIES_CHANGED, profileWisies};
}

export function isProfileWisiesActualChanged(isProfileWisiesActual) {
    return {type: IS_PROFILE_WISIES_ACTUAL_CHANGED, isProfileWisiesActual};
}
