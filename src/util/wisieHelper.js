import ant from '../media/image/wisie/ant.svg';
import bee from '../media/image/wisie/bee.png';
import catBlue from '../media/image/wisie/catBlue.png';
import gorilla from '../media/image/wisie/gorilla.png';
import sheep from '../media/image/wisie/sheep.png';
import lion from '../media/image/wisie/lion.png';
import snake from '../media/image/wisie/snake.svg';
import eagle from '../media/image/wisie/eagle.png';
import horse from '../media/image/wisie/horse.png';
import raccoon from '../media/image/wisie/raccoon.svg';
import aurochs from '../media/image/wisie/aurochs.png';
import rabbit from '../media/image/wisie/rabbit.png';
import dragon from '../media/image/wisie/dragon.png';
import shark from '../media/image/wisie/shark.svg';
import wolf from '../media/image/wisie/wolf.png';
import elephant from '../media/image/wisie/elephant.png';
import turkey from '../media/image/wisie/turkey.png';
import parrot from '../media/image/wisie/parrot.png';
import catTeacher from '../media/image/wisie/catTeacher.png';
import fox from '../media/image/wisie/fox.png';
import bear from '../media/image/wisie/bear.svg';
import turtle from '../media/image/wisie/turtle.svg';
import kangaroo from '../media/image/wisie/kangaroo.png';
import tiger from '../media/image/wisie/tiger.png';
import catPresenter from '../media/image/wisie/catPresenter.png';
import bull from '../media/image/wisie/bull.svg';
import ostrich from '../media/image/wisie/ostrich.png';
import crocodile from '../media/image/wisie/crocodile.png';
import polarBear from '../media/image/wisie/polarBear.svg';
import dog from '../media/image/wisie/dog.png';
import bulldog from '../media/image/wisie/bulldog.svg';
import camel from '../media/image/wisie/camel.png';
import dogFat from '../media/image/wisie/dogFat.png';
import dragonBlue from '../media/image/wisie/dragonBlue.png';
import dragonFat from '../media/image/wisie/dragonFat.png';
import foxMan from '../media/image/wisie/foxMan.png';
import pandaEat from '../media/image/wisie/pandaEat.png';
import lampard from '../media/image/wisie/lampard.png';
import dragonRed from '../media/image/wisie/dragonRed.png';
import dogSweet from '../media/image/wisie/dogSweet.png';
import squirrel from '../media/image/wisie/squirrel.png';
import frog from '../media/image/wisie/frog.svg';
import owl from '../media/image/wisie/owl.png';
import penguin from '../media/image/wisie/penguin.svg';
import walrus from '../media/image/wisie/walrus.svg';
import octopus from '../media/image/wisie/octopus.png';
import stork from '../media/image/wisie/stork.svg';
import chick from '../media/image/wisie/chick.svg';
import elephantChild from '../media/image/wisie/elephantChild.svg';
import owlHappy from '../media/image/wisie/owlHappy.svg';
import alligator from '../media/image/wisie/alligator.png';
import giraffe from '../media/image/wisie/giraffe.png';
import koala from '../media/image/wisie/koala.svg';
import monkey from '../media/image/wisie/monkey.png';
import raccoonBrown from '../media/image/wisie/raccoonBrown.png';
import worm from '../media/image/wisie/worm.png';

const WISIE = {
    'ALLIGATOR': alligator,
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
    'CHICK': chick,
    'CROCODILE': crocodile,
    'DOG': dog,
    'DOG_FAT': dogFat,
    'DOG_SWEET': dogSweet,
    'DRAGON': dragon,
    'DRAGON_BLUE': dragonBlue,
    'DRAGON_FAT': dragonFat,
    'DRAGON_RED': dragonRed,
    'EAGLE': eagle,
    'ELEPHANT': elephant,
    'ELEPHANT_CHILD': elephantChild,
    'FOX': fox,
    'FOX_MAN': foxMan,
    'FROG': frog,
    'GIRAFFE': giraffe,
    'GORILLA': gorilla,
    'HORSE': horse,
    'KANGAROO': kangaroo,
    'KOALA': koala,
    'LAMPARD': lampard,
    'LION': lion,
    'MONKEY': monkey,
    'OCTOPUS': octopus,
    'OSTRICH': ostrich,
    'OWL': owl,
    'OWL_HAPPY': owlHappy,
    'PANDA_EAT': pandaEat,
    'PARROT': parrot,
    'PENGUIN': penguin,
    'POLAR_BEAR': polarBear,
    'RABBIT': rabbit,
    'RACCOON': raccoon,
    'RACCOON_BROWN': raccoonBrown,
    'SHARK': shark,
    'SHEEP': sheep,
    'SNAKE': snake,
    'STORK': stork,
    'SQUIRREL': squirrel,
    'TIGER': tiger,
    'TURKEY': turkey,
    'TURTLE': turtle,
    'WALRUS': walrus,
    'WORM': worm,
    'WOLF': wolf,
};

export const WISIE_TEAM_COUNT = 4;

export const WISIE_MAX_HOBBY_COUNT = 3;

export function getWisie(wisieType) {
    return WISIE[wisieType];
}

const MIN_WISIE_WIDTH = 100;
export const MAX_WISIE_WIDTH = 230;

const wisieWidthCache = {};

export function calculateWisieWidth(contentWidth) {
    const cacheValue = wisieWidthCache[contentWidth];
    if (cacheValue) {
        return cacheValue;
    }
    let minCount = Math.floor(contentWidth / MAX_WISIE_WIDTH);
    let maxCount = Math.floor(contentWidth / MIN_WISIE_WIDTH);
    if (minCount === maxCount) {
        return MAX_WISIE_WIDTH;
    }
    if (maxCount - minCount > 1) {
        return contentWidth / ((maxCount + minCount) / 2);
    }
    if (minCount === 1) {
        return contentWidth / maxCount;
    }
    if (minCount === 0) {
        return MIN_WISIE_WIDTH;
    }
    return contentWidth / minCount;
}