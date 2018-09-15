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

export function logBot() {
    console.log('Bot', ...arguments);
}

export function blockUntilRepFulfilled(repGetter) {
    logBot('blockUntilRepFulfilled', 'init', repGetter());
    let time = 0;
    const timeout = 5000;
    const interval = 500;
    const invokeIfFulfilled = (resolve, reject, func) => {
        setTimeout(() => {
            time += interval;
            if (time > timeout) {
                logBot('blockUntilRepFulfilled', 'reject');
                reject();
                return;
            }
            if (repFulfilled(repGetter())) {
                logBot('blockUntilRepFulfilled', 'resolve', repGetter());
                resolve();
            } else {
                if (time <= interval) {
                    logBot('blockUntilRepFulfilled', 'wait', repGetter());
                }
                func(resolve, reject, func);
            }
        }, interval);
    };
    return new Promise(function (resolve, reject) {
        invokeIfFulfilled(resolve, reject, invokeIfFulfilled);
    });
}

export const BOT_1 = '1';
export const BOT_2 = '2';
export const BOT_3 = '3';
export const BOT_4 = '4';
export const BOT_5 = '5';
export const BOT_6 = '6';
export const BOT_7 = '7';
export const BOT_8 = '8';
export const BOT_9 = '9';
export const BOT_10 = '10';

export const BOTS = {
    [BOT_1]: {
        user: 'grzesiu', pass: '!1botgrzesiu',
        hobbies: [CATEGORY_RIDDLE, CATEGORY_TIME],
        baseWisdomSkill: 0.6, baseMentalSkill: 0.4,
        hobbyImpact: 0.1, difficultyImpact: 0.04
    },
    [BOT_2]: {
        user: 'speedy', pass: '!2botspeedy',
        hobbies: [CATEGORY_COUNTRY, CATEGORY_ELEMENT, CATEGORY_COLOR],
        baseWisdomSkill: 0.8, baseMentalSkill: 0.8,
        hobbyImpact: 0.15, difficultyImpact: 0.06
    },
    [BOT_3]: {
        user: 'Razerox', pass: '!3botRazerox',
        hobbies: [CATEGORY_NUMBER, CATEGORY_EQUATION],
        baseWisdomSkill: 0.4, baseMentalSkill: 0.7,
        hobbyImpact: 0.25, difficultyImpact: 0.03
    },
    [BOT_4]: {
        user: 'W4X', pass: '!4botW4X',
        hobbies: [CATEGORY_MEMORY],
        baseWisdomSkill: 0.7, baseMentalSkill: 0.5,
        hobbyImpact: 0.25, difficultyImpact: 0.04
    },
    [BOT_5]: {
        user: 'pierdołła', pass: '!5botpierdołła',
        hobbies: [CATEGORY_LYRICS],
        baseWisdomSkill: 0.55, baseMentalSkill: 0.6,
        hobbyImpact: 0.15, difficultyImpact: 0.01
    },
    [BOT_6]: {
        user: 'Kanar', pass: '!6botKanar',
        hobbies: [CATEGORY_ELEMENT, CATEGORY_NUMBER],
        baseWisdomSkill: 0.9, baseMentalSkill: 0.6,
        hobbyImpact: 0.09, difficultyImpact: 0.08
    },
    [BOT_7]: {
        user: 'Best19', pass: '!7botBest19',
        hobbies: [CATEGORY_COUNTRY, CATEGORY_COLOR],
        baseWisdomSkill: 0.5, baseMentalSkill: 0.9,
        hobbyImpact: 0.34, difficultyImpact: 0.01
    },
    [BOT_8]: {
        user: 'xxULAxx', pass: '!8botxxULAxx',
        hobbies: [CATEGORY_RIDDLE, CATEGORY_MEMORY],
        baseWisdomSkill: 0.77, baseMentalSkill: 0.77,
        hobbyImpact: 0.24, difficultyImpact: 0.06
    },
    [BOT_9]: {
        user: 'qq5', pass: '!9botqq5',
        hobbies: [CATEGORY_NUMBER, CATEGORY_LYRICS],
        baseWisdomSkill: 0.62, baseMentalSkill: 0.67,
        hobbyImpact: 0.22, difficultyImpact: 0.02
    },
    [BOT_10]: {
        user: 'radosny1982', pass: '!10botradosny1982',
        hobbies: [CATEGORY_EQUATION, CATEGORY_TIME],
        baseWisdomSkill: 0.82, baseMentalSkill: 0.77,
        hobbyImpact: 0.05, difficultyImpact: 0.05
    },
};
