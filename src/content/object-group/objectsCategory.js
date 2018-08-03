import {OBJECT_MATERIALS} from "../../component/object-group/objectMaterialHelper";
import calculator from '../../media/image/category/calculator.svg';
import globe from '../../media/image/category/globe.svg';
import drive from '../../media/image/category/drive.svg';
import piano from '../../media/image/category/piano.svg';
import questionMark from '../../media/image/category/questionMark.svg';

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
        imgSrc: questionMark
    },
    {
        id: OBJECT_CATEGORY_MUSIC,
        xTarget: 3 / 4,
        yTarget: 1 / 4,
        imgSrc: piano
    },
    {
        id: OBJECT_CATEGORY_MATH,
        xTarget: 1 / 4,
        yTarget: 1 / 4,
        imgSrc: calculator
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
        imgSrc: globe,
    },
    {
        id: OBJECT_CATEGORY_MEMORY,
        xTarget: 3 / 4,
        yTarget: 3 / 4,
        imgSrc: drive,
    },

];