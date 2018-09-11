import React from 'react';
import {
    getDateContent,
    getHtmlContent,
    getImageContent,
    IMAGE_PNG_TEXT_IMAGE_PNG,
    TEXT,
    TEXT_ANIMATION,
    TEXT_DATE,
    TEXT_EQUATION,
    TEXT_HTML,
    TEXT_IMAGE_PNG,
    TEXT_IMAGE_SVG
} from "../../util/taskRenderer";
import _ from "lodash";
import Clock from "react-clock";
import {Equation} from "react-equation";
import {getTextContent} from "../../lang/langText";

export function prepareQuestionTiles(rival) {
    return _.flatten([
        prepareQuestionTextTile(rival),
        prepareQuestionTextHtmlTile(rival),
        prepareQuestionTextEquationTile(rival),
        prepareQuestionTextDateTile(rival),
        prepareQuestionImageTile(rival),
        prepareQuestionImagesTile(rival)
    ]).filter(e => !_.isNil(e));
}

function prepareQuestionTextTile(rival) {
    const {question} = rival.props;
    if (question.questionRenderer !== TEXT && question.questionRenderer !== TEXT_ANIMATION) {
        return null;
    }
    const textContent = getTextContent(question);
    return {
        id: 'questionText',
        onClick: _.noop,
        content: textContent,
        yTarget: .5,
        xTarget: .5
    };
}

function prepareQuestionTextHtmlTile(rival) {
    const {question} = rival.props;
    if (question.questionRenderer !== TEXT_HTML) {
        return null;
    }
    const textContent = getTextContent(question);
    const htmlContent = getHtmlContent(question);
    return [{
        id: 'questionText',
        onClick: _.noop,
        content: textContent,
        yTarget: .5,
        xTarget: .3,
        widthFactor: 0.9
    }, {
        id: 'questionHtml',
        onClick: _.noop,
        contentHtml: htmlContent,
        yTarget: .5,
        xTarget: .65,
        widthFactor: 1.2
    }];
}

function prepareQuestionTextEquationTile(rival) {
    const {question} = rival.props;
    if (question.questionRenderer !== TEXT_EQUATION) {
        return null;
    }
    const textContent = getTextContent(question);
    const htmlContent = getHtmlContent(question);
    return [{
        id: 'questionText',
        onClick: _.noop,
        content: textContent,
        yTarget: .5,
        xTarget: .3,
        widthFactor: 0.9
    }, {
        id: 'questionEquation',
        onClick: _.noop,
        content: <Equation className='equation'>{htmlContent}</Equation>,
        yTarget: .5,
        xTarget: .65,
        widthFactor: 1.2
    }];
}

function prepareQuestionTextDateTile(rival) {
    const {question, screen} = rival.props;
    if (question.questionRenderer !== TEXT_DATE) {
        return null;
    }
    const textContent = getTextContent(question);
    const dateContent = getDateContent(question);
    return [{
        id: 'questionText',
        onClick: _.noop,
        content: textContent,
        yTarget: .5,
        xTarget: .3,
        widthFactor: 0.9
    }, {
        id: 'questionDate',
        onClick: _.noop,
        content: <Clock size={screen.isSmallHeight ? 80 : 120} value={new Date(dateContent)}/>,
        yTarget: .5,
        xTarget: .65,
        widthFactor: 1.2
    }];
}

function prepareQuestionImageTile(rival) {
    const {question} = rival.props;
    const {questionRenderer} = question;
    if (questionRenderer !== TEXT_IMAGE_SVG && questionRenderer !== TEXT_IMAGE_PNG) {
        return null;
    }
    const dataPrefix = questionRenderer === TEXT_IMAGE_SVG ? 'data:image/svg+xml;base64, ' : (questionRenderer === TEXT_IMAGE_PNG ? 'data:image/png;base64, ' : '');
    const imageData = getImageContent(question);
    const image = <img alt='' src={dataPrefix + imageData} height='100%' width='100%'/>;
    const textContent = getTextContent(question);
    return [
        {
            id: 'questionText',
            onClick: _.noop,
            content: textContent,
            yTarget: .5,
            xTarget: .25,
            widthFactor: 0.9
        },
        {
            id: 'questionImage',
            onClick: _.noop,
            content: image,
            yTarget: .5,
            xTarget: .7,
            widthFactor: 1.4
        },
    ];
}

function prepareQuestionImagesTile(rival) {
    const {question} = rival.props;
    const {questionRenderer} = question;
    if (questionRenderer !== IMAGE_PNG_TEXT_IMAGE_PNG) {
        return null;
    }
    const dataPrefix = 'data:image/png;base64, ';
    const imagesData = getImageContent(question).split('^_^');
    const imageLeft = <img alt='' src={dataPrefix + imagesData[0]} height='100%' width='100%'/>;
    const imageRight = <img alt='' src={dataPrefix + imagesData[1]} height='100%' width='100%'/>;
    const textContent = getTextContent(question);
    return [
        {
            id: 'questionImageLeft',
            onClick: _.noop,
            content: imageLeft,
            yTarget: .5,
            xTarget: .2,
            widthFactor:  1.2
        },
        {
            id: 'questionText',
            onClick: _.noop,
            content: textContent,
            yTarget: .5,
            xTarget: .5,
            widthFactor: 0.85
        },
        {
            id: 'questionImageRight',
            onClick: _.noop,
            content: imageRight,
            yTarget: .5,
            xTarget: .8,
            widthFactor: 1.2
        },
    ];
}