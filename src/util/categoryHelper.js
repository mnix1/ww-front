import _ from 'lodash';
import calculator from '../media/image/category/calculator.svg';
import globe from '../media/image/category/globe.svg';
import drive from '../media/image/category/drive.svg';
import piano from '../media/image/category/piano.svg';
import chemistry from '../media/image/category/chemistry.svg';
import questionMark from '../media/image/category/questionMark.svg';

export const CATEGORY_MATH = 'MATH';
export const CATEGORY_MUSIC = 'MUSIC';
export const CATEGORY_HISTORY = 'HISTORY';
export const CATEGORY_GEOGRAPHY = 'GEOGRAPHY';
export const CATEGORY_MEMORY = 'MEMORY';
export const CATEGORY_CHEMISTRY = 'CHEMISTRY';
export const CATEGORY_RANDOM = 'RANDOM';

const CATEGORY = {
    [CATEGORY_RANDOM]: questionMark,
    [CATEGORY_MUSIC]: piano,
    [CATEGORY_GEOGRAPHY]: globe,
    [CATEGORY_MEMORY]: drive,
    [CATEGORY_CHEMISTRY]: chemistry,
    [CATEGORY_MATH]: calculator,
};

export function getCategory(category) {
    return CATEGORY[category];
}
