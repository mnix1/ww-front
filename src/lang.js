import {
    OBJECT_CATEGORY_GEOGRAPHY,
    OBJECT_CATEGORY_HISTORY,
    OBJECT_CATEGORY_MATH,
    OBJECT_CATEGORY_MEMORY,
    OBJECT_CATEGORY_MUSIC,
    OBJECT_CATEGORY_RANDOM
} from "./content/object-group/objectsCategory";
import {
    OBJECT_APP_BATTLE,
    OBJECT_APP_FRIEND,
    OBJECT_APP_HISTORY,
    OBJECT_APP_TRAINING
} from "./content/object-group/objectsApp";

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
export const TEXT_FRIENDS = 'TEXT_FRIENDS';
export const TEXT_ADD_FRIEND = 'TEXT_ADD_FRIEND';
export const TEXT_ADD_FRIEND_TAG = 'TEXT_ADD_FRIEND_TAG';
export const TEXT_WRONG_TAG = 'TEXT_WRONG_TAG';
export const TEXT_REQUEST_SENT = 'TEXT_REQUEST_SENT';
export const TEXT_ADD_FRIEND_ALREADY = 'TEXT_ADD_FRIEND_ALREADY';

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
        [TEXT_FRIENDS]: 'Znajomi',
        [TEXT_ADD_FRIEND]: 'Dodaj znajomego',
        [TEXT_ADD_FRIEND_TAG]: 'wpisz tag tutaj',
        [TEXT_WRONG_TAG]: 'nieistniejący tag',
        [TEXT_REQUEST_SENT]: 'wysłano',
        [TEXT_ADD_FRIEND_ALREADY]: 'już wysłano prośbę o dodanie',

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
        [TEXT_FRIENDS]: 'Friends',
        [TEXT_ADD_FRIEND]: 'Add friend',
        [TEXT_ADD_FRIEND_TAG]: 'put tag here',
        [TEXT_WRONG_TAG]: 'not existing tag',
        [TEXT_REQUEST_SENT]: 'sent',
        [TEXT_ADD_FRIEND_ALREADY]: 'already requested',
    }
};

export function getTileLabel(id) {
    return OBJECT_LABELS[window.activeLang][id];
}

const OBJECT_LABELS = {
    [POLISH]: {
        [OBJECT_APP_BATTLE]: 'Bitwa',
        [OBJECT_APP_TRAINING]: 'Trening',
        [OBJECT_APP_HISTORY]: 'Historia',
        [OBJECT_APP_FRIEND]: 'Znajomi',
        [OBJECT_CATEGORY_RANDOM]: 'Losowa',
        [OBJECT_CATEGORY_MATH]: 'Matematyka',
        [OBJECT_CATEGORY_MUSIC]: 'Muzyka',
        [OBJECT_CATEGORY_HISTORY]: 'Historia',
        [OBJECT_CATEGORY_GEOGRAPHY]: 'Geografia',
        [OBJECT_CATEGORY_MEMORY]: 'Pamięć',
    },
    [ENGLISH]: {
        [OBJECT_APP_BATTLE]: 'Battle',
        [OBJECT_APP_TRAINING]: 'Training',
        [OBJECT_APP_HISTORY]: 'History',
        [OBJECT_APP_FRIEND]: 'Friend',
        [OBJECT_CATEGORY_RANDOM]: 'Random',
        [OBJECT_CATEGORY_MATH]: 'Math',
        [OBJECT_CATEGORY_MUSIC]: 'Music',
        [OBJECT_CATEGORY_HISTORY]: 'History',
        [OBJECT_CATEGORY_GEOGRAPHY]: 'Geography',
        [OBJECT_CATEGORY_MEMORY]: 'Memory',
    }
};