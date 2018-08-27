import {ENGLISH, POLISH} from "./text";

export const WAR_READING_QUESTION = 'WAR_READING_QUESTION';
export const WAR_READING_ANSWERS = 'WAR_READING_ANSWERS';
export const WAR_KNOW_ANSWER = 'WAR_KNOW_ANSWER';
export const WAR_SEARCHING_CORRECT_ANSWER = 'WAR_SEARCHING_CORRECT_ANSWER';
export const WAR_NO_KNOW_ANSWER = 'WAR_NO_KNOW_ANSWER';
export const WAR_THINKING = 'WAR_THINKING';

const TEXTS = {
    [POLISH]: {
        [WAR_READING_QUESTION]: 'Czyta pytanie',
        [WAR_READING_ANSWERS]: 'Czyta odpowiedzi',
        [WAR_KNOW_ANSWER]: 'Zna odpowiedź',
        [WAR_SEARCHING_CORRECT_ANSWER]: 'Szuka poprawnej odpowiedzi',
        [WAR_NO_KNOW_ANSWER]: 'Nie zna odpowiedzi',
        [WAR_THINKING]: 'Myśli',
    },
    [ENGLISH]: {
        [WAR_READING_QUESTION]: 'Reading question',
        [WAR_READING_ANSWERS]: 'Reading answers',
        [WAR_KNOW_ANSWER]: 'Know answer',
        [WAR_SEARCHING_CORRECT_ANSWER]: 'Searching correct answer',
        [WAR_NO_KNOW_ANSWER]: "Doesn't know the answer",
        [WAR_THINKING]: "Thinking",
    },
};

export function getWar(id) {
    return TEXTS[window.activeLang][id];
}