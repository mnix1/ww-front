import _ from 'lodash';

export const EXTREMELY_EASY = 'EXTREMELY_EASY';
export const VERY_EASY = 'VERY_EASY';
export const EASY = 'EASY';
export const NORMAL = 'NORMAL';
export const HARD = 'HARD';
export const VERY_HARD = 'VERY_HARD';
export const EXTREMELY_HARD = 'EXTREMELY_HARD';

export const NAME_TO_DIFFICULT_LEVEL = {
    [EXTREMELY_EASY]: 0,
    [VERY_EASY]: 0.5,
    [EASY]: 1,
    [NORMAL]: 1.5,
    [HARD]: 2,
    [VERY_HARD]: 2.5,
    [EXTREMELY_HARD]: 3,
};

export const NAME_TO_POINTS = {
    [EXTREMELY_EASY]: 1,
    [VERY_EASY]: 2,
    [EASY]: 3,
    [NORMAL]: 4,
    [HARD]: 5,
    [VERY_HARD]: 6,
    [EXTREMELY_HARD]: 7,
};

export const DIFFICULTY_LEVELS = _.map(NAME_TO_DIFFICULT_LEVEL);

export const DIFFICULT_LEVEL_TO_NAME = _.transform(NAME_TO_DIFFICULT_LEVEL, (result, value, key) => result[value] = key, {});