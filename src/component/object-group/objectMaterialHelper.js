import _ from "lodash";
import {CREAM_COLOR, DARK_BLUE_COLOR} from "../../util/style/constant";

export const OBJECT_MATERIALS = [
    {"background": "#14457f", "color": CREAM_COLOR, "isDark": true},
    {"background": "#ebf2eb", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#525667", "color": CREAM_COLOR, "isDark": true},
    {"background": "#99d8ce", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#086580", "color": CREAM_COLOR, "isDark": true},
    {"background": "#c0c5e3", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#027e4e", "color": CREAM_COLOR, "isDark": true},
    {"background": "#6e1e5d", "color": CREAM_COLOR, "isDark": true},
    {"background": "#ccefe2", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#142353", "color": CREAM_COLOR, "isDark": true},
    {"background": "#756a7e", "color": CREAM_COLOR, "isDark": true},
    {"background": "#8e5610", "color": CREAM_COLOR, "isDark": true},
    {"background": "#e1b271", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#da92d9", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#3b3ee3", "color": CREAM_COLOR, "isDark": true},
    {"background": "#01f7af", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#fdd1f3", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#2c358a", "color": CREAM_COLOR, "isDark": true},
    {"background": "#5068ab", "color": CREAM_COLOR, "isDark": true},
    {"background": "#95800c", "color": CREAM_COLOR, "isDark": true},
    {"background": "#69d495", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#ad3340", "color": CREAM_COLOR, "isDark": true},
    {"background": "#647f1e", "color": CREAM_COLOR, "isDark": true},
    {"background": "#f5c765", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#68f9af", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#7cd76b", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#b3febb", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#851e66", "color": CREAM_COLOR, "isDark": true},
    {"background": "#359544", "color": CREAM_COLOR, "isDark": true},
    {"background": "#007abd", "color": CREAM_COLOR, "isDark": true},
    {"background": "#b61811", "color": CREAM_COLOR, "isDark": true},
    {"background": "#d9b638", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#372157", "color": CREAM_COLOR, "isDark": true},
    {"background": "#886826", "color": CREAM_COLOR, "isDark": true},
    {"background": "#81e48c", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#5a12a0", "color": CREAM_COLOR, "isDark": true},
    {"background": "#522d0b", "color": CREAM_COLOR, "isDark": true},
    {"background": "#6e8d50", "color": CREAM_COLOR, "isDark": true},
    {"background": "#3c2766", "color": CREAM_COLOR, "isDark": true},
    {"background": "#0e0a50", "color": CREAM_COLOR, "isDark": true},
    {"background": "#7ff0a7", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#281080", "color": CREAM_COLOR, "isDark": true},
    {"background": "#cf660b", "color": CREAM_COLOR, "isDark": true},
    {"background": "#07a035", "color": CREAM_COLOR, "isDark": true},
    {"background": "#e1da27", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#da9c0e", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#c12d4a", "color": CREAM_COLOR, "isDark": true},
    {"background": "#8cce9a", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#abd945", "color": DARK_BLUE_COLOR, "isBright": true},
    {"background": "#0d488f", "color": CREAM_COLOR, "isDark": true},
    {"background": "#447a6e", "color": CREAM_COLOR, "isDark": true}
];

export const CORRECT_ANSWER_OBJECT_MATERIAL = {"background": "#00B400", "color": CREAM_COLOR, isDark: true};
export const WRONG_ANSWER_OBJECT_MATERIAL = {"background": "#B40000", "color": CREAM_COLOR, isDark: true};

export const ANSWER_OBJECT_MATERIALS = [
    {"background": "#ad7142", "color": CREAM_COLOR, "isDark": true},
    {"background": "#14548f", "color": CREAM_COLOR, "isDark": true},
    {"background": "#405766", "color": CREAM_COLOR, "isDark": true},
    {"background": "#685270", "color": CREAM_COLOR, "isDark": true},
    {"background": "#c0c5e3", "color": CREAM_COLOR, "isDark": true},
];

export function randomObjectMaterial() {
    return OBJECT_MATERIALS[_.random(0, OBJECT_MATERIALS.length - 1)];
}

export function generateObjectMaterial() {
    function rgb2hex(red, green, blue) {
        const rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
    }

    const r = _.random(0, 255);
    const g = _.random(0, 255);
    const b = _.random(0, 255);
    const lightColor = '#fffdf1';
    const darkColor = '#2879da';
    const style = {background: rgb2hex(r, g, b), color: (r + g + b) / 3 <= 128 ? lightColor : darkColor};
    return style;
}