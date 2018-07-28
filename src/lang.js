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
import {OBJECT_BATTLE_LIST} from "./content/object-group/objectsBattle";

export const POLISH = 'pl';
export const ENGLISH = 'en';

export const TEXT_APP_NAME = 'TEXT_APP_NAME';
export const TEXT_CHOOSE_CATEGORY = 'TEXT_CHOOSE_CATEGORY';
export const TEXT_PLAY_AGAIN = 'TEXT_PLAY_AGAIN';
export const TEXT_QUESTION = 'TEXT_QUESTION';
export const TEXT_REMEMBER_DETAILS = 'TEXT_REMEMBER_DETAILS';
export const TEXT_CLICK_ON_ANY_TO_CONTINUE = 'TEXT_CLICK_ON_ANY_TO_CONTINUE';
export const TEXT_CORRECT_ANSWER = 'TEXT_CORRECT_ANSWER';
export const TEXT_TIME = 'TEXT_TIME';
export const TEXT_WRONG_ANSWER = 'TEXT_WRONG_ANSWER';
export const TEXT_FRIENDS = 'TEXT_FRIENDS';
export const TEXT_ADD_FRIEND = 'TEXT_ADD_FRIEND';
export const TEXT_ADD_FRIEND_TAG = 'TEXT_ADD_FRIEND_TAG';
export const TEXT_WRONG_TAG = 'TEXT_WRONG_TAG';
export const TEXT_REQUEST_SENT = 'TEXT_REQUEST_SENT';
export const TEXT_ADD_FRIEND_ALREADY = 'TEXT_ADD_FRIEND_ALREADY';
export const TEXT_BATTLE_ADD_FRIENDS = 'TEXT_BATTLE_ADD_FRIENDS';
export const TEXT_ADDED = 'TEXT_ADDED';
export const TEXT_START_BATTLE = 'TEXT_START_BATTLE';
export const TEXT_SCORE = 'TEXT_SCORE';
export const TEXT_YOUR_SCORE = 'TEXT_YOUR_SCORE';
export const TEXT_POINTS = 'TEXT_POINTS';
export const TEXT_ANSWER_FOR_QUESTION = 'TEXT_ANSWER_FOR_QUESTION';
export const TEXT_NEXT_QUESTION = 'TEXT_NEXT_QUESTION';
export const TEXT_SUMMARY = 'TEXT_SUMMARY';
export const TEXT_SUGGEST_FRIENDS = 'TEXT_SUGGEST_FRIENDS';
export const TEXT_SUGGESTED_FRIENDS = 'TEXT_SUGGESTED_FRIENDS';
export const TEXT_NONE_FRIENDS = 'TEXT_NONE_FRIENDS';
export const TEXT_ACTUAL_FRIENDS = 'TEXT_ACTUAL_FRIENDS';
export const TEXT_NONE_SUGGESTED_FRIENDS = 'TEXT_NONE_SUGGESTED_FRIENDS';
export const TEXT_NONE_IN_PROGRESS_BATTLES = 'TEXT_NONE_IN_PROGRESS_BATTLES';
export const TEXT_IN_PROGRESS_BATTLES = 'TEXT_IN_PROGRESS_BATTLES';
export const TEXT_INVITES = 'TEXT_INVITES';
export const TEXT_POSITION = 'TEXT_POSITION';
export const TEXT_WAITING_FOR_RESPONSE = 'TEXT_WAITING_FOR_RESPONSE';
export const TEXT_WAITING = 'TEXT_WAITING';

export function getText(id) {
    return TEXTS[window.activeLang][id];
}

