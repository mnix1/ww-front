import colorfulMagazineEn from '../media/image/book/en/colorfulMagazine.png';
import fairyTaleEn from '../media/image/book/en/fairyTale.png';
import sportMagazineEn from '../media/image/book/en/sportMagazine.png';
import tvGuideEn from '../media/image/book/en/tvGuide.png';
import newspaperEn from '../media/image/book/en/newspaper.svg';
import leafletEn from '../media/image/book/en/leaflet.png';
import romanceNovelEn from '../media/image/book/en/romanceNovel.png';
import userManualEn from '../media/image/book/en/userManual.svg';
import biographyEn from '../media/image/book/en/biography.svg';
import historicalNovelEn from '../media/image/book/en/historicalNovel.png';
import crosswordEn from '../media/image/book/en/crossword.svg';
import financialStatementEn from '../media/image/book/en/financialStatement.svg';
import worldAtlasEn from '../media/image/book/en/worldAtlas.png';
import studentBookEn from '../media/image/book/en/studentBook.png';
import encyclopediaEn from '../media/image/book/en/encyclopedia.png';
import scienceArticleEn from '../media/image/book/en/scienceArticle.svg';
import mysteriousBookEn from '../media/image/book/en/mysteriousBook.png';
import secretBookEn from '../media/image/book/en/secretBook.png';

import colorfulMagazinePl from '../media/image/book/pl/colorfulMagazine.png';
import fairyTalePl from '../media/image/book/pl/fairyTale.png';
import sportMagazinePl from '../media/image/book/pl/sportMagazine.png';
import tvGuidePl from '../media/image/book/pl/tvGuide.png';
import newspaperPl from '../media/image/book/pl/newspaper.svg';
import leafletPl from '../media/image/book/pl/leaflet.png';
import romanceNovelPl from '../media/image/book/pl/romanceNovel.png';
import userManualPl from '../media/image/book/pl/userManual.svg';
import biographyPl from '../media/image/book/pl/biography.svg';
import historicalNovelPl from '../media/image/book/pl/historicalNovel.png';
import crosswordPl from '../media/image/book/pl/crossword.svg';
import financialStatementPl from '../media/image/book/pl/financialStatement.svg';
import worldAtlasPl from '../media/image/book/pl/worldAtlas.png';
import studentBookPl from '../media/image/book/pl/studentBook.png';
import encyclopediaPl from '../media/image/book/pl/encyclopedia.png';
import scienceArticlePl from '../media/image/book/pl/scienceArticle.svg';
import mysteriousBookPl from '../media/image/book/pl/mysteriousBook.png';
import secretBookPl from '../media/image/book/pl/secretBook.png';
import {POLISH} from "../lang/langText";

export const BOOK_LEAFLET = 'LEAFLET';
export const BOOK_FAIRY_TALE = 'FAIRY_TALE';
export const BOOK_TV_GUIDE = 'TV_GUIDE';
export const BOOK_COLORFUL_MAGAZINE = 'COLORFUL_MAGAZINE';
export const BOOK_SPORT_MAGAZINE = 'SPORT_MAGAZINE';
export const BOOK_NEWSPAPER = 'NEWSPAPER';
export const BOOK_ROMANCE_NOVEL = 'ROMANCE_NOVEL';
export const BOOK_USER_MANUAL = 'USER_MANUAL';
export const BOOK_BIOGRAPHY = 'BIOGRAPHY';
export const BOOK_HISTORICAL_NOVEL = 'HISTORICAL_NOVEL';
export const BOOK_CROSSWORD = 'CROSSWORD';
export const BOOK_FINANCIAL_STATEMENT = 'FINANCIAL_STATEMENT';
export const BOOK_WORLD_ATLAS = 'WORLD_ATLAS';
export const BOOK_STUDENT_BOOK = 'STUDENT_BOOK';
export const BOOK_ENCYCLOPEDIA = 'ENCYCLOPEDIA';
export const BOOK_SCIENCE_ARTICLE = 'SCIENCE_ARTICLE';
export const BOOK_MYSTERIOUS_BOOK = 'MYSTERIOUS_BOOK';
export const BOOK_SECRET_BOOK = 'SECRET_BOOK';

