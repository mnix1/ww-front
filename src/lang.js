import {
    OBJECT_CATEGORY_GEOGRAPHY,
    OBJECT_CATEGORY_HISTORY,
    OBJECT_CATEGORY_MATH,
    OBJECT_CATEGORY_MEMORY,
    OBJECT_CATEGORY_MUSIC,
    OBJECT_CATEGORY_RANDOM
} from "./content/object-group/objectsCategory";
import {OBJECT_CHALLENGE_LIST} from "./content/object-group/objectsChallenge";
import {
    BATTLE_ROUTE,
    FRIEND_ROUTE,
    HISTORY_ROUTE,
    SHOP_ROUTE,
    TRAINING_ROUTE,
    WISIES_ROUTE
} from "./content/app/appRoutes";

export const POLISH = 'pl';
export const ENGLISH = 'en';

export const TEXT_APP_NAME = 'TEXT_APP_NAME';
export const TEXT_CATEGORY = 'TEXT_CATEGORY';
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
export const TEXT_CHALLENGE_ADD_FRIENDS = 'TEXT_CHALLENGE_ADD_FRIENDS';
export const TEXT_ADD = 'TEXT_ADD';
export const TEXT_ADDED = 'TEXT_ADDED';
export const TEXT_START_CHALLENGE = 'TEXT_START_CHALLENGE';
export const TEXT_SCORE = 'TEXT_SCORE';
export const TEXT_YOUR_SCORE = 'TEXT_YOUR_SCORE';
export const TEXT_POINTS = 'TEXT_POINTS';
export const TEXT_ANSWER_FOR_QUESTION = 'TEXT_ANSWER_FOR_QUESTION';
export const TEXT_NEXT_QUESTION = 'TEXT_NEXT_QUESTION';
export const TEXT_NEXT = 'TEXT_NEXT';
export const TEXT_SUMMARY = 'TEXT_SUMMARY';
export const TEXT_SUGGEST_FRIENDS = 'TEXT_SUGGEST_FRIENDS';
export const TEXT_SUGGESTED_FRIENDS = 'TEXT_SUGGESTED_FRIENDS';
export const TEXT_NONE_FRIENDS = 'TEXT_NONE_FRIENDS';
export const TEXT_ACTUAL_FRIENDS = 'TEXT_ACTUAL_FRIENDS';
export const TEXT_NONE_SUGGESTED_FRIENDS = 'TEXT_NONE_SUGGESTED_FRIENDS';
export const TEXT_NONE_IN_PROGRESS_CHALLENGES = 'TEXT_NONE_IN_PROGRESS_CHALLENGES';
export const TEXT_IN_PROGRESS_CHALLENGES = 'TEXT_IN_PROGRESS_CHALLENGES';
export const TEXT_INVITES = 'TEXT_INVITES';
export const TEXT_POSITION = 'TEXT_POSITION';
export const TEXT_WAITING_FOR_RESPONSE = 'TEXT_WAITING_FOR_RESPONSE';
export const TEXT_WAITING = 'TEXT_WAITING';
export const TEXT_BATTLE = 'TEXT_BATTLE';
export const TEXT_CHALLENGE = 'TEXT_CHALLENGE';
export const TEXT_DELETE = 'TEXT_DELETE';
export const TEXT_INVITED_TO_BATTLE_BY = 'TEXT_INVITED_TO_BATTLE_BY';
export const TEXT_INVITE_TO_BATTLE = 'TEXT_INVITE_TO_BATTLE';
export const TEXT_ACCEPT = 'TEXT_ACCEPT';
export const TEXT_REJECT = 'TEXT_REJECT';
export const TEXT_CANCEL = 'TEXT_CANCEL';
export const TEXT_FOR = 'TEXT_FOR';
export const TEXT_OPPONENT_CORRECT_ANSWER = 'TEXT_OPPONENT_CORRECT_ANSWER';
export const TEXT_OPPONENT_WRONG_ANSWER = 'TEXT_OPPONENT_WRONG_ANSWER';
export const TEXT_BATTLE_OVER = 'TEXT_BATTLE_OVER';
export const TEXT_THE_WINNER_IS = 'TEXT_THE_WINNER_IS';
export const TEXT_ANSWER = 'TEXT_ANSWER';

export function getText(id) {
    return TEXTS[window.activeLang][id];
}

