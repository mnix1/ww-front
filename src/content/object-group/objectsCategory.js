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
    getCategory
} from "../../util/categoryHelper";

const randomCategory = {
    id: CATEGORY_RANDOM,
    xTarget: .5,
    yTarget: .5,
    imgSrc: getCategory(CATEGORY_RANDOM)
};
const categories = [
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
        id: CATEGORY_OLYMPIC_GAMES,
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

const df = 2 * Math.PI / categories.length;

export const OBJECTS_CATEGORY_CIRCLE = categories.map((e, i) => {
    let f = i * df;
    if (categories.length % 2 === 1) {
        f -= Math.PI / 2;
    } else {
        f -= df / 2;
    }
    const xTarget = 0.5 + Math.cos(f) * 0.35;
    const yTarget = 0.5 - Math.sin(f) * 0.35;
    return {...e, xTarget, yTarget, imgSrc: getCategory(e.id)}
});

export const OBJECTS_CATEGORY_CIRCLE_WITH_RANDOM = OBJECTS_CATEGORY_CIRCLE.concat(randomCategory);

const factor = 1 / ((categories.length / 2) - 1);

export const OBJECTS_CATEGORY_HEIGHT = categories.map((e, i) => {
    const f = i < categories.length / 2 ? -1 : 1;
    const g = ((i % (categories.length / 2)) * factor - .5) * .5;
    const xTarget = 0.5 + f * 0.1;
    const yTarget = .5 + g;
    return {...e, xTarget, yTarget, imgSrc: getCategory(e.id)}
});
export const OBJECTS_CATEGORY_WIDTH = OBJECTS_CATEGORY_HEIGHT.map((e, i) => ({
    ...e,
    yTarget: e.xTarget > 0.5 ? e.xTarget + 0.15 : e.xTarget - 0.15,
    xTarget: e.yTarget
}));

export const OBJECTS_CATEGORY_HEIGHT_WITH_RANDOM = OBJECTS_CATEGORY_HEIGHT.concat({...randomCategory, yTarget: 0.12});
export const OBJECTS_CATEGORY_WIDTH_WITH_RANDOM = OBJECTS_CATEGORY_WIDTH.concat(randomCategory);

