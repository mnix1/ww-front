import React from 'react';
import {
    DATE, EQUATION, getDateContent,
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
import {Equation} from "react-equation";

export function prepareAnswerTiles(rival) {
    const {answers, answerId, correctAnswerId, screen} = rival.props;
    const {question} = rival.props;

    const positionCreator = preparePositionTargetCreator(screen, answers);
    return answers.map((ans, i) => {
        return {
            id: ans.id,
            ...prepareContent(question.answerRenderer, ans, screen),
            ...prepareStyle(ans, i, answerId, correctAnswerId, question.answerRenderer, screen),
            ...positionCreator(i)
        }
    });
}

function prepareContent(answerRenderer, ans, screen) {
    const asContentHtml = answerRenderer === HTML;
    const asContentDate = answerRenderer === DATE;
    const asContentEquation = answerRenderer === EQUATION;
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
    } else if (asContentEquation) {
        content = getTextContent(ans);
        content = <Equation className='equation'>{content}</Equation>
    } else {
        content = getTextContent(ans);
    }
    return {
        [asContentHtml ? 'contentHtml' : 'content']: content
    }
}

function prepareStyle(ans, i, answerId, correctAnswerId, answerRenderer, screen) {
    const isUserAnswer = answerId === ans.id;
    const isCorrectAnswer = correctAnswerId === ans.id;
    return {
        // heightFactor: answerRenderer === DATE ? (screen.moreHeightThanWidth ? 1.5 : 1.3) : 1,
        material: prepareAnswerMaterial(i, ans.id, answerId, correctAnswerId),
        border: isUserAnswer ? '4px solid' : isCorrectAnswer ? '4px dotted' : undefined,
        borderColor: isUserAnswer ? CREAM_COLOR : isCorrectAnswer ? CREAM_COLOR : undefined
    }
}

function preparePositionTargetCreator(screen, answers) {
    const answersCount = answers.length;
    const df = 2 * Math.PI / answersCount;
    const factor1 = answersCount * 0.03 + 0.21 + (answersCount % 2 === 0 ? 0.06 : 0.02);
    // const factor1 = answersCount === 2 ? 0.25 : (answersCount === 20.42);
    const factor2 = 0.25;
    return (i) => {
        let f = i * df;
        if (answersCount % 2 === 1) {
            f -= Math.PI / 2;
        } else {
            f -= df / 2;
        }
        const sin = Math.sin(f);
        const v1 = 0.5 + _.toInteger(Math.cos(f) * 4) / 4 * factor1;
        const v2 = 0.5 - (sin < 0 ? -1 : 1) * factor2;
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