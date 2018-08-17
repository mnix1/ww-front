import {getTextContent} from "../../util/taskRenderer";
import {CREAM_COLOR} from "../../util/style/constant";
import {
    ANSWER_OBJECT_MATERIALS,
    CORRECT_ANSWER_OBJECT_MATERIAL,
    WRONG_ANSWER_OBJECT_MATERIAL
} from "../object-group/objectMaterialHelper";
import _ from 'lodash';

export function prepareAnswerTiles(rival) {
    const {answers, answerId, correctAnswerId, screen} = rival.props;
    const answersCount = answers.length;
    const df = 2 * Math.PI / answersCount;
    const factorX = answersCount === 2 ? 0.25 : 0.35;
    const factorY = 0.20;
    return answers.map((ans, i) => {
        const isUserAnswer = answerId === ans.id;
        const isCorrectAnswer = correctAnswerId === ans.id;
        let f = i * df;
        if (answersCount % 2 === 1) {
            f -= Math.PI / 2;
        } else  {
            f -= df / 2;
        }
        const sin = Math.sin(f);
        const v1 = 0.5 + _.toInteger(Math.cos(f) * 4) / 4 * factorX;
        const v2 = 0.5 - (sin < 0 ? -1 : 1) * factorY;
        return {
            id: ans.id,
            content: getTextContent(ans),
            material: prepareAnswerMaterial(i, ans.id, answerId, correctAnswerId),
            border: isUserAnswer ? '4px solid' : isCorrectAnswer ? '4px dotted' : undefined,
            borderColor: isUserAnswer ? CREAM_COLOR : isCorrectAnswer ? CREAM_COLOR : undefined,
            xTarget: screen.moreHeightThanWidth || answersCount === 2 ? v2 : v1,
            yTarget: screen.moreHeightThanWidth || answersCount === 2 ? v1 : v2,
        }
    });
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