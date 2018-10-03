import helpButton from '../media/image/skill/helpButton.svg';
import waterPistol from '../media/image/skill/waterPistol.svg';
import lifebuoy from '../media/image/skill/lifebuoy.svg';
import shield from '../media/image/skill/shield.svg';
import ghost from '../media/image/skill/ghost.svg';

export const SKILL_HINT = 'HINT';
export const SKILL_WATER_PISTOL = 'WATER_PISTOL';
export const SKILL_KIDNAPPING = 'KIDNAPPING';
export const SKILL_LIFEBUOY = 'LIFEBUOY';
export const SKILL_SHIELD = 'SHIELD';

const SKILLS = {
    [SKILL_HINT]: helpButton,
    [SKILL_WATER_PISTOL]: waterPistol,
    [SKILL_KIDNAPPING]: ghost,
    [SKILL_LIFEBUOY]: lifebuoy,
    [SKILL_SHIELD]: shield,
};

export function getSkill(skill) {
    return SKILLS[skill];
}

