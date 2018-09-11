import {ENGLISH, POLISH} from "../redux/reducer/language";

const LEAFLET= 'LEAFLET';
const FAIRY_TALE= 'FAIRY_TALE';
const TV_GUIDE= 'TV_GUIDE';
const COLORFUL_MAGAZINE= 'COLORFUL_MAGAZINE';
const SPORT_MAGAZINE= 'SPORT_MAGAZINE';
const NEWSPAPER= 'NEWSPAPER';
const ROMANCE_NOVEL= 'ROMANCE_NOVEL';
const USER_MANUAL= 'USER_MANUAL';
const BIOGRAPHY= 'BIOGRAPHY';
const HISTORICAL_NOVEL= 'HISTORICAL_NOVEL';
const CROSSWORD= 'CROSSWORD';
const FINANCIAL_STATEMENT= 'FINANCIAL_STATEMENT';
const WORLD_ATLAS= 'WORLD_ATLAS';
const STUDENT_BOOK= 'STUDENT_BOOK';
const ENCYCLOPEDIA= 'ENCYCLOPEDIA';
const SCIENCE_ARTICLE= 'SCIENCE_ARTICLE';
const MYSTERIOUS_BOOK= 'MYSTERIOUS_BOOK';
const SECRET_BOOK= 'SECRET_BOOK';

export function getBookLabel(lang, id) {
    return BOOK_LABELS[lang][id];
}
const BOOK_LABELS = {
    [POLISH]: {
        [LEAFLET]: 'Gazetka sklepowa',
        [FAIRY_TALE]: 'Bajka',
        [TV_GUIDE]: 'Program TV',
        [COLORFUL_MAGAZINE]: 'Kolorowe czasopismo',
        [SPORT_MAGAZINE]: 'Magazyn sportowy',
        [NEWSPAPER]: 'Gazeta',
        [ROMANCE_NOVEL]: 'Romans',
        [USER_MANUAL]: 'Instrukcja obsługi',
        [BIOGRAPHY]: 'Biografia',
        [HISTORICAL_NOVEL]: 'Powieść historyczna',
        [CROSSWORD]: 'Krzyżówka',
        [FINANCIAL_STATEMENT]: 'Sprawozdanie finansowe',
        [WORLD_ATLAS]: 'Atlas świata',
        [STUDENT_BOOK]: 'Podręcznik szkolny',
        [ENCYCLOPEDIA]: 'Encyklopedia',
        [SCIENCE_ARTICLE]: 'Artykuł naukowy',
        [MYSTERIOUS_BOOK]: 'Zagadkowa księga',
        [SECRET_BOOK]: 'Tajemna księga',
    },
    [ENGLISH]: {
        [LEAFLET]: 'Leaflet',
        [FAIRY_TALE]: 'Fairy tale',
        [TV_GUIDE]: 'TV program',
        [COLORFUL_MAGAZINE]: 'Colorful magazine',
        [SPORT_MAGAZINE]: 'Sports magazine',
        [NEWSPAPER]: 'Newspaper',
        [ROMANCE_NOVEL]: 'Romance novel',
        [USER_MANUAL]: 'User manual',
        [BIOGRAPHY]: 'Biography',
        [HISTORICAL_NOVEL]: 'Historical novel',
        [CROSSWORD]: 'Crossword',
        [FINANCIAL_STATEMENT]: 'Financial Statement',
        [WORLD_ATLAS]: 'World Atlas',
        [STUDENT_BOOK]: "Student's book",
        [ENCYCLOPEDIA]: 'Encyclopedia',
        [SCIENCE_ARTICLE]: 'Science article',
        [MYSTERIOUS_BOOK]: 'Mysterious  book',
        [SECRET_BOOK]: 'Secret book',
    }
};