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
    getCategory
} from "../../util/categoryHelper";

const categories = [
    {
        id: CATEGORY_RANDOM,
        xTarget: .5,
        yTarget: .5,
        imgSrc: getCategory(CATEGORY_RANDOM)
    },
    {
        id: CATEGORY_LYRICS,
    },
    {
        id: CATEGORY_EQUATION,
    },
    {
        id: CATEGORY_NUMBER,
    },
    {
        id: CATEGORY_ELEMENT,
    },
    {
        id: CATEGORY_RIDDLE,
    },
    {
        id: CATEGORY_COUNTRY,
    },
    {
        id: CATEGORY_COLOR,
    },
    {
        id: CATEGORY_TIME,
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
    const xTarget = 0.5 + Math.cos(f) * 0.35;
    const yTarget = 0.5 - Math.sin(f) * 0.35;
    return {...e, xTarget, yTarget, imgSrc: getCategory(e.id)}
});