const TEXTS = {
    [POLISH]: {
        [TEXT_APP_NAME]: 'Wojna na Wiedzę',
        [TEXT_ANSWER]: 'Odpowiedz',
        [TEXT_CATEGORY]: 'Kategoria',
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
        [TEXT_CHALLENGE_ADD_FRIENDS]: 'Dodaj znajomych do wyzwania',
        [TEXT_ADD]: 'Dodaj',
        [TEXT_ADDED]: 'Dodano',
        [TEXT_START_CHALLENGE]: 'Rozpocznij wyzwanie!',
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
        [TEXT_NONE_IN_PROGRESS_CHALLENGES]: 'Nie masz aktywnych wyzwań',
        [TEXT_IN_PROGRESS_CHALLENGES]: 'Aktywne wyzwania',
        [TEXT_INVITES]: 'Zaproszenia',
        [TEXT_POSITION]: 'Pozycja',
        [TEXT_WAITING_FOR_RESPONSE]: 'Oczekiwanie na odpowiedź',
        [TEXT_WAITING]: 'Oczekiwanie',
        [TEXT_BATTLE]: 'Bitwa',
        [TEXT_CHALLENGE]: 'Wyzwanie',
        [TEXT_DELETE]: 'Usuń',
        [TEXT_INVITED_TO_BATTLE_BY]: 'Zostałeś zaproszony do bitwy przez',
        [TEXT_INVITE_TO_BATTLE]: 'Zaprosiłeś do bitwy',
        [TEXT_ACCEPT]: 'Akceptuj',
        [TEXT_REJECT]: 'Odrzuć',
        [TEXT_CANCEL]: 'Anuluj',
        [TEXT_FOR]: 'za',
        [TEXT_OPPONENT_CORRECT_ANSWER]: 'Przeciwnik zaznaczył dobrą odpowiedź',
        [TEXT_OPPONENT_WRONG_ANSWER]: 'Przeciwnik zaznaczył złą odpowiedź',
        [TEXT_BATTLE_OVER]: 'Koniec bitwy!',
        [TEXT_THE_WINNER_IS]: 'Zwycięża',
        [TEXT_NEXT]: 'Następne',
    },
    [ENGLISH]: {
        [TEXT_APP_NAME]: 'Wisdom War',
        [TEXT_ANSWER]: 'Odpowiedz',
        [TEXT_CATEGORY]: 'Category',
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
        [TEXT_CHALLENGE_ADD_FRIENDS]: 'Add friends to challenge',
        [TEXT_ADD]: 'Add',
        [TEXT_ADDED]: 'Added',
        [TEXT_START_CHALLENGE]: 'Start challenge!',
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
        [TEXT_NONE_IN_PROGRESS_CHALLENGES]: 'You do not have active challenges',
        [TEXT_IN_PROGRESS_CHALLENGES]: 'Active challenges',
        [TEXT_INVITES]: 'Invites',
        [TEXT_POSITION]: 'Position',
        [TEXT_WAITING_FOR_RESPONSE]: 'Waiting for response',
        [TEXT_WAITING]: 'Waiting',
        [TEXT_BATTLE]: 'Battle',
        [TEXT_CHALLENGE]: 'Challenge',
        [TEXT_DELETE]: 'Delete',
        [TEXT_INVITED_TO_BATTLE_BY]: 'You have been invited to battle with',
        [TEXT_INVITE_TO_BATTLE]: 'You invited to battle',
        [TEXT_ACCEPT]: 'Accept',
        [TEXT_REJECT]: 'Reject',
        [TEXT_CANCEL]: 'Cancel',
        [TEXT_FOR]: 'for',
        [TEXT_OPPONENT_CORRECT_ANSWER]: 'The opponent marked a correct answer',
        [TEXT_OPPONENT_WRONG_ANSWER]: 'The opponent marked a wrong answer',
        [TEXT_BATTLE_OVER]: 'Battle is over',
        [TEXT_THE_WINNER_IS]: 'The winner is',
        [TEXT_NEXT]: 'Next',
    },
};

export function getObjectLabel(id) {
    return OBJECT_LABELS[window.activeLang][id];
}

const OBJECT_LABELS = {
    [POLISH]: {
        [BATTLE_ROUTE]: 'Bitwa',
        [TRAINING_ROUTE]: 'Trening',
        [HISTORY_ROUTE]: 'Historia',
        [SHOP_ROUTE]: 'Sklep',
        [WISIES_ROUTE]: 'Wiedzaki',
        [FRIEND_ROUTE]: 'Znajomi',
        [OBJECT_CATEGORY_RANDOM]: 'Losowa',
        [OBJECT_CATEGORY_MATH]: 'Matematyka',
        [OBJECT_CATEGORY_MUSIC]: 'Muzyka',
        [OBJECT_CATEGORY_HISTORY]: 'Historia',
        [OBJECT_CATEGORY_GEOGRAPHY]: 'Geografia',
        [OBJECT_CATEGORY_MEMORY]: 'Pamięć',
        [OBJECT_CHALLENGE_LIST]: 'Aktywne wyzwania',
    },
    [ENGLISH]: {
        [BATTLE_ROUTE]: 'Battle',
        [TRAINING_ROUTE]: 'Training',
        [HISTORY_ROUTE]: 'History',
        [SHOP_ROUTE]: 'Shop',
        [WISIES_ROUTE]: 'Wisies',
        [FRIEND_ROUTE]: 'Friends',
        [OBJECT_CATEGORY_RANDOM]: 'Random',
        [OBJECT_CATEGORY_MATH]: 'Math',
        [OBJECT_CATEGORY_MUSIC]: 'Music',
        [OBJECT_CATEGORY_HISTORY]: 'History',
        [OBJECT_CATEGORY_GEOGRAPHY]: 'Geography',
        [OBJECT_CATEGORY_MEMORY]: 'Memory',
        [OBJECT_CHALLENGE_LIST]: 'Active challenges',
    }
};