import _ from 'lodash';

export const CLEARED = 'hero/cleared';
export const EXPERIMENT_CHANGED = 'hero/experiment/changed';
export const HERO_DETAILS_CHANGED = 'hero/hero-details/changed';
export const SHOW_NOT_OWNED_CHANGED = 'hero/show-not-owned/changed';
export const TEAM_CHANGED = 'hero/team/changed';
export const TEAM_SAVE_CHANGED = 'hero/team-save/changed';
export const UPGRADE_PROPS_CHANGED = 'hero/upgrade-props/changed';
export const PROFILE_HEROES_CHANGED = 'hero/profile-heroes/changed';

const initialState = {
    experiment: false,
    heroDetails: undefined,
    showNotOwned: false,
    team: [],
    profileHeroes: [],
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
            let heroDetails = undefined;
            if (_.isObject(action.heroDetails)) {
                heroDetails = {...state.heroDetails, ...action.heroDetails};
            }
            return {...state, heroDetails};
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
            let profileHeroes = action.profileHeroes;
            if (!_.isArray(profileHeroes) && _.isObject(profileHeroes)) {
                profileHeroes = _.flatten([state.profileHeroes.filter(e => e.id !== action.profileHeroes.id), action.profileHeroes]);
            }
            return {...state, profileHeroes};
        }

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

export function upgradePropsChanged(upgradeProps) {
    return {type: UPGRADE_PROPS_CHANGED, upgradeProps};
}

export function profileHeroesChanged(profileHeroes) {
    return {type: PROFILE_HEROES_CHANGED, profileHeroes};
}
