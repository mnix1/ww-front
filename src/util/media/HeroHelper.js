import _ from 'lodash';
import kitek from '../../media/image/hero/kitek.svg';
import robo from '../../media/image/hero/robo.svg';
import rumcia from '../../media/image/hero/rumcia.svg';
import szeryf from '../../media/image/hero/szeryf.svg';
import zarowa from '../../media/image/hero/zarowa.svg';
import owl from '../../media/image/hero/owl.svg';
import panda from '../../media/image/hero/panda.svg';

export const HEROES = {
    'kitek': kitek,
    'robo': robo,
    'rumcia': rumcia,
    'szeryf': szeryf,
    // 'zarowa': zarowa,
    'owl': owl,
    'panda': panda,
};

export function randomHero() {
    const heroes = _.map(HEROES);
    return heroes[_.random(heroes.length - 1)];
}
