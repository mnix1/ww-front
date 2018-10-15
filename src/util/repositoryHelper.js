import _ from 'lodash';

export function isRepValueCode1(e) {
    return checkRepValueCode(e, 1);
}
export function isRepValueCodeNot1(e) {
    return !checkRepValueCode(e, 1);
}

export function isRepFulfilledOnceWithCode1(e, prevE) {
    return isRepFulfilled(e) && !isRepFulfilled(prevE) && isRepValueCode1(e);
}

export function checkRepValueCode(e, value) {
    return _.get(e, 'value.code') === value;
}

export function isCode1(e){
    return checkCode(e, 1);
}

export function checkCode(e, value) {
    return _.get(e, 'code') === value;
}

export function fetchOnPathOrIfNotExistsAnymore(prevPath, path, targetPath, prevRep, rep) {
    return (path === targetPath && prevPath !== path)
        || (!rep.fulfilled && !rep.pending && prevRep.fulfilled)
}

export function fetchOnPathAndIfNotExists(prevPath, path, targetPath, prevRep, rep) {
    return path === targetPath && prevPath !== path && !rep.fulfilled && !rep.pending;
}

export function isRepFulfilled(rep) {
    return rep && rep.fulfilled;
}
export function isRepPending(rep) {
    return rep && rep.pending;
}
export function isRepRejected(rep) {
    return rep && rep.rejected;
}