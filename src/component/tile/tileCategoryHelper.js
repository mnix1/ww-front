import _ from 'lodash';

export const TILE_CATEGORY_MATH = 'MATH';
export const TILE_CATEGORY_HISTORY = 'HISTORY';
export const TILE_CATEGORY_GEOGRAPHY = 'GEOGRAPHY';
export const TILE_CATEGORY_MEMORY = 'MEMORY';
export const TILE_CATEGORY_RANDOM = 'RANDOM';

export const TILES_CATEGORY = [
    {
        id: TILE_CATEGORY_MATH,
        xTarget: -1 / 4,
        yTarget: -1 / 4,
    },
    {
        id: TILE_CATEGORY_HISTORY,
        xTarget: 1 / 4,
        yTarget: -1 / 4,
    },
    {
        id: TILE_CATEGORY_GEOGRAPHY,
        xTarget: -1 / 4,
        yTarget: 1 / 4,
    },
    {
        id: TILE_CATEGORY_MEMORY,
        xTarget: 1 / 4,
        yTarget: 1 / 4,
    },
    {
        id: TILE_CATEGORY_RANDOM,
        xTarget: 0,
        yTarget: 0,
    }
];

export function isCategoryId(id) {
    return _.some(TILES_CATEGORY, e => e.id === id);
}