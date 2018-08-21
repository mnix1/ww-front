import FaStarO from 'react-icons/lib/fa/star-o';
import FaStar from 'react-icons/lib/fa/star';
import FaStarHalfEmpty from 'react-icons/lib/fa/star-half-empty';
import React from 'react';
import {YELLOW_COLOR} from "./style/constant";

export const L0 = 'L0';
export const L1 = 'L1';
export const L2 = 'L2';
export const L3 = 'L3';
export const L4 = 'L4';
export const L5 = 'L5';
export const L6 = 'L6';

export function getLevelFromNumber(number) {
    return 'L' + number;
}

export const LEVEL_TO_STARS = {
    [L0]: [FaStarO, FaStarO, FaStarO],
    [L1]: [FaStarHalfEmpty, FaStarO, FaStarO],
    [L2]: [FaStar, FaStarO, FaStarO],
    [L3]: [FaStar, FaStarHalfEmpty, FaStarO],
    [L4]: [FaStar, FaStar, FaStarO],
    [L5]: [FaStar, FaStar, FaStarHalfEmpty],
    [L6]: [FaStar, FaStar, FaStar],
};

export function renderStars(level) {
    const stars = LEVEL_TO_STARS[level];
    if (!stars) {
        return null;
    }
    return <div style={{display: 'inline-flex', verticalAlign: 'text-top'}}>
        {stars.map((e, i) => React.createElement(e, {key: i, color: YELLOW_COLOR}))}
    </div>;
}