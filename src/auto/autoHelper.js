import {repFulfilled} from "../util/repositoryHelper";
import {
    CATEGORY_COLOR,
    CATEGORY_COUNTRY,
    CATEGORY_ELEMENT,
    CATEGORY_EQUATION, CATEGORY_LYRICS, CATEGORY_MEMORY,
    CATEGORY_NUMBER,
    CATEGORY_RIDDLE,
    CATEGORY_TIME
} from "../util/categoryHelper";

if (!window.name) {
    window.name = 'grzesiu';
}

export function logAuto() {
    console.log('Auto', ...arguments);
}

export function blockUntilRepFulfilled(repGetter) {
    logAuto('blockUntilRepFulfilled', 'init', repGetter());
    let time = 0;
    const timeout = 5000;
    const interval = 500;
    const invokeIfFulfilled = (resolve, reject, func) => {
        setTimeout(() => {
            time += interval;
            if (time > timeout) {
                logAuto('blockUntilRepFulfilled', 'reject');
                reject();
                return;
            }
            if (repFulfilled(repGetter())) {
                logAuto('blockUntilRepFulfilled', 'resolve', repGetter());
                resolve();
            } else {
                if (time <= interval) {
                    logAuto('blockUntilRepFulfilled', 'wait', repGetter());
                }
                func(resolve, reject, func);
            }
        }, interval);
    };
    return new Promise(function (resolve, reject) {
        invokeIfFulfilled(resolve, reject, invokeIfFulfilled);
    });
}

export const AUTO_1 = 'grzesiu';
export const AUTO_2 = 'speedy';
export const AUTO_3 = 'Razerox';
export const AUTO_4 = 'W4X';
export const AUTO_5 = 'pierdołła';
export const AUTO_6 = 'Kanar';
export const AUTO_7 = 'Best19';
export const AUTO_8 = 'xxULAxx';
export const AUTO_9 = 'qq5';
export const AUTO_10 = 'radosny1982';

export const AUTO = {
    [AUTO_1]: {
        user: 'grzesiu',
        hobbies: [CATEGORY_RIDDLE, CATEGORY_TIME],
        baseWisdomSkill: 0.6, baseMentalSkill: 0.4,
        hobbyImpact: 0.1, difficultyImpact: 0.04
    },
    [AUTO_2]: {
        user: 'speedy',
        hobbies: [CATEGORY_COUNTRY, CATEGORY_ELEMENT, CATEGORY_COLOR],
        baseWisdomSkill: 0.8, baseMentalSkill: 0.8,
        hobbyImpact: 0.15, difficultyImpact: 0.06
    },
    [AUTO_3]: {
        user: 'Razerox',
        hobbies: [CATEGORY_NUMBER, CATEGORY_EQUATION],
        baseWisdomSkill: 0.4, baseMentalSkill: 0.7,
        hobbyImpact: 0.25, difficultyImpact: 0.03
    },
    [AUTO_4]: {
        user: 'W4X',
        hobbies: [CATEGORY_MEMORY],
        baseWisdomSkill: 0.7, baseMentalSkill: 0.5,
        hobbyImpact: 0.25, difficultyImpact: 0.04
    },
    [AUTO_5]: {
        user: 'pierdołła',
        hobbies: [CATEGORY_LYRICS],
        baseWisdomSkill: 0.55, baseMentalSkill: 0.6,
        hobbyImpact: 0.15, difficultyImpact: 0.01
    },
    [AUTO_6]: {
        user: 'Kanar',
        hobbies: [CATEGORY_ELEMENT, CATEGORY_NUMBER],
        baseWisdomSkill: 0.9, baseMentalSkill: 0.6,
        hobbyImpact: 0.09, difficultyImpact: 0.08
    },
    [AUTO_7]: {
        user: 'Best19',
        hobbies: [CATEGORY_COUNTRY, CATEGORY_COLOR],
        baseWisdomSkill: 0.5, baseMentalSkill: 0.9,
        hobbyImpact: 0.34, difficultyImpact: 0.01
    },
    [AUTO_8]: {
        user: 'xxULAxx',
        hobbies: [CATEGORY_RIDDLE, CATEGORY_MEMORY],
        baseWisdomSkill: 0.77, baseMentalSkill: 0.77,
        hobbyImpact: 0.24, difficultyImpact: 0.06
    },
    [AUTO_9]: {
        user: 'qq5',
        hobbies: [CATEGORY_NUMBER, CATEGORY_LYRICS],
        baseWisdomSkill: 0.62, baseMentalSkill: 0.67,
        hobbyImpact: 0.22, difficultyImpact: 0.02
    },
    [AUTO_10]: {
        user: 'radosny1982',
        hobbies: [CATEGORY_EQUATION, CATEGORY_TIME],
        baseWisdomSkill: 0.82, baseMentalSkill: 0.77,
        hobbyImpact: 0.05, difficultyImpact: 0.05
    },
};