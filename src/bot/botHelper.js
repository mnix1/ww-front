import {repFulfilled} from "../util/repositoryHelper";

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
