import {ENGLISH, POLISH} from "../lang";

export const TEXT = 'TEXT';
export const TEXT_IMAGE_SVG = 'TEXT_IMAGE_SVG';
export const TEXT_IMAGE_PNG = 'TEXT_IMAGE_PNG';
export const TEXT_ANIMATION = 'TEXT_ANIMATION';
export const ANSWERS_HTML = 'ANSWERS_HTML';


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

export function getAnimationContent(obj) {
    return obj.animationContent;
}
