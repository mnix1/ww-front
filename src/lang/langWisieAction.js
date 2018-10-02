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
    THINKING_IF_GIVE_RANDOM_ANSWER,
    HINT_RECEIVED,
    THINKING_IF_USE_HINT,
    WILL_USE_HINT,
    WONT_USE_HINT,
    WATER_PISTOL_USED_ON_IT, CLEANING
} from "../util/wisieActionHelper";
import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../indexApp";

export function getWisieActionLabel(id) {
    return HERO_ACTION_LABELS[getActiveLang()][id];
}
const HERO_ACTION_LABELS = {
    [POLISH]: {
        [WAITING_FOR_QUESTION]: 'Czekam na pytanie',
        [RECOGNIZING_QUESTION]: 'Poznaję pytanie',
        [THINKING]: 'Myślę',

        [THINK_KNOW_ANSWER]: 'Znam odpowiedź',
        [LOOKING_FOR_ANSWER]: 'Tylko która to?',

        [NO_FOUND_ANSWER_LOOKING_FOR]: 'Nie ma takiej',
        [FOUND_ANSWER_LOOKING_FOR]: 'Znalazłem odpowiedź',

        [NOT_SURE_OF_ANSWER]: 'Ale o co chodzi?',
        [RECOGNIZING_ANSWERS]: 'Poznaję odpowiedzi',

        [ANSWERED]: 'Odpowiadam',
        [SURRENDER]: 'Nie, poddaję się',

        [WILL_GIVE_RANDOM_ANSWER]: 'Będę strzelać',
        [WONT_GIVE_RANDOM_ANSWER]: 'Nie będę strzelać',

        [THINKING_WHICH_ANSWER_MATCH]: "Która odpowiedź pasuje?",
        [THINKING_IF_GIVE_RANDOM_ANSWER]: "Może będę strzelać?",

        [HINT_RECEIVED]: "(Podpowiedziano)",
        [THINKING_IF_USE_HINT]: "To dobra podpowiedź?",
        [WILL_USE_HINT]: "Chyba tak",
        [WONT_USE_HINT]: "Raczej nie",

        [WATER_PISTOL_USED_ON_IT]: "(Spryskano wodą)",
        [CLEANING]: "(Sprząta...)",

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

        [HINT_RECEIVED]: "(Hint received)",
        [THINKING_IF_USE_HINT]: "Is hint correct?",
        [WILL_USE_HINT]: "I guess so",
        [WONT_USE_HINT]: "I don't think so",

        [WATER_PISTOL_USED_ON_IT]: "(Sprayed with water)",
        [CLEANING]: "(Cleaning...)",

        [DREAMING_ABOUT_VACATION]: '(Dreaming...)',
        [SCRATCHING]: '(Scratching...)',
        [YAWNING]: '(Yawning...)',
        [HUNG_UP]: '(Hung up...)',
        [NEED_GO_TO_TOILET]: '(Need go to toilet...)',
    }
};