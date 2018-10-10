import {RIVAL_STATUS_CLOSED, RIVAL_STATUS_IN_PROGRESS} from "./rivalHelper";

export function rivalScreen({screen, offsetHeight = 0, offsetWidth = 0}) {
    const contentHeight = fullScreenCondition(screen) ? screen.height - offsetHeight : screen.contentHeight - offsetHeight;
    const contentWidth = fullScreenCondition(screen) ? screen.width - offsetWidth : screen.contentWidth - offsetWidth;
    return {...screen, contentHeight, contentWidth}
}

export const TOP_BAR_HEIGHT_FONT_SIZE_FACTOR = 1.25;

export function isFullScreen(rivalStatus, screen){
    return (rivalStatus === RIVAL_STATUS_IN_PROGRESS || rivalStatus === RIVAL_STATUS_CLOSED) && fullScreenCondition(screen);
}

export function fullScreenCondition(screen){
    return !screen.isBigScreen;
}

export function profileImgHeightAdd(screen){
    return screen.fontSizeRem * 0.85;
}

export function menuItemHeight(screen){
    return screen.standardImgHeight;//Math.min(100, screen.standardImgHeight + (screen.verticalOrientation ? screen.fontSizeRem / 2 : 2 * screen.fontSizeRem));
}

export function clockRemSize(screen){
    if(screen.isBigScreen){
        return 7;
    }
    if(screen.verticalOrientation){
        return 6;
    }
    return 5;
}