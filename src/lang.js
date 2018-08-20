import React from 'react';

import {OBJECT_CHALLENGE_LIST} from "./content/object-group/objectsChallenge";
import {
    BATTLE_FAST_ROUTE,
    BATTLE_ROUTE,
    CHALLENGE_FAST_ROUTE,
    CHALLENGE_HISTORY_ROUTE,
    CHALLENGE_LIST_ROUTE,
    FRIEND_ROUTE,
    HISTORY_ROUTE,
    PLAY_ROUTE, PROFILE_ROUTE,
    SHOP_ROUTE,
    TRAINING_ROUTE,
    WISIES_ROUTE
} from "./content/routes";
import {
    CATEGORY_COUNTRY,
    CATEGORY_ELEMENT,
    CATEGORY_EQUATION,
    CATEGORY_LYRICS,
    CATEGORY_MEMORY,
    CATEGORY_NUMBER,
    CATEGORY_RANDOM, CATEGORY_RIDDLE, CATEGORY_TIME,
} from "./util/categoryHelper";

export const POLISH = 'pl';
export const ENGLISH = 'en';

export const TEXT_APP_NAME = 'TEXT_APP_NAME';
export const TEXT_OPPONENT_SURRENDER = 'TEXT_OPPONENT_SURRENDER';
export const TEXT_YOU_SURRENDER = 'TEXT_YOU_SURRENDER';
export const TEXT_SURRENDER = 'TEXT_SURRENDER';
export const TEXT_OPPONENT_CHOOSING = 'TEXT_OPPONENT_CHOOSING';
export const TEXT_NOT_CHOSEN_TASK_PROPS = 'TEXT_NOT_CHOSEN_TASK_PROPS';
export const TEXT_CONTINUE = 'TEXT_CONTINUE';
export const TEXT_CATEGORY = 'TEXT_CATEGORY';
export const TEXT_DIFFICULT = 'TEXT_DIFFICULT';
export const TEXT_DRAW_CATEGORY = 'TEXT_DRAW_CATEGORY';
export const TEXT_DRAW_DIFFICULT = 'TEXT_DRAW_DIFFICULT';
export const TEXT_CHOOSE_CATEGORY = 'TEXT_CHOOSE_CATEGORY';
export const TEXT_CHOOSE_DIFFICULT = 'TEXT_CHOOSE_DIFFICULT';
export const TEXT_PLAY_AGAIN = 'TEXT_PLAY_AGAIN';
export const TEXT_QUESTION = 'TEXT_QUESTION';
export const TEXT_REMEMBER_DETAILS = 'TEXT_REMEMBER_DETAILS';
export const TEXT_CLICK_ON_ANY_TO_CONTINUE = 'TEXT_CLICK_ON_ANY_TO_CONTINUE';
export const TEXT_CORRECT_ANSWER = 'TEXT_CORRECT_ANSWER';
export const TEXT_IS_CORRECT = 'TEXT_IS_CORRECT';
export const TEXT_TIME = 'TEXT_TIME';
export const TEXT_WRONG_ANSWER = 'TEXT_WRONG_ANSWER';
export const TEXT_IS_WRONG = 'TEXT_IS_WRONG';
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
export const TEXT_CHALLENGE_ENDED = 'TEXT_CHALLENGE_ENDED';
export const TEXT_YOUR_SCORE = 'TEXT_YOUR_SCORE';
export const TEXT_POINTS = 'TEXT_POINTS';
export const TEXT_ANSWER_FOR_QUESTION = 'TEXT_ANSWER_FOR_QUESTION';
export const TEXT_QUESTION_PREPARING = 'TEXT_QUESTION_PREPARING';
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
export const TEXT_NONE_CLOSED_CHALLENGES = 'TEXT_NONE_CLOSED_CHALLENGES';
export const TEXT_CLOSED_CHALLENGES = 'TEXT_CLOSED_CHALLENGES';
export const TEXT_INVITES = 'TEXT_INVITES';
export const TEXT_POSITION = 'TEXT_POSITION';
export const TEXT_WAITING_FOR_RESPONSE = 'TEXT_WAITING_FOR_RESPONSE';
export const TEXT_WAITING = 'TEXT_WAITING';
export const TEXT_BATTLE = 'TEXT_BATTLE';
export const TEXT_CHALLENGE = 'TEXT_CHALLENGE';
export const TEXT_DELETE = 'TEXT_DELETE';
export const TEXT_INVITED_TO_BATTLE_BY = 'TEXT_INVITED_TO_BATTLE_BY';
export const TEXT_INVITE_TO_BATTLE = 'TEXT_INVITE_TO_BATTLE';
export const TEXT_SEARCHING_OPPONENT = 'TEXT_SEARCHING_OPPONENT';
export const TEXT_ACCEPT = 'TEXT_ACCEPT';
export const TEXT_REJECT = 'TEXT_REJECT';
export const TEXT_CANCEL = 'TEXT_CANCEL';
export const TEXT_FOR = 'TEXT_FOR';
export const TEXT_WAIT = 'TEXT_WAIT';
export const TEXT_OPPONENT_CORRECT_ANSWER = 'TEXT_OPPONENT_CORRECT_ANSWER';
export const TEXT_OPPONENT_WRONG_ANSWER = 'TEXT_OPPONENT_WRONG_ANSWER';
export const TEXT_BATTLE_OVER = 'TEXT_BATTLE_OVER';
export const TEXT_THE_WINNER_IS = 'TEXT_THE_WINNER_IS';
export const TEXT_DRAW = 'TEXT_DRAW';
export const TEXT_ANSWER = 'TEXT_ANSWER';
export const TEXT_YOU = 'TEXT_YOU';
export const TEXT_OWNED_WISIES = 'TEXT_OWNED_WISIES';
export const TEXT_NOT_OWNED_WISIES = 'TEXT_NOT_OWNED_WISIES';
export const TEXT_ANSWERED = 'TEXT_ANSWERED';
export const TEXT_NO_ANSWER = 'TEXT_NO_ANSWER';
export const TEXT_CORRECT = 'TEXT_CORRECT';
export const TEXT_WRONG = 'TEXT_WRONG';

