export function rivalScreen({screen, offsetHeight = 0, offsetWidth = 0}) {
    const contentHeight = screen.isSmallHeight ? screen.height - offsetHeight : screen.contentHeight - offsetHeight;
    const contentWidth = screen.isSmallHeight ? screen.width - offsetWidth : screen.contentWidth - offsetWidth;
    return {...screen, contentHeight, contentWidth}
}