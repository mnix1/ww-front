import {
    CATEGORY_CHEMISTRY,
    CATEGORY_GEOGRAPHY,
    CATEGORY_MATH, CATEGORY_MEMORY,
    CATEGORY_MUSIC,
    CATEGORY_RANDOM,
    getCategory
} from "../../util/categoryHelper";
import _ from "lodash";

const categories = [
    {
        id: CATEGORY_RANDOM,
        xTarget: .5,
        yTarget: .5,
        imgSrc: getCategory(CATEGORY_RANDOM)
    },
    {
        id: CATEGORY_MUSIC,
    },
    {
        id: CATEGORY_MATH,
    },
    {
        id: CATEGORY_CHEMISTRY,
    },
    {
        id: CATEGORY_GEOGRAPHY,
    },
    {
        id: CATEGORY_MEMORY,
    },
];
const length = categories.length - 1;
const df = 2 * Math.PI / length;

export const OBJECTS_CATEGORY = categories.map((e, i) => {
    if (e.id === CATEGORY_RANDOM) {
        return e;
    }
    let f = i * df;
    if (length % 2 === 1) {
        f -= Math.PI / 2;
    } else {
        f -= df / 2;
    }
    const xTarget = 0.5 + Math.cos(f) * 0.3;
    const yTarget = 0.5 - Math.sin(f) * 0.3;
    return {...e, xTarget, yTarget, imgSrc: getCategory(e.id)}
});
