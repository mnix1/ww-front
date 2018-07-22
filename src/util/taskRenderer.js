import {ENGLISH, POLISH} from "../lang";

export const TEXT_TASK_RENDERER = 'TEXT';
export const TEXT_IMAGE_TASK_RENDERER = 'TEXT_IMAGE';


export function getTextContent(obj) {
    if (window.activeLang === POLISH) {
        return obj.textContentPolish;
    }
    if (window.activeLang === ENGLISH) {
        return obj.textContentEnglish;
    }
    throw new Error('UNKNOWN LANGUAGE');
}

export function getImageContent(obj) {
    return obj.imageContent;
}