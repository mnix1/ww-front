import {
    CATEGORY_GEOGRAPHY,
    CATEGORY_MATH, CATEGORY_MEMORY,
    CATEGORY_MUSIC,
    CATEGORY_RANDOM,
    getCategory
} from "../../util/categoryHelper";

export const OBJECTS_CATEGORY = [
    {
        id: CATEGORY_RANDOM,
        xTarget: .5,
        yTarget: .5,
        imgSrc: getCategory(CATEGORY_RANDOM)
    },
    {
        id: CATEGORY_MUSIC,
        xTarget: 3 / 4,
        yTarget: 1 / 4,
        imgSrc: getCategory(CATEGORY_MUSIC)
    },
    {
        id: CATEGORY_MATH,
        xTarget: 1 / 4,
        yTarget: 1 / 4,
        imgSrc: getCategory(CATEGORY_MATH)
    },
    // {
    //     id: CATEGORY_HISTORY,
    //     xTarget: 1 / 4,
    //     yTarget: -1 / 4,
    //     material: OBJECT_MATERIALS[49],
    // },
    {
        id: CATEGORY_GEOGRAPHY,
        xTarget: 1 / 4,
        yTarget: 3 / 4,
        imgSrc: getCategory(CATEGORY_GEOGRAPHY)
    },
    {
        id: CATEGORY_MEMORY,
        xTarget: 3 / 4,
        yTarget: 3 / 4,
        imgSrc: getCategory(CATEGORY_MEMORY)
    },

];