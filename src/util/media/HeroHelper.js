import _ from 'lodash';
import kitek from '../../media/image/heroes/kitek.svg';
import robo from '../../media/image/heroes/robo.svg';
import rumcia from '../../media/image/heroes/rumcia.svg';
import szeryf from '../../media/image/heroes/szeryf.svg';
import zarowa from '../../media/image/heroes/zarowa.svg';

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
