import colorfulMagazine from '../media/image/book/colorfulMagazine.svg';
import fairyTale from '../media/image/book/fairyTale.svg';
import sportMagazine from '../media/image/book/sportMagazine.svg';
import tvGuide from '../media/image/book/tvGuide.svg';
import newspaper from '../media/image/book/newspaper.svg';
import leaflet from '../media/image/book/leaflet.svg';
import romanceNovel from '../media/image/book/romanceNovel.svg';
import userManual from '../media/image/book/userManual.svg';
import biography from '../media/image/book/biography.svg';
import historicalNovel from '../media/image/book/historicalNovel.svg';
import crossword from '../media/image/book/crossword.svg';
import financialStatement from '../media/image/book/financialStatement.svg';
import worldAtlas from '../media/image/book/worldAtlas.svg';
import studentBook from '../media/image/book/studentBook.svg';
import encyclopedia from '../media/image/book/encyclopedia.svg';
import scienceArticle from '../media/image/book/scienceArticle.svg';
import mysteriousBook from '../media/image/book/mysteriousBook.svg';
import secretBook from '../media/image/book/secretBook.svg';

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

const BOOK = {
    [BOOK_LEAFLET]: leaflet,
    [BOOK_FAIRY_TALE]: fairyTale,
    [BOOK_TV_GUIDE]: tvGuide,
    [BOOK_COLORFUL_MAGAZINE]: colorfulMagazine,
    [BOOK_SPORT_MAGAZINE]: sportMagazine,
    [BOOK_NEWSPAPER]: newspaper,
    [BOOK_ROMANCE_NOVEL]: romanceNovel,
    [BOOK_USER_MANUAL]: userManual,
    [BOOK_BIOGRAPHY]: biography,
    [BOOK_HISTORICAL_NOVEL]: historicalNovel,
    [BOOK_CROSSWORD]: crossword,
    [BOOK_FINANCIAL_STATEMENT]: financialStatement,
    [BOOK_WORLD_ATLAS]: worldAtlas,
    [BOOK_STUDENT_BOOK]: studentBook,
    [BOOK_ENCYCLOPEDIA]: encyclopedia,
    [BOOK_SCIENCE_ARTICLE]: scienceArticle,
    [BOOK_MYSTERIOUS_BOOK]: mysteriousBook,
    [BOOK_SECRET_BOOK]: secretBook,
};

export function getBook(book) {
    const b = BOOK[book];
    if (b == null) {
        return BOOK[BOOK_FAIRY_TALE];
    }
    return b;
}