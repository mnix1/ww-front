import React from 'react';
import {getImageContent, getTextContent, TEXT_IMAGE_PNG, TEXT_IMAGE_SVG} from "../../util/taskRenderer";
import _ from "lodash";

export function prepareQuestionTiles(rival) {
    return _.flatten([
        prepareQuestionTextTile(rival),
        prepareQuestionImageTile(rival)
    ]).filter(e => !_.isNil(e));
}

function prepareQuestionTextTile(rival) {
    const {question} = rival.props;
    if (question.taskRenderer === TEXT_IMAGE_SVG || question.taskRenderer === TEXT_IMAGE_PNG) {
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

function prepareQuestionImageTile(rival) {
    const {question} = rival.props;
    const {taskRenderer} = question;
    if (taskRenderer !== TEXT_IMAGE_SVG && taskRenderer !== TEXT_IMAGE_PNG) {
        return null;
    }
    const dataPrefix = taskRenderer === TEXT_IMAGE_SVG ? 'data:image/svg+xml;base64, ' : (taskRenderer === TEXT_IMAGE_PNG ? 'data:image/png;base64, ' : '');
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