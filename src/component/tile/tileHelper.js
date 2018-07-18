export function tileDimension(screen, factor = 1) {
    const {height, contentWidth, isSmall} = screen;
    factor /= isSmall ? 4 : 6;
    return Math.min(factor * contentWidth, factor * height);
}

export function tileFontSize(isSmall, factor = 1) {
    return (isSmall ? 12 : 16) * factor;
}