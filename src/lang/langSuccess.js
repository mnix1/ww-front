import {ENGLISH, POLISH} from "../redux/reducer/language";

export const SUCCESS_TEAM_SAVED = 'SUCCESS_TEAM_SAVED';
export const SUCCESS_CHANGED_NICK = 'SUCCESS_CHANGED_NICK';
export const SUCCESS_CHANGED_WISOR = 'SUCCESS_CHANGED_WISOR';

const TEXTS = {
    [POLISH]: {
        [SUCCESS_TEAM_SAVED]: 'Drużyna zapisana',
        [SUCCESS_CHANGED_NICK]: 'Zmieniono nick',
        [SUCCESS_CHANGED_WISOR]: 'Zmieniono wiedzora',
    },
    [ENGLISH]: {
        [SUCCESS_TEAM_SAVED]: 'Team saved',
        [SUCCESS_CHANGED_NICK]: 'Nick changed',
        [SUCCESS_CHANGED_WISOR]: 'Wisor changed',
    },
};

export function getSuccess(lang, id) {
    return TEXTS[lang][id];
}