const TEXTS = {
    [POLISH]: {
        [TEXT_APP_NAME]: 'Wojna na Wiedzę',
        [TEXT_YOU_SURRENDER]: 'Poddałeś się',
        [TEXT_DRAW]: 'Remis',
        [TEXT_OPPONENT_SURRENDER]: 'Przeciwnik się poddał',
        [TEXT_SURRENDER]: 'Poddaj się',
        [TEXT_OPPONENT_CHOOSING]: 'Przeciwnik wybiera kategorię i trudność',
        [TEXT_NOT_CHOSEN_TASK_PROPS]: 'Nie wybrano kategorii i trudności',
        [TEXT_OWNED_WISIES]: 'Twoje wiedzaki',
        [TEXT_NOT_OWNED_WISIES]: 'Wiedzaki do odkrycia',
        [TEXT_SEARCHING_OPPONENT]: 'Wyszukiwanie godnego przeciwnika',
        [TEXT_QUESTION_PREPARING]: 'Przygotowywanie pytania',
        [TEXT_DRAW_CATEGORY]: 'Losowanie kategorii',
        [TEXT_DRAW_DIFFICULT]: 'Losowanie trudności',
        [TEXT_ANSWER]: 'Odpowiedz',
        [TEXT_ANSWERED]: 'Odpowiedział',
        [TEXT_CORRECT]: 'Poprawnie',
        [TEXT_WRONG]: 'Błędnie',
        [TEXT_CONTINUE]: 'Kontynuuj',
        [TEXT_CATEGORY]: 'Kategoria',
        [TEXT_DIFFICULT]: 'Trudność',
        [TEXT_CHOOSE_CATEGORY]: 'Wybierz kategorię',
        [TEXT_CHOOSE_DIFFICULT]: 'Wybierz trudność',
        [TEXT_PLAY_AGAIN]: 'Zagraj ponownie',
        [TEXT_QUESTION]: 'Pytanie',
        [TEXT_REMEMBER_DETAILS]: 'Zapamiętaj szczegóły obiektów',
        [TEXT_CLICK_ON_ANY_TO_CONTINUE]: 'Kliknij na dowolny aby kontynuować',
        [TEXT_CORRECT_ANSWER]: 'Gratulacje! Poprawna odpowiedź',
        [TEXT_IS_CORRECT]: 'jest poprawna',
        [TEXT_TIME]: 'Czas',
        [TEXT_WRONG_ANSWER]: 'Niestety, błędna odpowiedź...',
        [TEXT_IS_WRONG]: 'jest błędna',
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
        [TEXT_CHALLENGE_ENDED]: 'Wyzwanie zakończone',
        [TEXT_YOUR_SCORE]: 'Twój wynik',
        [TEXT_POINTS]: 'pkt',
        [TEXT_ANSWER_FOR_QUESTION]: 'Odpowiedź dla pytania',
        [TEXT_NEXT_QUESTION]: 'Następne pytanie',
        [TEXT_SUMMARY]: 'Podsumowanie',
        [TEXT_SUGGEST_FRIENDS]: 'Zaproponuj znajomych',
        [TEXT_SUGGESTED_FRIENDS]: 'Proponowani znajomi',
        [TEXT_NONE_FRIENDS]: 'Nie masz znajomych',
        [TEXT_ACTUAL_FRIENDS]: 'Twoi znajomi',
        [TEXT_NONE_SUGGESTED_FRIENDS]: 'Nie możemy zaproponować więcej znajomych',
        [TEXT_NONE_IN_PROGRESS_CHALLENGES]: 'Nie masz aktywnych wyzwań',
        [TEXT_NONE_CLOSED_CHALLENGES]: 'Nie miałeś jeszcze wyzwań',
        [TEXT_IN_PROGRESS_CHALLENGES]: 'Aktywne wyzwania',
        [TEXT_CLOSED_CHALLENGES]: 'Niedawne wyzwania',
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
        [TEXT_WAIT]: 'Poczekaj',
        [TEXT_OPPONENT_CORRECT_ANSWER]: 'Przeciwnik zaznaczył dobrą odpowiedź',
        [TEXT_OPPONENT_WRONG_ANSWER]: 'Przeciwnik zaznaczył złą odpowiedź',
        [TEXT_BATTLE_OVER]: 'Koniec bitwy!',
        [TEXT_THE_WINNER_IS]: 'Zwycięża',
        [TEXT_NEXT]: 'Następne',
        [TEXT_YOU]: 'Ty',
        [TEXT_NO_ANSWER]: 'Nie udzielono odpowiedzi',
    },
    [ENGLISH]: {
        [TEXT_APP_NAME]: 'Wisdom War',
        [TEXT_YOU_SURRENDER]: 'You surrender',
        [TEXT_DRAW]: 'Draw',
        [TEXT_OPPONENT_SURRENDER]: 'Your opponent has surrender',
        [TEXT_SURRENDER]: 'Surrender',
        [TEXT_OPPONENT_CHOOSING]: 'The opponent chooses the category and difficulty',
        [TEXT_NOT_CHOSEN_TASK_PROPS]: 'Category and difficulty were not selected',
        [TEXT_OWNED_WISIES]: 'Owned wisies',
        [TEXT_NOT_OWNED_WISIES]: 'Wisies to discover',
        [TEXT_SEARCHING_OPPONENT]: 'Searching for worthy opponent',
        [TEXT_QUESTION_PREPARING]: 'Question preparing',
        [TEXT_DRAW_CATEGORY]: 'Drawing category',
        [TEXT_DRAW_DIFFICULT]: 'Drawing difficult',
        [TEXT_ANSWER]: 'Answer',
        [TEXT_ANSWERED]: 'Answered',
        [TEXT_CORRECT]: 'Correct',
        [TEXT_WRONG]: 'Wrong',
        [TEXT_CONTINUE]: 'Continue',
        [TEXT_CATEGORY]: 'Category',
        [TEXT_DIFFICULT]: 'Difficult',
        [TEXT_CHOOSE_CATEGORY]: 'Choose category',
        [TEXT_CHOOSE_DIFFICULT]: 'Choose difficult',
        [TEXT_PLAY_AGAIN]: 'Play again',
        [TEXT_QUESTION]: "Question",
        [TEXT_REMEMBER_DETAILS]: 'Remember the details of the objects',
        [TEXT_CLICK_ON_ANY_TO_CONTINUE]: 'Click on any to continue',
        [TEXT_CORRECT_ANSWER]: 'Congratulations! Correct answer',
        [TEXT_IS_CORRECT]: 'is correct',
        [TEXT_TIME]: 'Time',
        [TEXT_WRONG_ANSWER]: 'Unfortunately, the wrong answer ...',
        [TEXT_IS_WRONG]: 'is wrong',
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
        [TEXT_CHALLENGE_ENDED]: 'Challenge ended',
        [TEXT_YOUR_SCORE]: 'Your score',
        [TEXT_POINTS]: 'pt',
        [TEXT_ANSWER_FOR_QUESTION]: 'Answer for question',
        [TEXT_NEXT_QUESTION]: 'Next question',
        [TEXT_SUMMARY]: 'Summary view',
        [TEXT_SUGGEST_FRIENDS]: 'Suggest friends',
        [TEXT_SUGGESTED_FRIENDS]: 'Suggested friends',
        [TEXT_NONE_FRIENDS]: 'You do not have friends',
        [TEXT_ACTUAL_FRIENDS]: 'Actual friends',
        [TEXT_NONE_SUGGESTED_FRIENDS]: 'We can not recommend more friends',
        [TEXT_NONE_IN_PROGRESS_CHALLENGES]: 'You do not have active challenges',
        [TEXT_NONE_CLOSED_CHALLENGES]: 'You do not have any challenges yet',
        [TEXT_IN_PROGRESS_CHALLENGES]: 'Active challenges',
        [TEXT_CLOSED_CHALLENGES]: 'Recent challenges',
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
        [TEXT_WAIT]: 'Wait',
        [TEXT_OPPONENT_CORRECT_ANSWER]: 'The opponent marked a correct answer',
        [TEXT_OPPONENT_WRONG_ANSWER]: 'The opponent marked a wrong answer',
        [TEXT_BATTLE_OVER]: 'Battle is over',
        [TEXT_THE_WINNER_IS]: 'The winner is',
        [TEXT_NEXT]: 'Next',
        [TEXT_YOU]: 'You',
        [TEXT_NO_ANSWER]: 'No answer',
    },
};


