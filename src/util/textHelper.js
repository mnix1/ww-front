import _ from 'lodash';
import {getText, TEXT_POINTS, TEXT_POSITION, TEXT_SCORE, TEXT_TIME} from "../lang/text";

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
    return `${getText(TEXT_TIME)}: ${(answerInterval / 1000).toFixed(1)} s`;
}

export function prepareScoreMessage(score) {
    return `${getText(TEXT_SCORE)}: ${_.toInteger(score)} ${getText(TEXT_POINTS)}`;
}

export function preparePositionMessage(position) {
    return `${getText(TEXT_POSITION)}: ${_.defaultTo(position, 'N/A')}`;
}

export function round2(n){
    return _.round(n, 2);
}
export function toFixed2(n){
    return _.isNumber(n) ? n.toFixed(2) : n;
}