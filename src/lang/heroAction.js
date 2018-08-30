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
    READING_ANSWERS,
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
        [WAITING_FOR_QUESTION]: 'Czeka na pytanie',
        [RECOGNIZING_QUESTION]: 'Poznaje pytanie',
        [THINKING]: 'Myśli',

        [THINK_KNOW_ANSWER]: 'Uważa, że zna odpowiedź',
        [LOOKING_FOR_ANSWER]: 'Szuka odpowiedzi',

        [NO_FOUND_ANSWER_LOOKING_FOR]: 'Nie znalazł odpowiedzi',
        [FOUND_ANSWER_LOOKING_FOR]: 'Znalazł odpowiedź',

        [NOT_SURE_OF_ANSWER]: 'Nie jest pewny odpowiedzi',
        [READING_ANSWERS]: 'Poznaje odpowiedzi',

        [ANSWERED]: 'Odpowiada',
        [SURRENDER]: 'Poddaje się',

        [WILL_GIVE_RANDOM_ANSWER]: 'Będzie strzelał',
        [WONT_GIVE_RANDOM_ANSWER]: 'Nie będzie strzelał',

        [THINKING_WHICH_ANSWER_MATCH]: "Myśli, która odpowiedź pasuje",
        [THINKING_IF_GIVE_RANDOM_ANSWER]: "Myśli czy strzelać",

        [DREAMING_ABOUT_VACATION]: 'Marzy o wakacjach...',
        [SCRATCHING]: 'Drapie się...',
        [YAWNING]: 'Ziewa...',
        [HUNG_UP]: 'Zawiesił się...',
        [NEED_GO_TO_TOILET]: 'Musi do toalety...',
    },
    [ENGLISH]: {
        [WAITING_FOR_QUESTION]: 'Waiting for question',
        [RECOGNIZING_QUESTION]: 'Recognizing question',
        [THINKING]: 'Thinking',

        [THINK_KNOW_ANSWER]: 'Think, that know the answer',
        [LOOKING_FOR_ANSWER]: 'Searching for answer',

        [NO_FOUND_ANSWER_LOOKING_FOR]: 'No found answer',
        [FOUND_ANSWER_LOOKING_FOR]: 'Found answer',

        [NOT_SURE_OF_ANSWER]: 'Not sure of answer',
        [READING_ANSWERS]: 'Recognizing answers',

        [ANSWERED]: 'Answering',
        [SURRENDER]: 'Surrender',

        [WILL_GIVE_RANDOM_ANSWER]: 'Will give random answer',
        [WONT_GIVE_RANDOM_ANSWER]: "Won't give random answer",

        [THINKING_WHICH_ANSWER_MATCH]: "Thinking which answer match",
        [THINKING_IF_GIVE_RANDOM_ANSWER]: "Thinking if give random answer",

        [DREAMING_ABOUT_VACATION]: 'Dreaming about vacation...',
        [SCRATCHING]: 'Scratching...',
        [YAWNING]: 'Yawning...',
        [HUNG_UP]: 'Hung up...',
        [NEED_GO_TO_TOILET]: 'Need go to toilet...',
    }
};