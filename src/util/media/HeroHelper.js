import _ from 'lodash';
import alpaca from '../../media/image/hero/alpaca.svg';
import ant from '../../media/image/hero/ant.svg';
import bee from '../../media/image/hero/bee.svg';
import kitek from '../../media/image/hero/kitek.svg';
import robo from '../../media/image/hero/robo.svg';
import rumcia from '../../media/image/hero/rumcia.svg';
import szeryf from '../../media/image/hero/szeryf.svg';
import zarowa from '../../media/image/hero/zarowa.svg';
import owl from '../../media/image/hero/owl.svg';
import panda from '../../media/image/hero/panda.svg';
import catBlue from '../../media/image/hero/catBlue.svg';
import octopus from '../../media/image/hero/octopus.svg';
import penguin from '../../media/image/hero/penguin.svg';
import duck from '../../media/image/hero/duck.svg';
import cow from '../../media/image/hero/cow.svg';
import gorilla from '../../media/image/hero/gorilla.svg';
import sheep from '../../media/image/hero/sheep.svg';
import lion from '../../media/image/hero/lion.svg';
import giraffe from '../../media/image/hero/giraffe.svg';
import snake from '../../media/image/hero/snake.svg';
import eagle from '../../media/image/hero/eagle.svg';
import horse from '../../media/image/hero/horse.svg';
import raccoon from '../../media/image/hero/raccoon.svg';
import aurochs from '../../media/image/hero/aurochs.svg';
import rabbit from '../../media/image/hero/rabbit.svg';
import dragon from '../../media/image/hero/dragon.svg';
import shark from '../../media/image/hero/shark.svg';
import wolf from '../../media/image/hero/wolf.svg';
import elephant from '../../media/image/hero/elephant.svg';
import turkey from '../../media/image/hero/turkey.svg';
import parrot from '../../media/image/hero/parrot.svg';
import catTeacher from '../../media/image/hero/catTeacher.svg';
import fox from '../../media/image/hero/fox.svg';
import bear from '../../media/image/hero/bear.svg';
import turtle from '../../media/image/hero/turtle.svg';
import kangaroo from '../../media/image/hero/kangaroo.svg';
import tiger from '../../media/image/hero/tiger.svg';
import catPresenter from '../../media/image/hero/catPresenter.svg';
import bull from '../../media/image/hero/bull.svg';
import ostrich from '../../media/image/hero/ostrich.svg';
import crocodile from '../../media/image/hero/crocodile.svg';
import polarBear from '../../media/image/hero/polarBear.svg';
import dog from '../../media/image/hero/dog.svg';
import bulldog from '../../media/image/hero/bulldog.svg';
import camel from '../../media/image/hero/camel.svg';
import dogFat from '../../media/image/hero/dogFat.svg';
import dragonBlue from '../../media/image/hero/dragonBlue.svg';
import dragonFat from '../../media/image/hero/dragonFat.svg';
import foxMan from '../../media/image/hero/foxMan.svg';
import pandaEat from '../../media/image/hero/pandaEat.svg';

export const HERO = {
    'ALPACA': alpaca,
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
    'COW': cow,
    'CROCODILE': crocodile,
    'DOG': dog,
    'DOG_FAT': dogFat,
    'DRAGON': dragon,
    'DRAGON_BLUE': dragonBlue,
    'DRAGON_FAT': dragonFat,
    'DUCK': duck,
    'EAGLE': eagle,
    'ELEPHANT': elephant,
    'FOX': fox,
    'FOX_MAN': foxMan,
    'GIRAFFE': giraffe,
    'GORILLA': gorilla,
    'HORSE': horse,
    'KANGAROO': kangaroo,
    // 'KITEK': kitek,
    'LION': lion,
    'OCTOPUS': octopus,
    'OSTRICH': ostrich,
    'OWL': owl,
    'PANDA': panda,
    'PANDA_EAT': pandaEat,
    'PARROT': parrot,
    'PENGUIN': penguin,
    'POLAR_BEAR': polarBear,
    'RABBIT': rabbit,
    'RACCOON': raccoon,
    'ROBO': robo,
    // 'RUMCIA': rumcia,
    'SHARK': shark,
    'SHEEP': sheep,
    'SNAKE': snake,
    // 'SZERYF': szeryf,
    'TIGER': tiger,
    'TURKEY': turkey,
    'TURTLE': turtle,
    'WOLF': wolf,
    // 'ZAROWA': zarowa,
};

export function randomHero() {
    const heroes = _.map(HERO);
    return heroes[_.random(heroes.length - 1)];
}

export function getHero(heroType) {
    return HERO[heroType];
}
