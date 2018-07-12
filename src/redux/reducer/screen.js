import {GOLDEN_RATIO_FACTOR} from "../../util/style/constant";
import MobileDetect from 'mobile-detect';
export const RESIZE = 'screen/resize';

function isSmall(width) {
    return width < 1200;
}

function calculateContentWidth(width) {
    if (isSmall(width)) {
        return width;
    }
    return width * GOLDEN_RATIO_FACTOR;
}

const isMobile = new MobileDetect(window.navigator.userAgent).mobile() !== null;
const initialHeight = isMobile ? window.outerHeight : window.innerHeight;
const initialWidth = isMobile ? window.outerWidth : window.innerWidth;

const initialState = {
    height: initialHeight,
    width: initialWidth,
    contentWidth: calculateContentWidth(initialWidth),
    isSmall: isSmall(initialWidth),
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
                contentWidth: calculateContentWidth(width),
                isSmall: isSmall(width)
            };
        }
        default:
            return state
    }
}

export function screenResized() {
    return {type: RESIZE};
}

