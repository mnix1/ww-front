export function tileDimension(screen, factor = 1) {
    const {height, contentWidth, isSmall} = screen;
    factor /= isSmall ? 4 : 8;
    return Math.min(factor * contentWidth, factor * height);
}
