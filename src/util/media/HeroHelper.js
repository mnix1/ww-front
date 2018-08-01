import _ from 'lodash';
import alpaka from '../../media/image/hero/alpaka.svg';
import ant from '../../media/image/hero/ant.svg';
import bee from '../../media/image/hero/bee.svg';
import kitek from '../../media/image/hero/kitek.svg';
import robo from '../../media/image/hero/robo.svg';
import rumcia from '../../media/image/hero/rumcia.svg';
import szeryf from '../../media/image/hero/szeryf.svg';
import zarowa from '../../media/image/hero/zarowa.svg';
import owl from '../../media/image/hero/owl.svg';
import panda from '../../media/image/hero/panda.svg';
import cat from '../../media/image/hero/cat.svg';
import osmiornica from '../../media/image/hero/osmiornica.svg';
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
import skunk from '../../media/image/hero/skunk.svg';
import zubr from '../../media/image/hero/zubr.svg';

export const HEROES = {
    'ALPAKA': alpaka,
    'ANT': ant,
    'BEE': bee,
    'CAT': cat,
    'COW': cow,
    'DUCK': duck,
    'EAGLE': eagle,
    'GIRAFFE': giraffe,
    'GORILLA': gorilla,
    'HORSE': horse,
    'KITEK': kitek,
    'LION': lion,
    'OSMIORNICA': osmiornica,
    'OWL': owl,
    'PANDA': panda,
    'PENGUIN': penguin,
    'ROBO': robo,
    'RUMCIA': rumcia,
    'SHEEP': sheep,
    'SKUNK': skunk,
    'SNAKE': snake,
    'SZERYF': szeryf,
    'ZAROWA': zarowa,
    'ZUBR': zubr,
};

export function randomHero() {
    const heroes = _.map(HEROES);
    return heroes[_.random(heroes.length - 1)];
}

export function getHero(avatar) {
    return HEROES[avatar];
}
