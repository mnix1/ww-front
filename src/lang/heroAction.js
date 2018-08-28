import {ENGLISH, POLISH} from "./text";
import {
    ANSWERED,
    READING_QUESTION,
    SEARCHING_FOR_ANSWER,
    THINK_KNOW_ANSWER,
    THINKING,
    WAITING_FOR_QUESTION
} from "../util/heroActionHelper";

export function getHeroActionLabel(id) {
    return HERO_ACTION_LABELS[window.activeLang][id];
}

const HERO_ACTION_LABELS = {
    [POLISH]: {
        [WAITING_FOR_QUESTION]: 'Czeka na pytanie',
        [READING_QUESTION]: 'Czyta pytanie',
        [THINKING]: 'Myśli',
        [THINK_KNOW_ANSWER]: 'Uważa, że zna odpowiedź',
        [SEARCHING_FOR_ANSWER]: 'Szuka odpowiedzi',
        [ANSWERED]: 'Odpowiada',
    },
    [ENGLISH]: {
        [WAITING_FOR_QUESTION]: 'Waiting for question',
        [READING_QUESTION]: 'Reading question',
        [THINKING]: 'Thinking',
        [THINK_KNOW_ANSWER]: 'Think, that know the answer',
        [SEARCHING_FOR_ANSWER]: 'Searching for answer',
        [ANSWERED]: 'Answering',
    }
};