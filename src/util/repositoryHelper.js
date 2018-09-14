import _ from 'lodash';

export function isRepValueCode1(e) {
    return checkRepValueCode(e, 1);
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

export function fetchOnPathAndIfNotExists(prevPath, path, targetPath, prevRep, rep) {
    return (path === targetPath && prevPath !== path)
        || (!rep.fulfilled && !rep.pending && prevRep.fulfilled)
}

export function repFulfilled(rep) {
    return rep && rep.fulfilled;
}