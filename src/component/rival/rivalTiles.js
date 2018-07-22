import {getAnimationContent, getImageContent, getTextContent, TEXT_IMAGE_TASK_RENDERER} from "../../util/taskRenderer";
import {wordsByLength} from "../../util/textHelper";
import {tileFontSize} from "../tile/tileHelper";
import {CREAME_COLOR} from "../../util/style/constant";
import {CORRECT_ANSWER_TILE_MATERIAL, randomTileMaterial, WRONG_ANSWER_TILE_MATERIAL} from "../tile/tileMaterialHelper";
import _ from "lodash";

export function prepareQuestionTiles(rival) {
    return [
        prepareQuestionTextTile(rival),
        prepareQuestionImageTile(rival)
    ].filter(e => !_.isNil(e));
}

function prepareQuestionTextTile(rival) {
    const {isSmall} = rival.props.screen;
    const {question} = rival.props;
    const textContent = getTextContent(question);
    return {
        id: 'questionText',
        label: wordsByLength(textContent, 40),
        a: isSmall ? 100 : 200,
        h: isSmall ? 80 : 100,
        w: isSmall ? 280 : 350,
        material: rival.questionMaterial,
        fontSize: tileFontSize(isSmall),
        yTarget: isSmall ? -2 / 7 : -1 / 3 - 1 / 10,
        xTarget: 0
    };
}

export function prepareAnimationTiles(rival) {
    const {isSmall} = rival.props.screen;
    const {question} = rival.props;
    const a = isSmall ? 80 : 100;
    const w = isSmall ? 90 : 140;
    const h = isSmall ? 60 : 80;
    const animationContent = JSON.parse(atob(getAnimationContent(question)));
    const objects = animationContent.objects;
    return objects.map((object, i) => {
        let xTarget = (2 * i / (objects.length - 1) - 1) / 5;
        return {
            customMouseOver: _.noop,
            customMouseOut: _.noop,
            id: object.key,
            outsideLabel: wordsByLength(object.key, 40),
            a, h, w,
            strokeWidthFactor: 10,
            material: {
                background: object.backgroundColor,
                color: object.fontColor
            },
            // strokeFill: object.borderColor,
            fontSize: tileFontSize(isSmall, 2),
            yTarget: (i + 1) % 2 ? -1 / 3 : 1 / 3,
            xTarget
        };
    })
}

function prepareQuestionImageTile(rival) {
    const {question} = rival.props;
    if (question.taskRenderer !== TEXT_IMAGE_TASK_RENDERER) {
        return null;
    }
    const {isSmall} = rival.props.screen;
    const imageData = getImageContent(question);
    const a = isSmall ? 100 : 150;
    return {
        id: 'questionImage',
        strokeWidthFactor: 0,
        imageCreator: (el) => {
            const image = new Image();
            image.src = 'data:image/svg+xml;base64, ' + imageData;
            image.onload = () => {
                el.append('image')
                    .attr('xlink:href', 'data:image/svg+xml;base64, ' + imageData)
                    .attr('transform', () => {
                        const scale = Math.min(a / image.width, a / image.height);
                        const newWidth = scale * image.width;
                        const newHeight = scale * image.height;
                        return `translate(${-newWidth / 2},${-newHeight / 2})scale(${scale})`;
                    })
            };
        },
        a,
        w: 0,
        h: 0,
        material: rival.questionMaterial,
        yTarget: isSmall ? -1 / 7 : -1 / 3,
        xTarget: 0
    };
}

export function prepareAnswerTiles(rival) {
    const {isSmall} = rival.props.screen;
    const {answers, answerId, correctAnswerId} = rival.props;
    const a = isSmall ? 80 : 100;
    const w = isSmall ? 90 : 140;
    const h = isSmall ? 60 : 80;
    return answers.map((ans, i) => {
        const isUserAnswer = answerId === ans.id;
        return {
            id: ans.id,
            label: wordsByLength(getTextContent(ans), isSmall ? 18 : 20),
            a, h, w,
            material: prepareAnswerMaterial(ans.id, correctAnswerId),
            fontSize: tileFontSize(isSmall, 0.8),
            yTarget: isSmall ? 1 / 3 : 1 / 3,
            xTarget: (2 * i / (answers.length - 1) - 1) / 2,
            strokeWidthFactor: isUserAnswer ? 3 : undefined,
            strokeFill: isUserAnswer ? CREAME_COLOR : undefined,
        }
    });
}

function prepareAnswerMaterial(answerId, correctAnswerId) {
    if (correctAnswerId === undefined) {
        return randomTileMaterial();
    }
    return correctAnswerId === answerId ? CORRECT_ANSWER_TILE_MATERIAL : WRONG_ANSWER_TILE_MATERIAL;
}