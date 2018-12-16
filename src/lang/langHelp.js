import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../index";

export const WISIE_SKILL = 'WISIE_SKILL';

export function getHelpLabel(id) {
    return HELP_LABELS[getActiveLang()][id];
}

const HELP_LABELS = {
    [POLISH]: {
        [WISIE_SKILL]: 'Umiejętności Wiedzaków',
    },
    [ENGLISH]: {
        [WISIE_SKILL]: "Wisie's skills",
    }
};