import {getTextContent} from "../../util/taskRenderer";
import {CREAM_COLOR} from "../../util/style/constant";
import {
    ANSWER_OBJECT_MATERIALS,
    CORRECT_ANSWER_OBJECT_MATERIAL,
    WRONG_ANSWER_OBJECT_MATERIAL
} from "../object-group/objectMaterialHelper";

export function prepareAnswerTiles(rival) {
    const {answers, answerId, correctAnswerId, screen} = rival.props;
    const answersCount = answers.length;
    const df = 2 * Math.PI / answersCount;
    const factor = answersCount === 2 ? 0.25 : 0.3;
    return answers.map((ans, i) => {
        const isUserAnswer = answerId === ans.id;
        const isCorrectAnswer = correctAnswerId === ans.id;
        let f = i * df;
        if (answersCount % 2 === 1) {
            f -= Math.PI / 2;
        } else if (answersCount !== 2) {
            f -= df / 2;
        }
        return {
            id: ans.id,
            content: getTextContent(ans),
            material: prepareAnswerMaterial(i, ans.id, answerId, correctAnswerId),
            border: isUserAnswer ? '4px solid' : isCorrectAnswer ? '4px dotted' : undefined,
            borderColor: isUserAnswer ? CREAM_COLOR : isCorrectAnswer ? CREAM_COLOR : undefined,
            xTarget: 0.5 + Math.cos(f) * factor,
            yTarget: 0.5 - Math.sin(f) * factor
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