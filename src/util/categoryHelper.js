import calculator from '../media/image/category/calculator.svg';
import number from '../media/image/category/number.svg';
import globe from '../media/image/category/globe.svg';
import drive from '../media/image/category/drive.svg';
import piano from '../media/image/category/piano.svg';
import atom from '../media/image/category/atom.svg';
import questionMark from '../media/image/category/questionMark.svg';

export const CATEGORY_EQUATION = 'EQUATION';
export const CATEGORY_NUMBER = 'NUMBER';
export const CATEGORY_LYRICS = 'LYRICS';
export const CATEGORY_COUNTRY = 'COUNTRY';
export const CATEGORY_MEMORY = 'MEMORY';
export const CATEGORY_ELEMENT = 'ELEMENT';
export const CATEGORY_RANDOM = 'RANDOM';

const CATEGORY = {
    [CATEGORY_RANDOM]: questionMark,
    [CATEGORY_LYRICS]: piano,
    [CATEGORY_COUNTRY]: globe,
    [CATEGORY_MEMORY]: drive,
    [CATEGORY_ELEMENT]: atom,
    [CATEGORY_EQUATION]: calculator,
    [CATEGORY_NUMBER]: number,
};

export function getCategory(category) {
    return CATEGORY[category];
}