export function getRouteLabel(id) {
    return ROUTE_LABELS[window.activeLang][id];
}


const ROUTE_LABELS = {
    [POLISH]: {
        [PLAY_ROUTE]: 'Graj',
        [BATTLE_ROUTE]: 'Bitwa',
        [TRAINING_ROUTE]: 'Trening',
        [HISTORY_ROUTE]: 'Historia',
        [SHOP_ROUTE]: 'Sklep',
        [WISIES_ROUTE]: 'Wiedzaki',
        [FRIEND_ROUTE]: 'Znajomi',
        [PROFILE_ROUTE]: 'Profil',
        [BATTLE_FAST_ROUTE]: <span>Szybka<br/>bitwa</span>,
        [CHALLENGE_FAST_ROUTE]: <span>Szybkie<br/>wyzwanie</span>,
        [CHALLENGE_LIST_ROUTE]: <span>Aktywne<br/>wyzwania</span>,
        [CHALLENGE_HISTORY_ROUTE]: <span>Historia<br/>wyzwań</span>,
    },
    [ENGLISH]: {
        [PLAY_ROUTE]: 'Play',
        [BATTLE_ROUTE]: 'Battle',
        [TRAINING_ROUTE]: 'Training',
        [HISTORY_ROUTE]: 'History',
        [SHOP_ROUTE]: 'Shop',
        [WISIES_ROUTE]: 'Wisies',
        [FRIEND_ROUTE]: 'Friends',
        [PROFILE_ROUTE]: 'Profile',
        [BATTLE_FAST_ROUTE]: <span>Fast<br/>battle</span>,
        [CHALLENGE_FAST_ROUTE]: <span>Fast<br/>challenge</span>,
        [CHALLENGE_LIST_ROUTE]: <span>Active<br/>challenge</span>,
        [CHALLENGE_HISTORY_ROUTE]: <span>Challenge<br/>history</span>,
    }
};

