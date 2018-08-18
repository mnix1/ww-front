import chest from '../media/image/shop/chest.svg';

export const CHEST_HERO = 'HERO';

const CHEST = {
    [CHEST_HERO]: chest,
};

export function getChest(chest) {
    return CHEST[chest];
}