import {ENGLISH, POLISH} from "./text";
import {
    ANSWERED,
    DREAMING_ABOUT_VACATION,
    HUNG_UP,
    NEED_GO_TO_TOILET,
    RECOGNIZING_QUESTION,
    SCRATCHING,
    LOOKING_FOR_ANSWER,
    THINK_KNOW_ANSWER,
    THINKING,
    WAITING_FOR_QUESTION,
    YAWNING,
    NO_FOUND_ANSWER_LOOKING_FOR,
    FOUND_ANSWER_LOOKING_FOR,
    NOT_SURE_OF_ANSWER,
    RECOGNIZING_ANSWERS,
    SURRENDER,
    WILL_GIVE_RANDOM_ANSWER,
    WONT_GIVE_RANDOM_ANSWER,
    THINKING_WHICH_ANSWER_MATCH,
    THINKING_IF_GIVE_RANDOM_ANSWER
} from "../util/heroActionHelper";

export function getHeroActionLabel(id) {
    return HERO_ACTION_LABELS[window.activeLang][id];
}
const HERO_ACTION_LABELS = {
    [POLISH]: {
        [WAITING_FOR_QUESTION]: 'Czekam na pytanie',
        [RECOGNIZING_QUESTION]: 'Poznaję pytanie',
        [THINKING]: 'Myślę',

        [THINK_KNOW_ANSWER]: 'Znam odpowiedź',
        [LOOKING_FOR_ANSWER]: 'Szukam odpowiedzi',

        [NO_FOUND_ANSWER_LOOKING_FOR]: 'Nie ma tej odpowiedzi',
        [FOUND_ANSWER_LOOKING_FOR]: 'Znalazłem odpowiedź',

        [NOT_SURE_OF_ANSWER]: 'Nie znam odpowiedzi',
        [RECOGNIZING_ANSWERS]: 'Poznaję odpowiedzi',

        [ANSWERED]: 'Odpowiadam',
        [SURRENDER]: 'Poddaję się',

        [WILL_GIVE_RANDOM_ANSWER]: 'Będę strzelać',
        [WONT_GIVE_RANDOM_ANSWER]: 'Nie będę strzelać',

        [THINKING_WHICH_ANSWER_MATCH]: "Która odpowiedź pasuje?",
        [THINKING_IF_GIVE_RANDOM_ANSWER]: "Może będę strzelać?",

        [DREAMING_ABOUT_VACATION]: '(Marzy o wakacjach...)',
        [SCRATCHING]: '(Drapie się...)',
        [YAWNING]: '(Ziewa...)',
        [HUNG_UP]: '(Zawiesił się...)',
        [NEED_GO_TO_TOILET]: '(Musi do toalety...)',
    },
    [ENGLISH]: {
        [WAITING_FOR_QUESTION]: 'Waiting for question',
        [RECOGNIZING_QUESTION]: 'Recognizing question',
        [THINKING]: 'Thinking',

        [THINK_KNOW_ANSWER]: 'Know the answer',
        [LOOKING_FOR_ANSWER]: 'Searching for answer',

        [NO_FOUND_ANSWER_LOOKING_FOR]: 'No found answer',
        [FOUND_ANSWER_LOOKING_FOR]: 'Found answer',

        [NOT_SURE_OF_ANSWER]: 'Not sure of answer',
        [RECOGNIZING_ANSWERS]: 'Recognizing answers',

        [ANSWERED]: 'Answering',
        [SURRENDER]: 'Surrender',

        [WILL_GIVE_RANDOM_ANSWER]: 'Will give random answer',
        [WONT_GIVE_RANDOM_ANSWER]: "Won't give random answer",

        [THINKING_WHICH_ANSWER_MATCH]: "Which answer match?",
        [THINKING_IF_GIVE_RANDOM_ANSWER]: "Give random answer?",

        [DREAMING_ABOUT_VACATION]: '(Dreaming...)',
        [SCRATCHING]: '(Scratching...)',
        [YAWNING]: '(Yawning...)',
        [HUNG_UP]: '(Hung up...)',
        [NEED_GO_TO_TOILET]: '(Need go to toilet...)',
    }
};