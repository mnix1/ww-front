import _ from 'lodash';
import {getText, TEXT_POINTS, TEXT_POSITION, TEXT_SCORE, TEXT_TIME} from "../lang/langText";
import Timer from "../component/timer/Timer";
import React from "react";

export function wordsByLength(string, maxLength) {
    const result = [];
    const words = _.words(string, /[^ ]+/g);
    if (_.isEmpty(words)) {
        return result;
    }
    let line = '';
    words.forEach(e => {
        if (line.length + e.length > maxLength) {
            result.push(line);
            line = e;
        } else {
            line += ` ${e}`;
        }
    });
    if (!_.isEmpty(line)) {
        result.push(line);
    }
    return result;
}

export function prepareAnswerIntervalMessage(answerInterval) {
    return <div className='justifyStart'>{getText(TEXT_TIME)}: <Timer numberAutoHide0={true} className='paddingLeftRem' showNumber={true} showChart={false} work={false} from={answerInterval}/></div>;
}

export function prepareScoreMessage(score) {
    return `${getText(TEXT_SCORE)}: ${_.toInteger(score)}${getText(TEXT_POINTS)}`;
}

export function preparePositionMessage(position) {
    return `${getText(TEXT_POSITION)}: ${_.defaultTo(position, 'N/A')}`;
}

export function prepareRatingPointsMessage(points) {
    return `(${points}${getText(TEXT_POINTS)})`;
}

export function round2(n){
    return _.round(n, 2);
}
export function toFixed2(n){
    return _.isNumber(n) ? n.toFixed(2) : n;
}