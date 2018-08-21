import React from 'react';
import {ENGLISH, POLISH} from "./lang";
import _ from 'lodash';

export const ERROR_NOT_ENOUGH_RESOURCES = 'ERROR_NOT_ENOUGH_RESOURCES';
export const ERROR_NO_SPACE_FOR_BOOK = 'ERROR_NO_SPACE_FOR_BOOK';

const TEXTS = {
    [POLISH]: {
        [ERROR_NOT_ENOUGH_RESOURCES]: 'Za mało zasobów',
        [ERROR_NO_SPACE_FOR_BOOK]: 'Brak miejsca na książkę',
    },
    [ENGLISH]: {
        [ERROR_NOT_ENOUGH_RESOURCES]: 'Not enough resources',
        [ERROR_NO_SPACE_FOR_BOOK]: 'No space for book',
    },
};

export function getError(id) {
    return TEXTS[window.activeLang][id];
}

export function checkRepValueCode(e, value) {
    return _.get(e, 'value.code') === value;
}