import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../index";
import {
    SKILL_CHANGE_TASK,
    SKILL_COVERALL,
    SKILL_GHOST,
    SKILL_HINT,
    SKILL_LIFEBUOY,
    SKILL_MOTIVATOR,
    SKILL_NINJA,
    SKILL_PIZZA,
    SKILL_TEACHER,
    SKILL_WATER_PISTOL
} from "../util/skillHelper";

export function getSkillLabel(id, lang) {
    return SKILL_LABELS[lang || getActiveLang()][id];
}

const SKILL_LABELS = {
    [POLISH]: {
        [SKILL_TEACHER]: 'Nauczyciel',
        [SKILL_MOTIVATOR]: 'Motywator',
        [SKILL_HINT]: 'Podpowiedź',
        [SKILL_WATER_PISTOL]: 'Pistolet na wodę',
        [SKILL_NINJA]: 'Porywacz',
        [SKILL_LIFEBUOY]: 'Koło ratunkowe',
        [SKILL_GHOST]: 'Straszydło',
        [SKILL_PIZZA]: 'Pizzer',
        [SKILL_COVERALL]: 'Kombinezon',
        [SKILL_CHANGE_TASK]: 'Zmiana pytania',
    },
    [ENGLISH]: {
        [SKILL_TEACHER]: "Teacher",
        [SKILL_MOTIVATOR]: "Motivator",
        [SKILL_HINT]: "Hint",
        [SKILL_WATER_PISTOL]: "Water pistol",
        [SKILL_NINJA]: "Kidnapper",
        [SKILL_LIFEBUOY]: "Lifebuoy",
        [SKILL_GHOST]: "Bogeyman",
        [SKILL_PIZZA]: "Pizzaiolo",
        [SKILL_COVERALL]: "Coverall",
        [SKILL_CHANGE_TASK]: "Question change",
    }
};