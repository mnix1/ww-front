import _ from 'lodash';
import ant from '../media/image/hero/ant.svg';
import bee from '../media/image/hero/bee.png';
import catBlue from '../media/image/hero/catBlue.png';
import octopus from '../media/image/hero/octopus.svg';
import gorilla from '../media/image/hero/gorilla.png';
import sheep from '../media/image/hero/sheep.png';
import lion from '../media/image/hero/lion.png';
import snake from '../media/image/hero/snake.svg';
import eagle from '../media/image/hero/eagle.png';
import horse from '../media/image/hero/horse.png';
import raccoon from '../media/image/hero/raccoon.svg';
import aurochs from '../media/image/hero/aurochs.png';
import rabbit from '../media/image/hero/rabbit.png';
import dragon from '../media/image/hero/dragon.png';
import shark from '../media/image/hero/shark.svg';
import wolf from '../media/image/hero/wolf.png';
import elephant from '../media/image/hero/elephant.png';
import turkey from '../media/image/hero/turkey.png';
import parrot from '../media/image/hero/parrot.png';
import catTeacher from '../media/image/hero/catTeacher.png';
import fox from '../media/image/hero/fox.png';
import bear from '../media/image/hero/bear.svg';
import turtle from '../media/image/hero/turtle.svg';
import kangaroo from '../media/image/hero/kangaroo.png';
import tiger from '../media/image/hero/tiger.png';
import catPresenter from '../media/image/hero/catPresenter.png';
import bull from '../media/image/hero/bull.svg';
import ostrich from '../media/image/hero/ostrich.png';
import crocodile from '../media/image/hero/crocodile.png';
import polarBear from '../media/image/hero/polarBear.svg';
import dog from '../media/image/hero/dog.png';
import bulldog from '../media/image/hero/bulldog.svg';
import camel from '../media/image/hero/camel.png';
import dogFat from '../media/image/hero/dogFat.png';
import dragonBlue from '../media/image/hero/dragonBlue.png';
import dragonFat from '../media/image/hero/dragonFat.png';
import foxMan from '../media/image/hero/foxMan.png';
import pandaEat from '../media/image/hero/pandaEat.png';

export const HERO = {
    'ANT': ant,
    'AUROCHS': aurochs,
    'BEE': bee,
    'BEAR': bear,
    'BULL': bull,
    'BULLDOG': bulldog,
    'CAMEL': camel,
    'CAT_BLUE': catBlue,
    'CAT_PRESENTER': catPresenter,
    'CAT_TEACHER': catTeacher,
    'CROCODILE': crocodile,
    'DOG': dog,
    'DOG_FAT': dogFat,
    'DRAGON': dragon,
    'DRAGON_BLUE': dragonBlue,
    'DRAGON_FAT': dragonFat,
    'EAGLE': eagle,
    'ELEPHANT': elephant,
    'FOX': fox,
    'FOX_MAN': foxMan,
    'GORILLA': gorilla,
    'HORSE': horse,
    'KANGAROO': kangaroo,
    'LION': lion,
    'OCTOPUS': octopus,
    'OSTRICH': ostrich,
    'PANDA_EAT': pandaEat,
    'PARROT': parrot,
    'POLAR_BEAR': polarBear,
    'RABBIT': rabbit,
    'RACCOON': raccoon,
    'SHARK': shark,
    'SHEEP': sheep,
    'SNAKE': snake,
    'TIGER': tiger,
    'TURKEY': turkey,
    'TURTLE': turtle,
    'WOLF': wolf,
};

export const HERO_TEAM_COUNT = 4;

export function randomHero() {
    const heroes = _.map(HERO);
    return heroes[_.random(heroes.length - 1)];
}

export function getHero(heroType) {
    return HERO[heroType];
}

const MIN_HERO_WIDTH = 150;
export const MAX_HERO_WIDTH = 230;

const heroWidthCache = {};

export function calculateHeroWidth(contentWidth) {
    const cacheValue = heroWidthCache[contentWidth];
    if (cacheValue) {
        return cacheValue;
    }
    let minCount = Math.floor(contentWidth / MAX_HERO_WIDTH);
    let maxCount = Math.floor(contentWidth / MIN_HERO_WIDTH);
    if (minCount === maxCount) {
        return MAX_HERO_WIDTH;
    }
    if (maxCount - minCount > 1) {
        return contentWidth / ((maxCount + minCount) / 2);
    }
    if (minCount === 1) {
        return contentWidth / maxCount;
    }
    if (minCount === 0) {
        return MIN_HERO_WIDTH;
    }
    return contentWidth / minCount;
}