import {TILE_TYPE_BATTLE, TILE_TYPE_FRIEND, TILE_TYPE_HISTORY, TILE_TYPE_TRAINING} from "./component/tile/tileHelper";

export const POLISH = 'pl';
export const ENGLISH = 'en';

export const APP_NAME = {
    [POLISH]: 'Wojna na Wiedzę',
    [ENGLISH]: 'Wisdom War',
};

export const TILE_LABELS = {
    [POLISH]: {
        [TILE_TYPE_BATTLE]: 'Bitwa',
        [TILE_TYPE_TRAINING]: 'Trening',
        [TILE_TYPE_HISTORY]: 'Historia',
        [TILE_TYPE_FRIEND]: 'Znajomi',
    },
    [ENGLISH]: {
        [TILE_TYPE_BATTLE]: 'Battle',
        [TILE_TYPE_TRAINING]: 'Training',
        [TILE_TYPE_HISTORY]: 'History',
        [TILE_TYPE_FRIEND]: 'Friend',
    }
};