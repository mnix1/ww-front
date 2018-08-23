import calculator from '../media/image/category/calculator.svg';
import number from '../media/image/category/number.svg';
import globe from '../media/image/category/globe.svg';
import hardDrive from '../media/image/category/hardDrive.svg';
import piano from '../media/image/category/piano.svg';
import atom from '../media/image/category/atom.svg';
import puzzle from '../media/image/category/puzzle.svg';
import clock from '../media/image/category/clock.svg';
import questionMark from '../media/image/category/questionMark.svg';
import colors from '../media/image/category/colors.svg';

export const CATEGORY_EQUATION = 'EQUATION';
export const CATEGORY_NUMBER = 'NUMBER';
export const CATEGORY_LYRICS = 'LYRICS';
export const CATEGORY_COUNTRY = 'COUNTRY';
export const CATEGORY_MEMORY = 'MEMORY';
export const CATEGORY_ELEMENT = 'ELEMENT';
export const CATEGORY_RIDDLE = 'RIDDLE';
export const CATEGORY_COLOR = 'COLOR';
export const CATEGORY_TIME = 'TIME';
export const CATEGORY_RANDOM = 'RANDOM';

const CATEGORY = {
    [CATEGORY_RANDOM]: questionMark,
    [CATEGORY_LYRICS]: piano,
    [CATEGORY_COUNTRY]: globe,
    [CATEGORY_MEMORY]: hardDrive,
    [CATEGORY_ELEMENT]: atom,
    [CATEGORY_EQUATION]: calculator,
    [CATEGORY_RIDDLE]: puzzle,
    [CATEGORY_COLOR]: colors,
    [CATEGORY_TIME]: clock,
    [CATEGORY_NUMBER]: number,
};

export function getCategory(category) {
    return CATEGORY[category];
}
