import _ from 'lodash';
import kitek from './../../media/image/kitek.svg';
import robo from './../../media/image/robo.svg';
import rumcia from './../../media/image/rumcia.svg';
import szeryf from './../../media/image/szeryf.svg';
import zarowa from './../../media/image/zarowa.svg';

export const HEROES = {
    'kitek': kitek,
    'robo': robo,
    'rumcia': rumcia,
    'szeryf': szeryf,
    'zarowa': zarowa,
};

export function randomHero() {
    const heroes = _.map(HEROES);
    return heroes[_.random(heroes.length - 1)];
}
