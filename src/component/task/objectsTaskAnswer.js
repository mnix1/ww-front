import React from 'react';
import {
    DATE, getDateContent,
    getHtmlContent,
    getImageContent,
    getTextContent,
    HTML,
    IMAGE_SVG
} from "../../util/taskRenderer";
import {CREAM_COLOR} from "../../util/style/constant";
import {CORRECT_ANSWER_OBJECT_MATERIAL, WRONG_ANSWER_OBJECT_MATERIAL} from "../object-group/objectMaterialHelper";
import _ from 'lodash';
import Clock from "react-clock";

export function prepareAnswerTiles(rival) {
    const {answers, answerId, correctAnswerId, screen} = rival.props;
    const {question} = rival.props;

    const positionCreator = preparePositionTargetCreator(screen, answers);
    return answers.map((ans, i) => {
        return {
            id: ans.id,
            ...prepareContent(question.answerRenderer, ans, screen),
            ...prepareStyle(ans, i, answerId, correctAnswerId),
            ...positionCreator(i)
        }
    });
}

function prepareContent(answerRenderer, ans, screen) {
    const asContentHtml = answerRenderer === HTML;
    const asContentDate = answerRenderer === DATE;
    const asContentImageSvg = answerRenderer === IMAGE_SVG;
    let content;
    if (asContentImageSvg) {
        const imageData = getImageContent(ans);
        content = <img alt='' src={'data:image/svg+xml;base64, ' + imageData} height='100%' width='100%'/>;
    } else if (asContentHtml) {
        content = getHtmlContent(ans);
    } else if (asContentDate) {
        content = getDateContent(ans);
        content = <Clock size={screen.isSmallHeight ? 80 : 100} value={new Date(content)}/>
    } else {
        content = getTextContent(ans);
    }
    console.log(content);
    return {
        [asContentHtml ? 'contentHtml' : 'content']: content
    }
}

function prepareStyle(ans, i, answerId, correctAnswerId) {
    const isUserAnswer = answerId === ans.id;
    const isCorrectAnswer = correctAnswerId === ans.id;
    return {
        material: prepareAnswerMaterial(i, ans.id, answerId, correctAnswerId),
        border: isUserAnswer ? '4px solid' : isCorrectAnswer ? '4px dotted' : undefined,
        borderColor: isUserAnswer ? CREAM_COLOR : isCorrectAnswer ? CREAM_COLOR : undefined
    }
}

function preparePositionTargetCreator(screen, answers) {
    const answersCount = answers.length;
    const df = 2 * Math.PI / answersCount;
    const factorX = answersCount === 2 ? 0.25 : 0.35;
    const factorY = 0.20;
    return (i) => {
        let f = i * df;
        if (answersCount % 2 === 1) {
            f -= Math.PI / 2;
        } else {
            f -= df / 2;
        }
        const sin = Math.sin(f);
        const v1 = 0.5 + _.toInteger(Math.cos(f) * 4) / 4 * factorX;
        const v2 = 0.5 - (sin < 0 ? -1 : 1) * factorY;
        return {
            xTarget: screen.moreHeightThanWidth || answersCount === 2 ? v2 : v1,
            yTarget: screen.moreHeightThanWidth || answersCount === 2 ? v1 : v2
        }
    }
}

function prepareAnswerMaterial(i, id, answerId, correctAnswerId) {
    if (correctAnswerId === undefined || (id !== answerId && id !== correctAnswerId)) {
        return null;
    }
    if (id === correctAnswerId) {
        return CORRECT_ANSWER_OBJECT_MATERIAL;
    }
    return WRONG_ANSWER_OBJECT_MATERIAL;
}