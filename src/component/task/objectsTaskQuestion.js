import React from 'react';
import {
    getDateContent,
    getHtmlContent,
    getImageContent,
    IMAGE_PNG_TEXT_IMAGE_PNG,
    TEXT,
    TEXT_ANALOG_CLOCK,
    TEXT_ANIMATION,
    TEXT_DIGITAL_CLOCK,
    TEXT_EQUATION,
    TEXT_HTML,
    TEXT_IMAGE_PNG,
    TEXT_IMAGE_SVG
} from "../../util/taskRenderer";
import _ from "lodash";
import Clock from "react-clock";
import {Equation} from "react-equation";
import {getTextContent} from "../../lang/langText";
import DigitalClock from "../digital-clock/DigitalClock";

export function prepareQuestionTiles(rival) {
    const {question, screen} = rival.props;
    const {questionRenderer} = question;
    if (questionRenderer === TEXT || questionRenderer === TEXT_ANIMATION) {
        return [textTile({question})];
    }
    if (questionRenderer === TEXT_HTML) {
        return prepareQuestionTextHtmlTile(question);
    }
    if (questionRenderer === TEXT_EQUATION) {
        return prepareQuestionTextEquationTile(question);
    }
    if (questionRenderer === TEXT_ANALOG_CLOCK) {
        return prepareQuestionTextAnalogClockTile(question, screen);
    }
    if (questionRenderer === TEXT_DIGITAL_CLOCK) {
        return prepareQuestionTextDigitalClockTile(question, screen);
    }
    if (questionRenderer === TEXT_IMAGE_SVG || questionRenderer === TEXT_IMAGE_PNG) {
        return prepareQuestionImageTile(question, questionRenderer);
    }
    if (questionRenderer === IMAGE_PNG_TEXT_IMAGE_PNG) {
        return prepareQuestionImagesTile(question);
    }
    throw new Error('Missing questionRenderer')
}

const svgBase64 = 'data:image/svg+xml;base64, ';
const pngBase64 = 'data:image/png;base64, ';

function textTile({question, xTarget = .5, yTarget = .5, widthFactor = 1}) {
    return {
        id: 'questionText', onClick: _.noop,
        content: getTextContent(question),
        yTarget, xTarget, widthFactor
    };
}

function imageTile({src, yTarget = .5, xTarget = .7, widthFactor = 1.4, id = 'questionImage'}) {
    return {
        id, onClick: _.noop,
        content: <img alt='' src={src} height='100%' width='100%'/>,
        yTarget, xTarget, widthFactor
    };
}


function prepareQuestionTextHtmlTile(question) {
    return [textTile({question, xTarget: .3, widthFactor: 0.9}), {
        id: 'questionHtml', onClick: _.noop,
        contentHtml: getHtmlContent(question),
        yTarget: .5, xTarget: .65, widthFactor: 1.2
    }];
}

function prepareQuestionTextEquationTile(question) {
    return [textTile({question, xTarget: .3, widthFactor: 0.9}), {
        id: 'questionEquation', onClick: _.noop,
        content: <Equation className='equation'>{getHtmlContent(question)}</Equation>,
        yTarget: .5, xTarget: .65, widthFactor: 1.2
    }];
}

function prepareQuestionTextAnalogClockTile(question, screen) {
    return [textTile({question, xTarget: .3, widthFactor: 1.2}), {
        id: 'questionDate', onClick: _.noop,
        content: <Clock size={screen.isSmallHeight ? 80 : 130} value={new Date(getDateContent(question))}/>,
        yTarget: .5, xTarget: .7, widthFactor: 0.9
    }];
}

function prepareQuestionTextDigitalClockTile(question, screen) {
    return [textTile({question, xTarget: .3, widthFactor: 0.9}), {
        id: 'questionDate', onClick: _.noop,
        content: <DigitalClock date={new Date(getDateContent(question))}/>,
        yTarget: .5, xTarget: .68, widthFactor: 1.2
    }];
}

function prepareQuestionImageTile(question, questionRenderer) {
    const dataPrefix = questionRenderer === TEXT_IMAGE_SVG ? svgBase64 : (questionRenderer === TEXT_IMAGE_PNG ? pngBase64 : '');
    return [textTile({question, xTarget: .25, widthFactor: 0.9}),
        imageTile({src: dataPrefix + getImageContent(question)})
    ];
}

function prepareQuestionImagesTile(question) {
    const imagesData = getImageContent(question).split('^_^');
    return [imageTile({src: pngBase64 + imagesData[0], xTarget: .2, widthFactor: 1.2, id: 'questionImageLeft'}),
        textTile({question, widthFactor: 0.85}),
        imageTile({src: pngBase64 + imagesData[1], xTarget: .8, widthFactor: 1.2, id: 'questionImageRight'})
    ];
}