import {
    CATEGORY_COLOR,
    CATEGORY_COUNTRY,
    CATEGORY_ELEMENT,
    CATEGORY_EQUATION,
    CATEGORY_LYRICS,
    CATEGORY_MEMORY,
    CATEGORY_NUMBER,
    CATEGORY_OLYMPIC_GAMES,
    CATEGORY_RANDOM,
    CATEGORY_RIDDLE,
    CATEGORY_TIME,
} from "../util/categoryHelper";
import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../index";

export function getCategoryLabel(id, lang) {
    return CATEGORY_LABELS[lang || getActiveLang()][id];
}

const CATEGORY_LABELS = {
    [POLISH]: {
        [CATEGORY_RANDOM]: 'Losowa',
        [CATEGORY_EQUATION]: 'Równania',
        [CATEGORY_NUMBER]: 'Liczby',
        [CATEGORY_LYRICS]: 'Piosenki',
        [CATEGORY_COUNTRY]: 'Państwa',
        [CATEGORY_MEMORY]: 'Pamięć',
        [CATEGORY_ELEMENT]: 'Pierwiastki',
        [CATEGORY_RIDDLE]: 'Zagadki',
        [CATEGORY_COLOR]: 'Kolory',
        [CATEGORY_TIME]: 'Czas',
        [CATEGORY_OLYMPIC_GAMES]: 'Olimpiady',
    },
    [ENGLISH]: {
        [CATEGORY_RANDOM]: 'Random',
        [CATEGORY_EQUATION]: 'Equations',
        [CATEGORY_NUMBER]: 'Numbers',
        [CATEGORY_LYRICS]: 'Lyrics',
        [CATEGORY_COUNTRY]: 'Countries',
        [CATEGORY_MEMORY]: 'Memory',
        [CATEGORY_ELEMENT]: 'Chemical Elements',
        [CATEGORY_RIDDLE]: 'Puzzles',
        [CATEGORY_COLOR]: 'Colors',
        [CATEGORY_TIME]: 'Time',
        [CATEGORY_OLYMPIC_GAMES]: 'Olympic Games',
    }
};