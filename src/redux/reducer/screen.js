import {BIG_TOP_BAR_HEIGHT, GOLDEN_RATIO_FACTOR, SMALL_TOP_BAR_HEIGHT} from "../../util/style/constant";
import MobileDetect from 'mobile-detect';
export const RESIZE = 'screen/resize';

function isSmall( height, width) {
    return height < 500 || width < 1200;
}

function calculateContentWidth(height, width) {
    if (isSmall(height,width)) {
        return width;
    }
    return width * GOLDEN_RATIO_FACTOR;
}
function calculateContentHeight(height, width) {
    if (isSmall(height,width)) {
        return height - SMALL_TOP_BAR_HEIGHT;
    }
    return height - BIG_TOP_BAR_HEIGHT;
}

const isMobile = new MobileDetect(window.navigator.userAgent).mobile() !== null;
const initialHeight = isMobile ? window.outerHeight : window.innerHeight;
const initialWidth = isMobile ? window.outerWidth : window.innerWidth;

const initialState = {
    height: initialHeight,
    width: initialWidth,
    contentHeight: calculateContentHeight(initialHeight, initialWidth),
    contentWidth: calculateContentWidth(initialHeight, initialWidth),
    isSmall: isSmall(initialHeight, initialWidth),
    isMobile
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case RESIZE: {
            const height = isMobile ? window.outerHeight : window.innerHeight;
            const width = isMobile ? window.outerWidth : window.innerWidth;
            return {
                ...state,
                height,
                width,
                contentHeight: calculateContentHeight(height, width),
                contentWidth: calculateContentWidth(height, width),
                isSmall: isSmall(initialHeight, initialWidth),
            };
        }
        default:
            return state
    }
}

export function screenResized() {
    return {type: RESIZE};
}

