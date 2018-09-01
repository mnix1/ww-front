import {GOLDEN_RATIO_FACTOR} from "../../util/style/constant";
import MobileDetect from 'mobile-detect';
import _ from 'lodash';

export const RESIZE = 'screen/resize';

export const SHSW = 'SHSW';
export const MHSW = 'MHSW';
export const BHSW = 'BHSW';
export const SHMW = 'SHMW';
export const SHBW = 'SHBW';
export const MHMW = 'MHMW';
export const BHMW = 'BHMW';
export const MHBW = 'MHBW';
export const BHBW = 'BHBW';

export function getResolutionFactor(resolution) {
    if (SHSW === resolution)
        return 1;
    if (SHMW === resolution || MHSW === resolution)
        return 1.2;
    if (MHMW === resolution || SHBW === resolution || BHSW === resolution)
        return 1.4;
    if (MHBW === resolution || BHMW === resolution)
        return 1.6;
    if (BHBW === resolution)
        return 1.8;

}

function prepareResolution(height, width) {
    let heightPart;
    if (height < 800) {
        heightPart = 'SH';
    } else if (height < 1000) {
        heightPart = 'MH';
    } else {
        heightPart = 'BH'
    }
    let widthPart;
    if (width < 1024) {
        widthPart = 'SW';
    } else if (width < 1440) {
        widthPart = 'MW';
    } else {
        widthPart = 'BW'
    }
    return heightPart + widthPart;
}

function checkSmallWidth(resolution) {
    return _.includes(resolution, 'SW');
}

function checkMoreHeightThanWidth(height, width) {
    return height > width;
}

export function checkSmallHeight(resolution) {
    return _.includes(resolution, 'SH');
}

export function checkNotBigHeight(resolution) {
    return !_.includes(resolution, 'BH');
}

function calculateContentWidth(width, isSmallWidth, moreHeightThanWidth) {
    if (moreHeightThanWidth) {
        return width;
    }
    if (isSmallWidth) {
        return width * 5.5 / 6;
    }
    return width * GOLDEN_RATIO_FACTOR;
}

function calculateContentHeight(height, isSmallHeight, moreHeightThanWidth) {
    // if (moreHeightThanWidth) {
    //     return height * 8 / 10;
    // }
    if (isSmallHeight) {
        return height * 8.8 / 10;
    }
    return height * 4 / 5;
}

const isMobile = new MobileDetect(window.navigator.userAgent).mobile() !== null;

const initialHeight = isMobile ? window.outerHeight : window.innerHeight;
const initialWidth = isMobile ? window.outerWidth : window.innerWidth;

const resolution = prepareResolution(initialHeight, initialWidth);
const isSmallHeight = checkSmallHeight(resolution);
const isSmallWidth = checkSmallWidth(resolution);
const isNotBigHeight = checkNotBigHeight(resolution);
const moreHeightThanWidth = checkMoreHeightThanWidth(initialHeight, initialWidth);
const initialState = {
    height: initialHeight,
    width: initialWidth,
    resolution,
    isSmallHeight,
    isSmallWidth,
    isNotBigHeight,
    moreHeightThanWidth,
    heroImgHeight: isSmallHeight ? moreHeightThanWidth ? 60 : 50 : 80,
    contentHeight: calculateContentHeight(initialHeight, isSmallHeight, moreHeightThanWidth),
    contentWidth: calculateContentWidth(initialWidth, isSmallWidth, moreHeightThanWidth),
    isMobile
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case RESIZE: {
            const height = isMobile ? window.outerHeight : window.innerHeight;
            const width = isMobile ? window.outerWidth : window.innerWidth;
            const resolution = prepareResolution(height, initialWidth);
            const isSmallHeight = checkSmallHeight(resolution);
            const isSmallWidth = checkSmallWidth(resolution);
            const isNotBigHeight = checkNotBigHeight(resolution);
            const moreHeightThanWidth = checkMoreHeightThanWidth(height, width);
            return {
                ...state,
                height,
                width,
                isSmallHeight,
                isSmallWidth,
                isNotBigHeight,
                moreHeightThanWidth,
                heroImgHeight: isSmallHeight ? moreHeightThanWidth ? 60 : 50 : 80,
                contentHeight: calculateContentHeight(height, isSmallHeight, moreHeightThanWidth),
                contentWidth: calculateContentWidth(width, isSmallWidth, moreHeightThanWidth),
                resolution
            };
        }
        default:
            return state
    }
}

export function screenResized() {
    return {type: RESIZE};
}

