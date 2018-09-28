import {isRepFulfilled} from "../util/repositoryHelper";
import {CATEGORIES} from "../util/categoryHelper";
import _ from 'lodash';

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
            if (isRepFulfilled(repGetter())) {
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

export function prepareAuto() {
    const hobbies = [];
    const hobbiesCount = _.random(1, 3);
    const categories = _.shuffle(CATEGORIES);
    for (let i = 0; i < hobbiesCount; i++) {
        hobbies.push(categories[i]);
    }
    const baseWisdomSkill = _.random(0.4, 0.8, true);
    const baseMentalSkill = _.random(0.4, 0.8, true);
    const hobbyImpact = _.random(0.05, 0.2, true);
    const difficultyImpact = _.random(0.01, 0.08, true);
    return {hobbies, baseWisdomSkill, baseMentalSkill, hobbyImpact, difficultyImpact}
}
