export const TEXT = 'TEXT';
export const HTML = 'HTML';
export const DATE = 'DATE';
export const EQUATION = 'EQUATION';
export const TEXT_HTML = 'TEXT_HTML';
export const TEXT_EQUATION = 'TEXT_EQUATION';
export const TEXT_DATE = 'TEXT_DATE';
export const TEXT_IMAGE_SVG = 'TEXT_IMAGE_SVG';
export const TEXT_IMAGE_PNG = 'TEXT_IMAGE_PNG';
export const TEXT_ANIMATION = 'TEXT_ANIMATION';
export const IMAGE_SVG = 'IMAGE_SVG';
export const IMAGE_PNG = 'IMAGE_PNG';
export const IMAGE_PNG_TEXT_IMAGE_PNG = 'IMAGE_PNG_TEXT_IMAGE_PNG';

export function getHtmlContent(obj) {
    return obj.htmlContent;
}

export function getDateContent(obj) {
    return obj.dateContent;
}

export function getImageContent(obj) {
    return obj.imageContent;
}

export function getAnimationContent(obj) {
    return obj.animationContent;
}
