import _ from 'lodash';
import chest from '../media/image/shop/chest.svg';
import questionMark from '../media/image/category/questionMark.svg';

export const CHEST_HERO = 'HERO';

const CHEST = {
    [CHEST_HERO]: chest,
};

export function getChest(chest) {
    return CHEST[chest];
}