import {getResolutionFactor} from "../../redux/reducer/screen";

export function calculateObjectDimension({dim, count = 2, max = 300, min = 100}) {
    return Math.min(Math.max(dim / (count + 1), min), max);
}

export function objectFontSize(resolution, factor = 1) {
    return factor * 12 * getResolutionFactor(resolution);
}