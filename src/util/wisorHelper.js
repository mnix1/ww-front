import _ from 'lodash';
import wisor26 from '../media/image/wisor/head/26.png';
import wisor27 from '../media/image/wisor/head/27.png';
import wisor28 from '../media/image/wisor/head/28.png';
import wisor29 from '../media/image/wisor/head/29.png';
import wisor30 from '../media/image/wisor/head/30.png';
import wisor31 from '../media/image/wisor/head/31.png';
import wisor32 from '../media/image/wisor/head/32.png';
import wisor33 from '../media/image/wisor/head/33.png';
import wisor34 from '../media/image/wisor/head/34.png';
import wisor35 from '../media/image/wisor/head/35.png';
import wisor36 from '../media/image/wisor/head/36.png';
import wisor37 from '../media/image/wisor/head/37.png';
import wisor38 from '../media/image/wisor/head/38.png';
import wisor46 from '../media/image/wisor/head/46.png';
import wisor39 from '../media/image/wisor/head/39.png';
import wisor40 from '../media/image/wisor/head/40.png';
import wisor41 from '../media/image/wisor/head/41.png';
import wisor42 from '../media/image/wisor/head/42.png';
import wisor2 from '../media/image/wisor/head/2.png';
import wisor3 from '../media/image/wisor/head/3.png';
import wisor4 from '../media/image/wisor/head/4.png';
import wisor5 from '../media/image/wisor/head/5.png';
import wisor6 from '../media/image/wisor/head/6.png';
import wisor7 from '../media/image/wisor/head/7.png';
import wisor8 from '../media/image/wisor/head/8.png';
import wisor9 from '../media/image/wisor/head/9.png';
import wisor10 from '../media/image/wisor/head/10.png';
import wisor11 from '../media/image/wisor/head/11.png';
import wisor12 from '../media/image/wisor/head/12.png';
import wisor13 from '../media/image/wisor/head/13.png';
import wisor14 from '../media/image/wisor/head/14.png';
import wisor15 from '../media/image/wisor/head/15.png';
import wisor16 from '../media/image/wisor/head/16.png';
import wisor17 from '../media/image/wisor/head/17.png';
import wisor18 from '../media/image/wisor/head/18.png';
import wisor19 from '../media/image/wisor/head/19.png';
import wisor20 from '../media/image/wisor/head/20.png';
import wisor21 from '../media/image/wisor/head/21.png';
import wisor22 from '../media/image/wisor/head/22.png';
import wisor23 from '../media/image/wisor/head/23.png';
import wisor24 from '../media/image/wisor/head/24.png';
import wisor25 from '../media/image/wisor/head/25.png';
import wisor1 from '../media/image/wisor/head/1.png';
import wisor43 from '../media/image/wisor/head/43.png';
import wisor44 from '../media/image/wisor/head/44.png';
import wisor45 from '../media/image/wisor/head/45.png';
import wisor47 from '../media/image/wisor/head/47.png';
import wisor48 from '../media/image/wisor/head/48.png';
import robot from '../media/image/menu/robot.svg';

export const WISOR = {
    'wisor1': wisor1,
    'wisor2': wisor2,
    'wisor3': wisor3,
    'wisor4': wisor4,
    'wisor5': wisor5,
    'wisor6': wisor6,
    'wisor7': wisor7,
    'wisor8': wisor8,
    'wisor9': wisor9,
    'wisor10': wisor10,
    'wisor11': wisor11,
    'wisor12': wisor12,
    'wisor13': wisor13,
    'wisor14': wisor14,
    'wisor15': wisor15,
    'wisor16': wisor16,
    'wisor17': wisor17,
    'wisor18': wisor18,
    'wisor19': wisor19,
    'wisor20': wisor20,
    'wisor21': wisor21,
    'wisor22': wisor22,
    'wisor23': wisor23,
    'wisor24': wisor24,
    'wisor25': wisor25,
    'wisor26': wisor26,
    'wisor27': wisor27,
    'wisor28': wisor28,
    'wisor29': wisor29,
    'wisor30': wisor30,
    'wisor31': wisor31,
    'wisor32': wisor32,
    'wisor33': wisor33,
    'wisor34': wisor34,
    'wisor35': wisor35,
    'wisor36': wisor36,
    'wisor37': wisor37,
    'wisor38': wisor38,
    'wisor39': wisor39,
    'wisor40': wisor40,
    'wisor41': wisor41,
    'wisor42': wisor42,
    'wisor43': wisor43,
    'wisor44': wisor44,
    'wisor45': wisor45,
    'wisor46': wisor46,
    'wisor47': wisor47,
    'wisor48': wisor48,
    'robot': robot,
};

export function allPossibleWisors() {
    return _.keys(WISOR).filter(e => e !== 'robot');
}

export function getWisor(wisorType) {
    return WISOR[wisorType];
}