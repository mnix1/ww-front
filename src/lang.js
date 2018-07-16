import {TILE_APP_BATTLE, TILE_APP_FRIEND, TILE_APP_HISTORY, TILE_APP_TRAINING} from "./component/tile/tileAppHelper";
import {
    TILE_CATEGORY_GEOGRAPHY,
    TILE_CATEGORY_HISTORY,
    TILE_CATEGORY_MATH,
    TILE_CATEGORY_MEMORY, TILE_CATEGORY_RANDOM
} from "./component/tile/tileCategoryHelper";

export const POLISH = 'pl';
export const ENGLISH = 'en';

export function getContent(obj) {
    if (window.activeLang === POLISH) {
        return obj.contentPolish;
    }
    if (window.activeLang === ENGLISH) {
        return obj.contentEnglish;
    }
    throw new Error('UNKNOWN LANGUAGE');
}

export const APP_NAME = {
    [POLISH]: 'Wojna na Wiedzę',
    [ENGLISH]: 'Wisdom War',
};

export const CATEGORY_CHOOSE_LABEL = {
    [POLISH]: 'Wybierz kategorię',
    [ENGLISH]: 'Choose category',
};

export const TILE_LABELS = {
    [POLISH]: {
        [TILE_APP_BATTLE]: 'Bitwa',
        [TILE_APP_TRAINING]: 'Trening',
        [TILE_APP_HISTORY]: 'Historia',
        [TILE_APP_FRIEND]: 'Znajomi',
        [TILE_CATEGORY_RANDOM]: 'Losowa',
        [TILE_CATEGORY_MATH]: 'Matematyka',
        [TILE_CATEGORY_HISTORY]: 'Historia',
        [TILE_CATEGORY_GEOGRAPHY]: 'Geografia',
        [TILE_CATEGORY_MEMORY]: 'Pamięć',
    },
    [ENGLISH]: {
        [TILE_APP_BATTLE]: 'Battle',
        [TILE_APP_TRAINING]: 'Training',
        [TILE_APP_HISTORY]: 'History',
        [TILE_APP_FRIEND]: 'Friend',
        [TILE_CATEGORY_RANDOM]: 'Random',
        [TILE_CATEGORY_MATH]: 'Math',
        [TILE_CATEGORY_HISTORY]: 'History',
        [TILE_CATEGORY_GEOGRAPHY]: 'Geography',
        [TILE_CATEGORY_MEMORY]: 'Memory',
    }
};