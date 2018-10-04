import ninja from '../media/image/disguise/ninja.svg';
import ghost from '../media/image/skill/ghost.svg';
import rain from '../media/image/disguise/rain.svg';
import chairRed from '../media/image/disguise/chairRed.svg';
import chairSimple from '../media/image/disguise/chairSimple.svg';
import chairGreen from '../media/image/disguise/chairGreen.svg';

const DISGUISE = {
    'NINJA': ninja,
    'GHOST': ghost,
    'PENGUIN_RAIN': rain,
    'CHAIR_RED': chairRed,
    'CHAIR_SIMPLE': chairSimple,
    'CHAIR_GREEN': chairGreen,
};

export function getDisguise(disguise) {
    return DISGUISE[disguise];
}