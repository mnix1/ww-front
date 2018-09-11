import {
    COMBINING_FACTS,
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

export function getWisieAttributeLabel(lang, id) {
    return HERO_ATTRIBUTE_LABELS[lang][id];
}

const HERO_ATTRIBUTE_LABELS = {
    [POLISH]: {
        [MEMORY]: 'Pamięć',
        [LOGIC]: 'Logika',
        [PERCEPTIVITY]: 'Spostrzegawczość',
        [COUNTING]: 'Liczenie',
        [COMBINING_FACTS]: 'Łączenie faktów',
        [PATTERN_RECOGNITION]: 'Rozpoznawanie wzorców',
        [IMAGINATION]: 'Wyobraźnia',
        [SPEED]: 'Szybkość',
        [REFLEX]: 'Refleks',
        [CONCENTRATION]: 'Koncentracja',
        [CONFIDENCE]: 'Pewność siebie',
        [INTUITION]: 'Intuicja',
    },
    [ENGLISH]: {
        [MEMORY]: 'Memory',
        [LOGIC]: 'Logic',
        [PERCEPTIVITY]: 'Perceptivity',
        [COUNTING]: 'Counting',
        [COMBINING_FACTS]: 'Combining facts',
        [PATTERN_RECOGNITION]: 'Pattern recognition',
        [IMAGINATION]: 'Imagination',
        [SPEED]: 'Speed',
        [REFLEX]: 'Reflex',
        [CONCENTRATION]: 'Concentration',
        [CONFIDENCE]: 'Confidence',
        [INTUITION]: 'Intuition',
    }
};