import {getResolutionFactor} from "../../redux/reducer/screen";

export function tileDimension(screen, factor = 1) {
    const {height, contentWidth, isSmall} = screen;
    factor /= isSmall ? 4 : 6;
    return Math.min(factor * contentWidth, factor * height);
}

export function tileFontSize(resolution, factor = 1) {
    return factor * 10 * getResolutionFactor(resolution);
}