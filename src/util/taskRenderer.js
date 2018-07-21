export const TEXT_TASK_RENDERER = 'TEXT';
export const TEXT_IMAGE_TASK_RENDERER = 'TEXT_IMAGE';

export function getTextFromContent(content, taskRenderer) {
    if (taskRenderer === TEXT_IMAGE_TASK_RENDERER) {
        return JSON.parse(content).text;
    }
    return content;
}

export function getImageFromContent(content, taskRenderer) {
    if (taskRenderer === TEXT_IMAGE_TASK_RENDERER) {
        return JSON.parse(content).image;
    }
    return content;
}