import _ from 'lodash';
import {statusChanged} from "../redux/reducer/rival";
import {RIVAL_STATUS_ERROR_RANDOM_OPPONENT} from "./rivalHelper";
import {clearRivalStartRandomOpponentFetch} from "../content/rival/fetch/RivalStartRandomOpponentFetch";

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

export function fetchOnPathOrIfNotExistsAnymore(prevPath, path, targetPath, prevRep, rep) {
    return (path === targetPath && prevPath !== path)
        || (!rep.fulfilled && !rep.pending && prevRep.fulfilled)
}

export function fetchOnPathAndIfNotExists(prevPath, path, targetPath, prevRep, rep) {
    return path === targetPath && prevPath !== path && !rep.fulfilled && !rep.pending;
}

export function repFulfilled(rep) {
    return rep && rep.fulfilled;
}
export function repPending(rep) {
    return rep && rep.pending;
}
export function repRejected(rep) {
    return rep && rep.rejected;
}