export function getText(id) {
    return TEXTS[window.activeLang][id];
}

export function getCategoryLabel(id) {
    return CATEGORY_LABELS[window.activeLang][id];
}

const CATEGORY_LABELS = {
    [POLISH]: {
        [CATEGORY_RANDOM]: 'Losowa',
        [CATEGORY_EQUATION]: 'Równania',
        [CATEGORY_NUMBER]: 'Liczby',
        [CATEGORY_LYRICS]: 'Teksty piosenek',
        [CATEGORY_COUNTRY]: 'Państwa',
        [CATEGORY_MEMORY]: 'Pamięć',
        [CATEGORY_ELEMENT]: 'Pierwiastki',
        [CATEGORY_RIDDLE]: 'Zagadki',
        [CATEGORY_TIME]: 'Czas',
        [OBJECT_CHALLENGE_LIST]: 'Aktywne wyzwania',
    },
    [ENGLISH]: {
        [CATEGORY_RANDOM]: 'Random',
        [CATEGORY_EQUATION]: 'Equations',
        [CATEGORY_NUMBER]: 'Numbers',
        [CATEGORY_LYRICS]: 'Lyrics',
        [CATEGORY_COUNTRY]: 'Countries',
        [CATEGORY_MEMORY]: 'Memory',
        [CATEGORY_ELEMENT]: 'Elements',
        [CATEGORY_RIDDLE]: 'Riddles',
        [CATEGORY_TIME]: 'Time',
        [OBJECT_CHALLENGE_LIST]: 'Active challenges',
    }
};


export function getHeroName(hero) {
    if(window.activeLang === POLISH){
        return hero.namePolish;
    }
    if(window.activeLang === ENGLISH){
        return hero.nameEnglish;
    }
    return null;
}