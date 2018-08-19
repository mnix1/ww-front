import React from 'react';
import {
    getDateContent,
    getHtmlContent,
    getImageContent,
    getTextContent,
    TEXT, TEXT_ANIMATION, TEXT_DATE,
    TEXT_HTML,
    TEXT_IMAGE_PNG,
    TEXT_IMAGE_SVG
} from "../../util/taskRenderer";
import _ from "lodash";
import Clock from "react-clock";

export function prepareQuestionTiles(rival) {
    return _.flatten([
        prepareQuestionTextTile(rival),
        prepareQuestionTextHtmlTile(rival),
        prepareQuestionTextDateTile(rival),
        prepareQuestionImageTile(rival)
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
        objectStyle: {zIndex: 1},
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
        objectStyle: {zIndex: 1},
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
            xTarget: .3,
            widthFactor: 0.9
        },
        {
            id: 'questionImage',
            onClick: _.noop,
            content: image,
            objectStyle: {zIndex: 1},
            yTarget: .5,
            xTarget: .65,
            widthFactor: 1.2
        },
    ];
}