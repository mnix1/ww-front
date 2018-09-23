import calculator from '../media/image/category/calculator.png';
import number from '../media/image/category/number.png';
import globe from '../media/image/category/globe.png';
import hardDrive from '../media/image/category/hardDrive.png';
import piano from '../media/image/category/piano.png';
import atom from '../media/image/category/atom.svg';
import puzzle from '../media/image/category/puzzle.svg';
import clock from '../media/image/category/clock.png';
import questionMark from '../media/image/category/questionMark.svg';
import colors from '../media/image/category/colors.png';
import olympicGames from '../media/image/category/olympicGames.svg';
import {MEMORY} from "./wisieAttributeHelper";

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
export const CATEGORY_OLYMPIC_GAMES = 'OLYMPIC_GAMES';

export const CATEGORY = {
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
    [CATEGORY_OLYMPIC_GAMES]: olympicGames,
};

export const CATEGORIES = [
    CATEGORY_LYRICS, CATEGORY_COUNTRY, MEMORY, CATEGORY_ELEMENT, CATEGORY_EQUATION, CATEGORY_RIDDLE,
    CATEGORY_COLOR, CATEGORY_TIME, CATEGORY_NUMBER, CATEGORY_OLYMPIC_GAMES
];

export function getCategory(category) {
    return CATEGORY[category];
}
