import colorfulMagazine from '../media/image/book/colorfulMagazine.svg';
import fairyTale from '../media/image/book/fairyTale.svg';
import sportMagazine from '../media/image/book/sportMagazine.svg';
import tvGuide from '../media/image/book/tvGuide.svg';
import newspaper from '../media/image/book/newspaper.svg';
import leaflet from '../media/image/book/leaflet.svg';
import romanceNovel from '../media/image/book/romanceNovel.svg';

export const BOOK_LEAFLET = 'LEAFLET';
export const BOOK_FAIRY_TALE = 'FAIRY_TALE';
export const BOOK_TV_GUIDE = 'TV_GUIDE';
export const BOOK_COLORFUL_MAGAZINE = 'COLORFUL_MAGAZINE';
export const BOOK_SPORT_MAGAZINE = 'SPORT_MAGAZINE';
export const BOOK_NEWSPAPER = 'NEWSPAPER';
export const BOOK_ROMANCE_NOVEL = 'ROMANCE_NOVEL';

const BOOK = {
    [BOOK_LEAFLET]: leaflet,
    [BOOK_FAIRY_TALE]: fairyTale,
    [BOOK_TV_GUIDE]: tvGuide,
    [BOOK_COLORFUL_MAGAZINE]: colorfulMagazine,
    [BOOK_SPORT_MAGAZINE]: sportMagazine,
    [BOOK_NEWSPAPER]: newspaper,
    [BOOK_ROMANCE_NOVEL]: romanceNovel,
};

export function getBook(book) {
    const b = BOOK[book];
    if (b == null) {
        return BOOK[BOOK_FAIRY_TALE];
    }
    return b;
}