const BOOK_EN = {
    [BOOK_LEAFLET]: leafletEn,
    [BOOK_FAIRY_TALE]: fairyTaleEn,
    [BOOK_TV_GUIDE]: tvGuideEn,
    [BOOK_COLORFUL_MAGAZINE]: colorfulMagazineEn,
    [BOOK_SPORT_MAGAZINE]: sportMagazineEn,
    [BOOK_NEWSPAPER]: newspaperEn,
    [BOOK_ROMANCE_NOVEL]: romanceNovelEn,
    [BOOK_USER_MANUAL]: userManualEn,
    [BOOK_BIOGRAPHY]: biographyEn,
    [BOOK_HISTORICAL_NOVEL]: historicalNovelEn,
    [BOOK_CROSSWORD]: crosswordEn,
    [BOOK_FINANCIAL_STATEMENT]: financialStatementEn,
    [BOOK_WORLD_ATLAS]: worldAtlasEn,
    [BOOK_STUDENT_BOOK]: studentBookEn,
    [BOOK_ENCYCLOPEDIA]: encyclopediaEn,
    [BOOK_SCIENCE_ARTICLE]: scienceArticleEn,
    [BOOK_MYSTERIOUS_BOOK]: mysteriousBookEn,
    [BOOK_SECRET_BOOK]: secretBookEn,
};

const BOOK_PL = {
    [BOOK_LEAFLET]: leafletPl,
    [BOOK_FAIRY_TALE]: fairyTalePl,
    [BOOK_TV_GUIDE]: tvGuidePl,
    [BOOK_COLORFUL_MAGAZINE]: colorfulMagazinePl,
    [BOOK_SPORT_MAGAZINE]: sportMagazinePl,
    [BOOK_NEWSPAPER]: newspaperPl,
    [BOOK_ROMANCE_NOVEL]: romanceNovelPl,
    [BOOK_USER_MANUAL]: userManualPl,
    [BOOK_BIOGRAPHY]: biographyPl,
    [BOOK_HISTORICAL_NOVEL]: historicalNovelPl,
    [BOOK_CROSSWORD]: crosswordPl,
    [BOOK_FINANCIAL_STATEMENT]: financialStatementPl,
    [BOOK_WORLD_ATLAS]: worldAtlasPl,
    [BOOK_STUDENT_BOOK]: studentBookPl,
    [BOOK_ENCYCLOPEDIA]: encyclopediaPl,
    [BOOK_SCIENCE_ARTICLE]: scienceArticlePl,
    [BOOK_MYSTERIOUS_BOOK]: mysteriousBookPl,
    [BOOK_SECRET_BOOK]: secretBookPl,
};

export function getBook(book) {
    let BOOK = BOOK_EN;
    if (window.activeLang === POLISH) {
        BOOK = BOOK_PL;
    }
    const b = BOOK[book];
    if (b == null) {
        return BOOK[BOOK_FAIRY_TALE];
    }
    return b;
}

const MIN_BOOK_WIDTH = 180;
const MAX_BOOK_WIDTH = 300;

const bookWidthCache = {};

export function calculateBookWidth(contentWidth) {
    const cacheValue = bookWidthCache[contentWidth];
    if (cacheValue) {
        return cacheValue;
    }
    let minCount = Math.floor(contentWidth / MAX_BOOK_WIDTH);
    let maxCount = Math.floor(contentWidth / MIN_BOOK_WIDTH);
    if (minCount === maxCount) {
        return MAX_BOOK_WIDTH;
    }
    if (maxCount - minCount > 1) {
        return contentWidth / ((maxCount + minCount) / 2);
    }
    if (minCount === 1) {
        return contentWidth / maxCount;
    }
    if (minCount === 0) {
        return MIN_BOOK_WIDTH;
    }
    return contentWidth / minCount;
}