import _ from "lodash";

export const TILE_MATERIALS = [
    {"background": "rgb(20,69,127)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(235,242,235)", "color": "#2879da", isBright: true},
    {"background": "rgb(82,86,103)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(153,216,206)", "color": "#2879da", isBright: true},
    {"background": "rgb(8,101,128)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(192,197,227)", "color": "#2879da", isBright: true},
    {"background": "rgb(2,126,78)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(110,30,93)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(204,239,226)", "color": "#2879da", isBright: true},
    {"background": "rgb(20,35,83)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(117,106,126)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(142,86,16)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(225,178,113)", "color": "#2879da", isBright: true},
    {"background": "rgb(218,146,217)", "color": "#2879da", isBright: true},
    {"background": "rgb(59,62,227)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(1,247,175)", "color": "#2879da", isBright: true},
    {"background": "rgb(253,209,243)", "color": "#2879da", isBright: true},
    {"background": "rgb(44,53,138)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(80,104,171)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(149,128,12)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(105,212,149)", "color": "#2879da", isBright: true},
    {"background": "rgb(173,51,64)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(100,127,30)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(245,199,101)", "color": "#2879da", isBright: true},
    {"background": "rgb(104,249,175)", "color": "#2879da", isBright: true},
    {"background": "rgb(124,215,107)", "color": "#2879da", isBright: true},
    {"background": "rgb(179,254,187)", "color": "#2879da", isBright: true},
    {"background": "rgb(133,30,102)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(53,149,68)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(0,122,189)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(182,24,17)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(217,182,56)", "color": "#2879da", isBright: true},
    {"background": "rgb(55,33,87)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(136,104,38)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(129,228,140)", "color": "#2879da", isBright: true},
    {"background": "rgb(90,18,160)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(82,45,11)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(110,141,80)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(60,39,102)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(14,10,80)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(127,240,167)", "color": "#2879da", isBright: true},
    {"background": "rgb(40,16,128)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(207,102,11)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(7,160,53)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(225,218,39)", "color": "#2879da", isBright: true},
    {"background": "rgb(218,156,14)", "color": "#2879da", isBright: true},
    {"background": "rgb(193,45,74)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(140,206,154)", "color": "#2879da", isBright: true},
    {"background": "rgb(171,217,69)", "color": "#2879da", isBright: true},
    {"background": "rgb(13,72,143)", "color": "#fffdf1", isDark: true},
    {"background": "rgb(68,122,110)", "color": "#fffdf1", isDark: true}
];

export function randomTileMaterial() {
    return TILE_MATERIALS[_.random(0, TILE_MATERIALS.length - 1)];
}

export function generateTileMaterial() {
    const r = _.random(0, 255);
    const g = _.random(0, 255);
    const b = _.random(0, 255);
    const lightColor = '#fffdf1';
    const darkColor = '#2879da';
    const style = {background: `rgb(${r},${g},${b})`, color: (r + g + b) / 3 <= 128 ? lightColor : darkColor}
    console.log(JSON.stringify(style));
    return style;
}

export function tileDimension(screen, factor = 1) {
    const {height, contentWidth, isSmall} = screen;
    factor /= isSmall ? 4 : 8;
    const dimension = Math.min(factor * contentWidth, factor * height);
    return dimension;
    // return {width: dimension, height: dimension};
}

export const TILE_TYPE_BATTLE = 'battle';
export const TILE_TYPE_TRAINING = 'training';
export const TILE_TYPE_HISTORY = 'history';
export const TILE_TYPE_FRIEND = 'friend';