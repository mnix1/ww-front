import {ENGLISH, POLISH} from "./langText";

export const ERROR_NOT_ENOUGH_RESOURCES = 'ERROR_NOT_ENOUGH_RESOURCES';
export const ERROR_NO_SPACE_FOR_BOOK = 'ERROR_NO_SPACE_FOR_BOOK';
export const ERROR_READING_ANHOTHER_BOOK = 'ERROR_READING_ANHOTHER_BOOK';
export const ERROR_NOT_ALLOWED_CHARS_IN_NICK = 'ERROR_NOT_ALLOWED_CHARS_IN_NICK';

const TEXTS = {
    [POLISH]: {
        [ERROR_READING_ANHOTHER_BOOK]: 'Czytasz inną książkę',
        [ERROR_NOT_ENOUGH_RESOURCES]: 'Za mało zasobów',
        [ERROR_NO_SPACE_FOR_BOOK]: 'Brak miejsca na książkę',
        [ERROR_NOT_ALLOWED_CHARS_IN_NICK]: 'Nie zmieniono nicku',
    },
    [ENGLISH]: {
        [ERROR_READING_ANHOTHER_BOOK]: 'Reading another book',
        [ERROR_NOT_ENOUGH_RESOURCES]: 'Not enough resources',
        [ERROR_NO_SPACE_FOR_BOOK]: 'No space for book',
        [ERROR_NOT_ALLOWED_CHARS_IN_NICK]: 'The nickname was not changed',
    },
};

export function getError(id) {
    return TEXTS[window.activeLang][id];
}