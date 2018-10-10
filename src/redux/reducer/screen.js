import {GOLDEN_RATIO_FACTOR} from "../../util/style/constant";
import MobileDetect from 'mobile-detect';
import _ from 'lodash';
import {remToPixels} from "../../util/fontHelper";
import {TOP_BAR_HEIGHT_FONT_SIZE_FACTOR} from "../../util/screenHelper";

export const RESIZE = 'screen/resize';

function prepareResolution(height, width) {
    let heightPart;
    if (height < 600) {
        heightPart = 'SH';
    } else if (height < 800) {
        heightPart = 'MH';
    } else {
        heightPart = 'BH'
    }
    let widthPart;
    if (width < 800) {
        widthPart = 'SW';
    } else if (width < 1240) {
        widthPart = 'MW';
    } else {
        widthPart = 'BW'
    }
    return heightPart + widthPart;
}

export function checkSmallHeight(resolution) {
    return _.includes(resolution, 'SH');
}

export function checkBigHeight(resolution) {
    return _.includes(resolution, 'BH');
}

export function checkSmallWidth(resolution) {
    return _.includes(resolution, 'SW');
}

export function checkBigWidth(resolution) {
    return _.includes(resolution, 'BW');
}

function calculateContentWidth(width, isBigWidth, isSmallWidth, verticalOrientation) {
    if (verticalOrientation) {
        if (isBigWidth) {
            return width * 9 / 10;
        }
        return width;
    }
    if (isSmallWidth) {
        return width * 9 / 10;
    }
    return width * GOLDEN_RATIO_FACTOR;
}

function calculateContentHeight(height, isBigHeight, isSmallHeight, topBarHeight, verticalOrientation) {
    if (verticalOrientation) {
        if (isBigHeight) {
            return height - topBarHeight * 2;
        }
        return height - topBarHeight;
    }
    if (isSmallHeight) {
        return height - topBarHeight;
    }
    return height - topBarHeight * 2;
}

function prepareState(height, width, isMobile) {
    const fontSizeRem = remToPixels(1);
    const resolution = prepareResolution(height, width);
    const isSmallHeight = checkSmallHeight(resolution);
    const isBigHeight = checkBigHeight(resolution);
    const isSmallWidth = checkSmallWidth(resolution);
    const isBigWidth = checkBigWidth(resolution);
    const isBigScreen = isBigHeight && isBigWidth;
    const isSmallScreen = isSmallHeight || isSmallWidth;
    const verticalOrientation = height > width;
    const topBarFontSizeRem = (isSmallWidth ? 2 : 3) * fontSizeRem;
    const topBarHeight = topBarFontSizeRem * TOP_BAR_HEIGHT_FONT_SIZE_FACTOR;
    const contentHeight = calculateContentHeight(height, isBigHeight, isSmallHeight, topBarHeight, verticalOrientation);
    const contentWidth = calculateContentWidth(width, isBigWidth, isSmallWidth, verticalOrientation);
    const standardImgHeight = Math.min(90, verticalOrientation
        ? (isSmallScreen ? fontSizeRem * 4.5 : fontSizeRem * 4.5)
        : (isSmallScreen ? fontSizeRem * 4.5 : fontSizeRem * 4.5));
    const rivalImgHeight = verticalOrientation
        ? (isSmallScreen ? fontSizeRem * 3.5 : fontSizeRem * 4.5)
        : (isSmallScreen ? fontSizeRem * 2.5 : fontSizeRem * 3.5);
    return {
        isMobile,
        isBigScreen,
        isSmallScreen,
        fontSizeRem,
        topBarFontSizeRem,
        height,
        width,
        contentHeight,
        contentWidth,
        resolution,
        isSmallHeight,
        isBigHeight,
        isSmallWidth,
        isBigWidth,
        verticalOrientation,
        standardImgHeight,
        rivalImgHeight,
    };
}

const isMobile = new MobileDetect(window.navigator.userAgent).mobile() !== null;
const initialHeight = isMobile ? window.outerHeight : window.innerHeight;
const initialWidth = isMobile ? window.outerWidth : window.innerWidth;
const initialState = prepareState(initialHeight, initialWidth, isMobile);

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case RESIZE: {
            const height = isMobile ? window.outerHeight : window.innerHeight;
            const width = isMobile ? window.outerWidth : window.innerWidth;
            return {
                ...state,
                ...prepareState(height, width, isMobile)
            };
        }
        default:
            return state
    }
}

export function screenResized() {
    return {type: RESIZE};
}