const TEXTS = {
    [POLISH]: {
        [TEXT_APP_NAME]: 'Wojna na Wiedzę',
        [TEXT_CHOOSE_CATEGORY]: 'Wybierz kategorię',
        [TEXT_PLAY_AGAIN]: 'Zagraj ponownie',
        [TEXT_QUESTION]: 'Pytanie',
        [TEXT_REMEMBER_DETAILS]: 'Zapamiętaj szczegóły obiektów',
        [TEXT_CLICK_ON_ANY_TO_CONTINUE]: 'Kliknij na dowolny aby kontynuować',
        [TEXT_CORRECT_ANSWER]: 'Gratulacje! Poprawna odpowiedź',
        [TEXT_TIME]: 'Czas',
        [TEXT_WRONG_ANSWER]: 'Niestety, błędna odpowiedź...',
        [TEXT_FRIENDS]: 'Znajomi',
        [TEXT_ADD_FRIEND]: 'Dodaj znajomego',
        [TEXT_ADD_FRIEND_TAG]: 'wpisz tag tutaj',
        [TEXT_WRONG_TAG]: 'nieistniejący tag',
        [TEXT_REQUEST_SENT]: 'wysłano',
        [TEXT_ADD_FRIEND_ALREADY]: 'już wysłano prośbę o dodanie',
        [TEXT_BATTLE_ADD_FRIENDS]: 'Dodaj znajomych do bitwy',
        [TEXT_ADDED]: 'Dodano',
        [TEXT_START_BATTLE]: 'Rozpocznij bitwę!',
        [TEXT_SCORE]: 'Wynik',
        [TEXT_YOUR_SCORE]: 'Twój wynik',
        [TEXT_POINTS]: 'pkt',
        [TEXT_ANSWER_FOR_QUESTION]: 'Odpowiedź dla pytania',
        [TEXT_NEXT_QUESTION]: 'Następne pytanie',
        [TEXT_SUMMARY]: 'Podsumowanie',
        [TEXT_SUGGEST_FRIENDS]: 'Zaproponuj znajomych',
        [TEXT_SUGGESTED_FRIENDS]: 'Proponowani znajomi',
        [TEXT_NONE_FRIENDS]: 'Nie masz jeszcze znajomych',
        [TEXT_ACTUAL_FRIENDS]: 'Twoi znajomi',
        [TEXT_NONE_SUGGESTED_FRIENDS]: 'Nie możemy zaproponować więcej znajomych',
        [TEXT_NONE_IN_PROGRESS_BATTLES]: 'Nie masz aktywnych wyzwań',
        [TEXT_IN_PROGRESS_BATTLES]: 'Aktywne wyzwania',
        [TEXT_INVITES]: 'Zaproszenia',
        [TEXT_POSITION]: 'Pozycja',
        [TEXT_WAITING_FOR_RESPONSE]: 'Oczekiwanie na odpowiedź',
        [TEXT_WAITING]: 'Oczekiwanie',

    },
    [ENGLISH]: {
        [TEXT_APP_NAME]: 'Wisdom War',
        [TEXT_CHOOSE_CATEGORY]: 'Choose category',
        [TEXT_PLAY_AGAIN]: 'Play again',
        [TEXT_QUESTION]: "Question",
        [TEXT_REMEMBER_DETAILS]: 'Remember the details of the objects',
        [TEXT_CLICK_ON_ANY_TO_CONTINUE]: 'Click on any to continue',
        [TEXT_CORRECT_ANSWER]: 'Congratulations! Correct answer',
        [TEXT_TIME]: 'Time',
        [TEXT_WRONG_ANSWER]: 'Unfortunately, the wrong answer ...',
        [TEXT_FRIENDS]: 'Friends',
        [TEXT_ADD_FRIEND]: 'Add friend',
        [TEXT_ADD_FRIEND_TAG]: 'put tag here',
        [TEXT_WRONG_TAG]: 'not existing tag',
        [TEXT_REQUEST_SENT]: 'sent',
        [TEXT_ADD_FRIEND_ALREADY]: 'already requested',
        [TEXT_BATTLE_ADD_FRIENDS]: 'Add friends to battle',
        [TEXT_ADDED]: 'Added',
        [TEXT_START_BATTLE]: 'Start battle!',
        [TEXT_SCORE]: 'Score',
        [TEXT_YOUR_SCORE]: 'Your score',
        [TEXT_POINTS]: 'pt',
        [TEXT_ANSWER_FOR_QUESTION]: 'Answer for question',
        [TEXT_NEXT_QUESTION]: 'Next question',
        [TEXT_SUMMARY]: 'Summary view',
        [TEXT_SUGGEST_FRIENDS]: 'Suggest friends',
        [TEXT_SUGGESTED_FRIENDS]: 'Suggested friends',
        [TEXT_NONE_FRIENDS]: 'You do not have friends yet',
        [TEXT_ACTUAL_FRIENDS]: 'Actual friends',
        [TEXT_NONE_SUGGESTED_FRIENDS]: 'We can not recommend more friends',
        [TEXT_NONE_IN_PROGRESS_BATTLES]: 'You do not have active challenges',
        [TEXT_IN_PROGRESS_BATTLES]: 'Active challenges',
        [TEXT_INVITES]: 'Invites',
        [TEXT_POSITION]: 'Position',
        [TEXT_WAITING_FOR_RESPONSE]: 'Waiting for response',
        [TEXT_WAITING]: 'Waiting',
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
        [OBJECT_BATTLE_LIST]: 'Aktywne wyzwania',
    },
    [ENGLISH]: {
        [OBJECT_APP_BATTLE]: 'Battle',
        [OBJECT_APP_TRAINING]: 'Training',
        [OBJECT_APP_HISTORY]: 'History',
        [OBJECT_APP_FRIEND]: 'Battle',
        [OBJECT_CATEGORY_RANDOM]: 'Random',
        [OBJECT_CATEGORY_MATH]: 'Math',
        [OBJECT_CATEGORY_MUSIC]: 'Music',
        [OBJECT_CATEGORY_HISTORY]: 'History',
        [OBJECT_CATEGORY_GEOGRAPHY]: 'Geography',
        [OBJECT_CATEGORY_MEMORY]: 'Memory',
        [OBJECT_BATTLE_LIST]: 'Active challenges',
    }
};