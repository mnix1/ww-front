import FaStarO from 'react-icons/lib/fa/star-o';
import FaStar from 'react-icons/lib/fa/star';
import FaStarHalfEmpty from 'react-icons/lib/fa/star-half-empty';
import React from 'react';
import {YELLOW_COLOR} from "./style/constant";
import PropTypes from "prop-types";

export const VERY_EASY = 'VERY_EASY';
export const EASY = 'EASY';
export const NORMAL = 'NORMAL';
export const HARD = 'HARD';
export const VERY_HARD = 'VERY_HARD';
export const EXTREMELY_HARD = 'EXTREMELY_HARD';
export const NONE = 'NONE';

export const STARS_DIFFICULTY_LEVEL = {
    [VERY_EASY]: [FaStarHalfEmpty, FaStarO, FaStarO],
    [EASY]: [FaStar, FaStarO, FaStarO],
    [NORMAL]: [FaStar, FaStarHalfEmpty, FaStarO],
    [HARD]: [FaStar, FaStar, FaStarO],
    [VERY_HARD]: [FaStar, FaStar, FaStarHalfEmpty],
    [EXTREMELY_HARD]: [FaStar, FaStar, FaStar],
};

export function renderDifficultyLevelStars(level) {
    if (level === NONE) {
        return null;
    }
    const stars = STARS_DIFFICULTY_LEVEL[level];
    if (!stars) {
        return null;
    }
    return <div style={{display: 'inline-flex', verticalAlign: 'text-top'}}>
        {stars.map((e, i) => React.createElement(e, {key: i, color: YELLOW_COLOR}))}
    </div>
}