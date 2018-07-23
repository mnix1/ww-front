import {TILE_APP_BATTLE, TILE_APP_FRIEND, TILE_APP_HISTORY, TILE_APP_TRAINING} from "./component/tile/tileAppHelper";
import {
    TILE_CATEGORY_GEOGRAPHY,
    TILE_CATEGORY_HISTORY,
    TILE_CATEGORY_MATH,
    TILE_CATEGORY_MEMORY,
    TILE_CATEGORY_MUSIC,
    TILE_CATEGORY_RANDOM
} from "./component/tile/tileCategoryHelper";

export const POLISH = 'pl';
export const ENGLISH = 'en';

export const TEXT_APP_NAME = 'TEXT_APP_NAME';
export const TEXT_CHOOSE_CATEGORY = 'TEXT_CHOOSE_CATEGORY';
export const TEXT_PLAY_AGAIN = 'TEXT_PLAY_AGAIN';
export const TEXT_QUESTION = 'TEXT_QUESTION';
export const TEXT_REMEMBER_DETAILS = 'TEXT_REMEMBER_DETAILS';
export const TEXT_CLICK_ON_ANY = 'TEXT_CLICK_ON_ANY';
export const TEXT_CORRECT_ANSWER = 'TEXT_CORRECT_ANSWER';
export const TEXT_TIME = 'TEXT_TIME';
export const TEXT_WRONG_ANSWER = 'TEXT_WRONG_ANSWER';

export function getText(id) {
    return TEXTS[window.activeLang][id];
}

const TEXTS = {
    [POLISH]: {
        [TEXT_APP_NAME]: 'Wojna na Wiedzę',
        [TEXT_CHOOSE_CATEGORY]: 'Wybierz kategorię',
        [TEXT_PLAY_AGAIN]: 'Zagraj ponownie',
        [TEXT_QUESTION]: 'Oto pytanie:',
        [TEXT_REMEMBER_DETAILS]: 'Zapamiętaj szczegóły obiektów',
        [TEXT_CLICK_ON_ANY]: 'Kliknij na dowolny aby zobaczyć pytanie',
        [TEXT_CORRECT_ANSWER]: 'Gratulacje! Poprawna odpowiedź',
        [TEXT_TIME]: 'Czas: ',
        [TEXT_WRONG_ANSWER]: 'Niestety, błędna odpowiedź...',

    },
    [ENGLISH]: {
        [TEXT_APP_NAME]: 'Wisdom War',
        [TEXT_CHOOSE_CATEGORY]: 'Choose category',
        [TEXT_PLAY_AGAIN]: 'Play again',
        [TEXT_QUESTION]: "That's the question:",
        [TEXT_REMEMBER_DETAILS]: 'Remember the details of the objects',
        [TEXT_CLICK_ON_ANY]: 'Click on any to see the question',
        [TEXT_CORRECT_ANSWER]: 'Congratulations! Correct answer',
        [TEXT_TIME]: 'Time: ',
        [TEXT_WRONG_ANSWER]: 'Unfortunately, the wrong answer ...',
    }
};

export function getTileLabel(id) {
    return TILE_LABELS[window.activeLang][id];
}

const TILE_LABELS = {
    [POLISH]: {
        [TILE_APP_BATTLE]: 'Bitwa',
        [TILE_APP_TRAINING]: 'Trening',
        [TILE_APP_HISTORY]: 'Historia',
        [TILE_APP_FRIEND]: 'Znajomi',
        [TILE_CATEGORY_RANDOM]: 'Losowa',
        [TILE_CATEGORY_MATH]: 'Matematyka',
        [TILE_CATEGORY_MUSIC]: 'Muzyka',
        [TILE_CATEGORY_HISTORY]: 'Historia',
        [TILE_CATEGORY_GEOGRAPHY]: 'Geografia',
        [TILE_CATEGORY_MEMORY]: 'Pamięć',
    },
    [ENGLISH]: {
        [TILE_APP_BATTLE]: 'Battle',
        [TILE_APP_TRAINING]: 'Training',
        [TILE_APP_HISTORY]: 'History',
        [TILE_APP_FRIEND]: 'Friend',
        [TILE_CATEGORY_RANDOM]: 'Random',
        [TILE_CATEGORY_MATH]: 'Math',
        [TILE_CATEGORY_MUSIC]: 'Music',
        [TILE_CATEGORY_HISTORY]: 'History',
        [TILE_CATEGORY_GEOGRAPHY]: 'Geography',
        [TILE_CATEGORY_MEMORY]: 'Memory',
    }
};