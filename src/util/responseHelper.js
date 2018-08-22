import _ from 'lodash';

export function isRepValueCode1(e) {
    return checkRepValueCode(e, 1);
}

export function checkRepValueCode(e, value) {
    return _.get(e, 'value.code') === value;
}