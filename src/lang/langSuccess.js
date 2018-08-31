import {ENGLISH, POLISH} from "./langText";

export const SUCCESS_TEAM_SAVED = 'SUCCESS_TEAM_SAVED';

const TEXTS = {
    [POLISH]: {
        [SUCCESS_TEAM_SAVED]: 'Drużyna zapisana',
    },
    [ENGLISH]: {
        [SUCCESS_TEAM_SAVED]: 'Team saved',
    },
};

export function getSuccess(id) {
    return TEXTS[window.activeLang][id];
}