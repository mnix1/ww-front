import ninja from '../media/image/disguise/ninja.svg';
import ghost from '../media/image/skill/ghost.svg';
import penguinRain from '../media/image/disguise/penguinRain.svg';
import judge from '../media/image/disguise/judge.png';
import chairRed from '../media/image/disguise/chairRed.svg';
import chairSimple from '../media/image/disguise/chairSimple.svg';
import chairGreen from '../media/image/disguise/chairGreen.svg';

const DISGUISE = {
    'NINJA': ninja,
    'GHOST': ghost,
    'JUDGE': judge,
    'PENGUIN_RAIN': penguinRain,
    'CHAIR_RED': chairRed,
    'CHAIR_SIMPLE': chairSimple,
    'CHAIR_GREEN': chairGreen,
};

export function getDisguise(disguise) {
    return DISGUISE[disguise];
}