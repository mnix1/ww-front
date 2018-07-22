import {TILE_APP_BATTLE, TILE_APP_FRIEND, TILE_APP_HISTORY, TILE_APP_TRAINING} from "./component/tile/tileAppHelper";
import {
    TILE_CATEGORY_GEOGRAPHY,
    TILE_CATEGORY_HISTORY,
    TILE_CATEGORY_MATH,
    TILE_CATEGORY_MEMORY, TILE_CATEGORY_MUSIC, TILE_CATEGORY_RANDOM
} from "./component/tile/tileCategoryHelper";
import {TEXT_IMAGE_TASK_RENDERER} from "./util/taskRenderer";

export const POLISH = 'pl';
export const ENGLISH = 'en';

export const APP_NAME = {
    [POLISH]: 'Wojna na Wiedzę',
    [ENGLISH]: 'Wisdom War',
};

export const CATEGORY_CHOOSE_LABEL = {
    [POLISH]: 'Wybierz kategorię',
    [ENGLISH]: 'Choose category',
};

export const PLAY_AGAIN = {
    [POLISH]: 'Zagraj ponownie',
    [ENGLISH]: 'Play again',
};

export const QUESTION = {
    [POLISH]: 'Oto pytanie:',
    [ENGLISH]: "That\'s the question",
};

export const MEMORY_TIP_1 = {
    [POLISH]: 'Zapamiętaj szczegóły obiektów',
    [ENGLISH]: 'Remember the details of the objects',
};

export const MEMORY_TIP_2 = {
    [POLISH]: 'Kliknij na dowolny aby zobaczyć pytanie',
    [ENGLISH]: 'Click on any to see the question',
};

export const CORRECT_ANSWER = {
    [POLISH]: 'Gratulacje! Poprawna odpowiedź',
    [ENGLISH]: 'Congratulations! Correct answer',
};

export const WRONG_ANSWER = {
    [POLISH]: 'Niestety, błędna odpowiedź...',
    [ENGLISH]: 'Unfortunately, the wrong answer ...',
};

export const TILE_LABELS = {
    [POLISH]: {
        [TILE_APP_BATTLE]: 'Bitwa',
        [TILE_APP_TRAINING]: 'Trening',
        [TILE_APP_HISTORY]: 'Historia',
        [TILE_APP_FRIEND]: 'Znajomi',
        [TILE_CATEGORY_RANDOM]: 'Losowa',
        [TILE_CATEGORY_MATH]: 'Matematyka',
        [TILE_CATEGORY_MUSIC]: 'Muzyka',
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
        [TILE_CATEGORY_MUSIC]: 'Music',
        [TILE_CATEGORY_HISTORY]: 'History',
        [TILE_CATEGORY_GEOGRAPHY]: 'Geography',
        [TILE_CATEGORY_MEMORY]: 'Memory',
    }
};