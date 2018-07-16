import _ from 'lodash';

export function wordsByLength(string, maxLength) {
    const result = [];
    const words = _.words(string, /[^, ]+/g);
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