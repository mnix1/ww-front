import {getText, TEXT_APP_NAME} from "../../lang/langText";

export const POLISH = 'POLISH';
export const ENGLISH = 'ENGLISH';

export const LANG_CHANGED = 'language/lang/changed';

const initialState = {
    lang: ENGLISH,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LANG_CHANGED:
            return {...state, lang: action.lang};
        default:
            return state
    }
}

export const langChanged = (lang) => {
    document.title = getText(TEXT_APP_NAME);
    return {type: LANG_CHANGED, lang}
};
