import React from 'react';
import {getImageContent, getTextContent, TEXT_IMAGE_TASK_RENDERER, TEXT_TASK_RENDERER} from "../../util/taskRenderer";
import _ from "lodash";
import {OBJECT_MATERIALS} from "../object-group/objectMaterialHelper";

export function prepareQuestionTiles(rival) {
    return _.flatten([
        prepareQuestionTextTile(rival),
        prepareQuestionImageTile(rival)
    ]).filter(e => !_.isNil(e));
}

function prepareQuestionTextTile(rival) {
    const {question} = rival.props;
    if (question.taskRenderer === TEXT_IMAGE_TASK_RENDERER) {
        return null;
    }
    const textContent = getTextContent(question);
    return {
        id: 'questionText',
        onClick: _.noop,
        content: textContent,
        material: OBJECT_MATERIALS[1],
        yTarget: .5,
        xTarget: .5
    };
}

function prepareQuestionImageTile(rival) {
    const {question} = rival.props;
    if (question.taskRenderer !== TEXT_IMAGE_TASK_RENDERER) {
        return null;
    }
    const imageData = getImageContent(question);
    const image = <img alt='' src={'data:image/svg+xml;base64, ' + imageData} height='100%' width='100%'/>;
    const textContent = getTextContent(question);
    return [
        {
            id: 'questionImage',
            onClick: _.noop,
            content: image,
            objectStyle: {zIndex: 1},
            yTarget: .5,
            xTarget: .7
        },
        {
            id: 'questionText',
            onClick: _.noop,
            content: textContent,
            material: OBJECT_MATERIALS[1],
            yTarget: .5,
            xTarget: .35
        }
    ];
}