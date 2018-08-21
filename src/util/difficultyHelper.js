import _ from 'lodash';
import {L0, L1, L2, L3, L4, L5, L6, renderStars} from "./starRateHelper";

export const EXTREMELY_EASY = 'EXTREMELY_EASY';
export const VERY_EASY = 'VERY_EASY';
export const EASY = 'EASY';
export const NORMAL = 'NORMAL';
export const HARD = 'HARD';
export const VERY_HARD = 'VERY_HARD';
export const EXTREMELY_HARD = 'EXTREMELY_HARD';

export const NAME_TO_DIFFICULT_LEVEL = {
    [EXTREMELY_EASY]: 1,
    [VERY_EASY]: 2,
    [EASY]: 3,
    [NORMAL]: 4,
    [HARD]: 5,
    [VERY_HARD]: 6,
    [EXTREMELY_HARD]: 7,
};
export const NAME_TO_STAR_RATE_LEVEL = {
    [EXTREMELY_EASY]: L0,
    [VERY_EASY]: L1,
    [EASY]: L2,
    [NORMAL]: L3,
    [HARD]: L4,
    [VERY_HARD]: L5,
    [EXTREMELY_HARD]: L6,
};

export const DIFFICULT_LEVEL_TO_NAME = _.transform(NAME_TO_DIFFICULT_LEVEL, (result, value, key) => result[value] = key, {});

export function renderDifficultyLevelStars(name) {
    const starRate = NAME_TO_STAR_RATE_LEVEL[name];
    return renderStars(starRate);
}