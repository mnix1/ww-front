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

const WISOR = {
    'WISOR_1': wisor1,
    'WISOR_2': wisor2,
    'WISOR_3': wisor3,
    'WISOR_4': wisor4,
    'WISOR_5': wisor5,
    'WISOR_6': wisor6,
    'WISOR_7': wisor7,
    'WISOR_8': wisor8,
    'WISOR_9': wisor9,
    'WISOR_10': wisor10,
    'WISOR_11': wisor11,
    'WISOR_12': wisor12,
    'WISOR_13': wisor13,
    'WISOR_14': wisor14,
    'WISOR_15': wisor15,
    'WISOR_16': wisor16,
    'WISOR_17': wisor17,
    'WISOR_18': wisor18,
    'WISOR_19': wisor19,
    'WISOR_20': wisor20,
    'WISOR_21': wisor21,
    'WISOR_22': wisor22,
    'WISOR_23': wisor23,
    'WISOR_24': wisor24,
    'WISOR_25': wisor25,
    'WISOR_26': wisor26,
    'WISOR_27': wisor27,
    'WISOR_28': wisor28,
    'WISOR_29': wisor29,
    'WISOR_30': wisor30,
    'WISOR_31': wisor31,
    'WISOR_32': wisor32,
    'WISOR_33': wisor33,
    'WISOR_34': wisor34,
    'WISOR_35': wisor35,
    'WISOR_36': wisor36,
    'WISOR_37': wisor37,
    'WISOR_38': wisor38,
    'WISOR_39': wisor39,
    'WISOR_40': wisor40,
    'WISOR_41': wisor41,
    'WISOR_42': wisor42,
    'WISOR_43': wisor43,
    'WISOR_44': wisor44,
    'WISOR_45': wisor45,
    'WISOR_46': wisor46,
    'WISOR_47': wisor47,
    'WISOR_48': wisor48,
};

export function allPossibleWisors() {
    return _.keys(WISOR);
}

export function getWisor(wisorType) {
    return WISOR[wisorType];
}