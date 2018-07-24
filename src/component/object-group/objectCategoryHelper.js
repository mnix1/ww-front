import {OBJECT_MATERIALS} from "./objectMaterialHelper";

export const OBJECT_CATEGORY_MATH = 'MATH';
export const OBJECT_CATEGORY_MUSIC = 'MUSIC';
export const OBJECT_CATEGORY_HISTORY = 'HISTORY';
export const OBJECT_CATEGORY_GEOGRAPHY = 'GEOGRAPHY';
export const OBJECT_CATEGORY_MEMORY = 'MEMORY';
export const OBJECT_CATEGORY_RANDOM = 'RANDOM';

export const OBJECTS_CATEGORY = [
    {
        id: OBJECT_CATEGORY_RANDOM,
        xTarget: .5,
        yTarget: .5,
        material: OBJECT_MATERIALS[21],
    },
    {
        id: OBJECT_CATEGORY_MUSIC,
        xTarget: 3 / 4,
        yTarget: 1 / 4,
        material: OBJECT_MATERIALS[61],
    },
    {
        id: OBJECT_CATEGORY_MATH,
        xTarget: 1 / 4,
        yTarget: 1 / 4,
        material: OBJECT_MATERIALS[23],
    },
    // {
    //     id: OBJECT_CATEGORY_HISTORY,
    //     xTarget: 1 / 4,
    //     yTarget: -1 / 4,
    //     material: OBJECT_MATERIALS[49],
    // },
    {
        id: OBJECT_CATEGORY_GEOGRAPHY,
        xTarget: 1 / 4,
        yTarget: 3 / 4,
        material: OBJECT_MATERIALS[25],
    },
    {
        id: OBJECT_CATEGORY_MEMORY,
        xTarget: 3 / 4,
        yTarget: 3 / 4,
        material: OBJECT_MATERIALS[43],
    },

];