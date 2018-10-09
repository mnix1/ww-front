export function rivalScreen({screen, offsetHeight = 0, offsetWidth = 0}) {
    const contentHeight = screen.isSmallHeight ? screen.height - offsetHeight : screen.contentHeight - offsetHeight;
    const contentWidth = screen.isSmallHeight ? screen.width - offsetWidth : screen.contentWidth - offsetWidth;
    return {...screen, contentHeight, contentWidth}
}

export const TOP_BAR_HEIGHT_FONT_SIZE_FACTOR = 1.25;

export function clockRemSize(screen){
    if(screen.isBigScreen){
        return 7;
    }
    if(screen.verticalOrientation){
        return 6;
    }
    return 5;
}