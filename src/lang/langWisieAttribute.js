import {
    CUNNING,
    CONCENTRATION,
    CONFIDENCE,
    COUNTING,
    IMAGINATION,
    INTUITION,
    LOGIC,
    MEMORY,
    PATTERN_RECOGNITION,
    PERCEPTIVITY,
    REFLEX,
    SPEED
} from "../util/wisieAttributeHelper";
import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../index";

export function getWisieAttributeLabel(id) {
    return HERO_ATTRIBUTE_LABELS[getActiveLang()][id];
}

const HERO_ATTRIBUTE_LABELS = {
    [POLISH]: {
        [MEMORY]: 'Pamięć',
        [LOGIC]: 'Logika',
        [PERCEPTIVITY]: 'Spostrzegawczość',
        [COUNTING]: 'Liczenie',
        [PATTERN_RECOGNITION]: 'Rozpoznawanie wzorców',
        [IMAGINATION]: 'Wyobraźnia',
        [SPEED]: 'Szybkość',
        [REFLEX]: 'Refleks',
        [CUNNING]: 'Przebiegłość',
        [CONCENTRATION]: 'Koncentracja',
        [CONFIDENCE]: 'Pewność siebie',
        [INTUITION]: 'Intuicja',
    },
    [ENGLISH]: {
        [MEMORY]: 'Memory',
        [LOGIC]: 'Logic',
        [PERCEPTIVITY]: 'Perceptivity',
        [COUNTING]: 'Counting',
        [PATTERN_RECOGNITION]: 'Pattern recognition',
        [IMAGINATION]: 'Imagination',
        [SPEED]: 'Speed',
        [REFLEX]: 'Reflex',
        [CUNNING]: 'Cunning',
        [CONCENTRATION]: 'Concentration',
        [CONFIDENCE]: 'Confidence',
        [INTUITION]: 'Intuition',
    }
};