import {TILE_MATERIALS} from "./tileMaterialHelper";

export const TILE_APP_BATTLE = 'battle';
export const TILE_APP_TRAINING = 'training';
export const TILE_APP_HISTORY = 'history';
export const TILE_APP_FRIEND = 'friend';

export const TILES_APP = [
    {
        id: TILE_APP_BATTLE,
        xTarget: -1 / 4,
        yTarget: -1 / 4,
        material: TILE_MATERIALS[1],
        aFactor: 1,
    },
    {
        id: TILE_APP_HISTORY,
        xTarget: 1 / 4,
        yTarget: -1 / 4,
        material: TILE_MATERIALS[21],
        aFactor: .8,
    },
    {
        id: TILE_APP_FRIEND,
        xTarget: -1 / 4,
        yTarget: 1 / 4,
        material: TILE_MATERIALS[12],
        aFactor: .9,
    },
    {
        id: TILE_APP_TRAINING,
        xTarget: 1 / 4,
        yTarget: 1 / 4,
        material: TILE_MATERIALS[6],
        aFactor: 1.1,
    }
];