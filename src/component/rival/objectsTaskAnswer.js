import {getTextContent} from "../../util/taskRenderer";
import {CREAME_COLOR} from "../../util/style/constant";
import {
    ANSWER_OBJECT_MATERIALS,
    CORRECT_ANSWER_OBJECT_MATERIAL,
    WRONG_ANSWER_OBJECT_MATERIAL
} from "../object-group/objectMaterialHelper";

export function prepareAnswerTiles(rival) {
    const {answers, answerId, correctAnswerId} = rival.props;
    return answers.map((ans, i) => {
        const isUserAnswer = answerId === ans.id;
        const isCorrectAnswer = correctAnswerId === ans.id;
        return {
            id: ans.id,
            content: getTextContent(ans),
            material: prepareAnswerMaterial(i, ans.id, answerId, correctAnswerId),
            yTarget: (i % 2) * .25 + .5,
            xTarget: i < answers.length / 2 ? .25 : .75,
            border: isUserAnswer ? '4px solid' : isCorrectAnswer ? '4px dotted' : undefined,
            borderColor: isUserAnswer ? CREAME_COLOR : isCorrectAnswer ? CREAME_COLOR : undefined,
        }
    });
}

function prepareAnswerMaterial(i, id, answerId, correctAnswerId) {
    if (correctAnswerId === undefined || (id !== answerId && id !== correctAnswerId)) {
        return ANSWER_OBJECT_MATERIALS[i];
    }
    if (id === correctAnswerId) {
        return CORRECT_ANSWER_OBJECT_MATERIAL;
    }
    return WRONG_ANSWER_OBJECT_MATERIAL;
}