import {OBJECT_CHALLENGE_LIST} from "../content/object-group/objectsChallenge";
import {
    CATEGORY_COUNTRY,
    CATEGORY_ELEMENT,
    CATEGORY_EQUATION,
    CATEGORY_LYRICS,
    CATEGORY_MEMORY,
    CATEGORY_NUMBER,
    CATEGORY_RANDOM,
    CATEGORY_RIDDLE,
    CATEGORY_COLOR,
    CATEGORY_TIME,
} from "../util/categoryHelper";
import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../indexApp";

export function getCategoryLabel(id) {
    return CATEGORY_LABELS[getActiveLang()][id];
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
        [CATEGORY_COLOR]: 'Kolory',
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
        [CATEGORY_COLOR]: 'Colors',
        [CATEGORY_TIME]: 'Time',
        [OBJECT_CHALLENGE_LIST]: 'Active challenges',
    }
};