import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../indexApp";

export const ERROR_CONNECTION_PROBLEM = 'ERROR_CONNECTION_PROBLEM';
export const ERROR_NOT_ENOUGH_RESOURCES = 'ERROR_NOT_ENOUGH_RESOURCES';
export const ERROR_NO_SPACE_FOR_BOOK = 'ERROR_NO_SPACE_FOR_BOOK';
export const ERROR_READING_ANHOTHER_BOOK = 'ERROR_READING_ANHOTHER_BOOK';
export const ERROR_NOT_ALLOWED_CHARS_IN_NICK = 'ERROR_NOT_ALLOWED_CHARS_IN_NICK';
export const ERROR_FRIEND_CANT_PLAY_RIGHT_NOW = 'ERROR_FRIEND_CANT_PLAY_RIGHT_NOW';
export const ERROR_FRIEND_RIVAL_CANCELED = 'ERROR_FRIEND_RIVAL_CANCELED';
export const ERROR_FRIEND_RIVAL_REJECTED = 'ERROR_FRIEND_RIVAL_REJECTED';
export const ERROR_WRONG_CREATOR_TAG = 'ERROR_WRONG_CREATOR_TAG';
export const ERROR_NO_FRIENDS_SPECIFIED = 'ERROR_NO_FRIENDS_SPECIFIED';

const TEXTS = {
    [POLISH]: {
        [ERROR_CONNECTION_PROBLEM]: 'Brak połączenie z serwerem...',
        [ERROR_READING_ANHOTHER_BOOK]: 'Czytasz inną książkę',
        [ERROR_NOT_ENOUGH_RESOURCES]: 'Za mało zasobów',
        [ERROR_NO_SPACE_FOR_BOOK]: 'Brak miejsca na książkę',
        [ERROR_NOT_ALLOWED_CHARS_IN_NICK]: 'Nie zmieniono nicku',
        [ERROR_FRIEND_CANT_PLAY_RIGHT_NOW]: 'Znajomy nie może grać w tym momencie',
        [ERROR_FRIEND_RIVAL_CANCELED]: 'Znajomy anulował grę',
        [ERROR_FRIEND_RIVAL_REJECTED]: 'Znajomy odrzucił grę',
        [ERROR_WRONG_CREATOR_TAG]: 'Niepoprawny tag twórcy',
        [ERROR_NO_FRIENDS_SPECIFIED]: 'Nie dodano znajomych',
    },
    [ENGLISH]: {
        [ERROR_CONNECTION_PROBLEM]: 'No connection to the server...',
        [ERROR_READING_ANHOTHER_BOOK]: 'Reading another book',
        [ERROR_NOT_ENOUGH_RESOURCES]: 'Not enough resources',
        [ERROR_NO_SPACE_FOR_BOOK]: 'No space for book',
        [ERROR_NOT_ALLOWED_CHARS_IN_NICK]: 'The nickname was not changed',
        [ERROR_FRIEND_CANT_PLAY_RIGHT_NOW]: "Friend can't play right now",
        [ERROR_FRIEND_RIVAL_CANCELED]: 'Friend canceled the game',
        [ERROR_FRIEND_RIVAL_REJECTED]: 'Friend rejected the game',
        [ERROR_WRONG_CREATOR_TAG]: 'Wrong creator tag',
        [ERROR_NO_FRIENDS_SPECIFIED]: 'No friends specified',
    },
};

export function getError(id) {
    return TEXTS[getActiveLang()][id];
}