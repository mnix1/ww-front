import {ENGLISH, POLISH} from "./text";
import {
    CHARISMA,
    COMBINING_FACTS, CONCENTRATION,
    COUNTING,
    IMAGINATION, INTUITION, LEADERSHIP,
    LOGIC,
    MEMORY,
    PATTERN_RECOGNITION,
    PERCEPTIVITY, REFLEX
} from "../util/heroStatHelper";

export function getHeroStatLabel(id) {
    return HERO_STAT_LABELS[window.activeLang][id];
}

const HERO_STAT_LABELS = {
    [POLISH]: {
        [MEMORY]: 'Pamięć',
        [LOGIC]: 'Logika',
        [PERCEPTIVITY]: 'Spostrzegawczość',
        [COUNTING]: 'Liczenie',
        [COMBINING_FACTS]: 'Łączenie faktów',
        [PATTERN_RECOGNITION]: 'Rozpoznawanie wzorców',
        [IMAGINATION]: 'Wyobraźnia',
        [REFLEX]: 'Refleks',
        [CONCENTRATION]: 'Koncentracja',
        [LEADERSHIP]: 'Przewodnictwo',
        [CHARISMA]: 'Charyzma',
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
        [REFLEX]: 'Reflex',
        [CONCENTRATION]: 'Concentration',
        [LEADERSHIP]: 'Leadership',
        [CHARISMA]: 'Charisma',
        [INTUITION]: 'Intuition',
    }
};