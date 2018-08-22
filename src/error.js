import {ENGLISH, POLISH} from "./lang";

export const ERROR_NOT_ENOUGH_RESOURCES = 'ERROR_NOT_ENOUGH_RESOURCES';
export const ERROR_NO_SPACE_FOR_BOOK = 'ERROR_NO_SPACE_FOR_BOOK';
export const ERROR_READING_ANHOTHER_BOOK = 'ERROR_READING_ANHOTHER_BOOK';

const TEXTS = {
    [POLISH]: {
        [ERROR_READING_ANHOTHER_BOOK]: 'Czytasz inną książkę',
        [ERROR_NOT_ENOUGH_RESOURCES]: 'Za mało zasobów',
        [ERROR_NO_SPACE_FOR_BOOK]: 'Brak miejsca na książkę',
    },
    [ENGLISH]: {
        [ERROR_READING_ANHOTHER_BOOK]: 'Reading another book',
        [ERROR_NOT_ENOUGH_RESOURCES]: 'Not enough resources',
        [ERROR_NO_SPACE_FOR_BOOK]: 'No space for book',
    },
};

export function getError(id) {
    return TEXTS[window.activeLang][id];
}