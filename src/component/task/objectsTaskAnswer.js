import {getTextContent} from "../../util/taskRenderer";
import {CREAM_COLOR} from "../../util/style/constant";
import {
    ANSWER_OBJECT_MATERIALS,
    CORRECT_ANSWER_OBJECT_MATERIAL,
    WRONG_ANSWER_OBJECT_MATERIAL
} from "../object-group/objectMaterialHelper";

export function prepareAnswerTiles(rival) {
    const {answers, answerId, correctAnswerId, screen} = rival.props;
    const xTargetGenerator = screen.moreHeightThanWidth
        ? (i) => i < answers.length / 2 ? .2 : .8
        : (i) => i < answers.length / 2 ? .25 : .75;
    return answers.map((ans, i) => {
        const isUserAnswer = answerId === ans.id;
        const isCorrectAnswer = correctAnswerId === ans.id;
        return {
            id: ans.id,
            content: getTextContent(ans),
            material: prepareAnswerMaterial(i, ans.id, answerId, correctAnswerId),
            yTarget: (i % 2) * .5 + .25,
            xTarget: xTargetGenerator(i),
            border: isUserAnswer ? '4px solid' : isCorrectAnswer ? '4px dotted' : undefined,
            borderColor: isUserAnswer ? CREAM_COLOR : isCorrectAnswer ? CREAM_COLOR : undefined,
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