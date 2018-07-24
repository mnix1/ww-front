import {CREAME_COLOR, DARK_BLUE_COLOR} from "../../util/style/constant";

export const OBJECT_APP_BATTLE = 'battle';
export const OBJECT_APP_TRAINING = 'training';
export const OBJECT_APP_HISTORY = 'history';
export const OBJECT_APP_FRIEND = 'friend';

export const OBJECTS_APP = [
    {
        id: OBJECT_APP_BATTLE,
        xTarget: 1 / 4,
        yTarget: 1 / 4,
        material: {background: 'rgb(235,242,235)', color: DARK_BLUE_COLOR},
    },
    {
        id: OBJECT_APP_HISTORY,
        xTarget: 3 / 4,
        yTarget: 1 / 4,
        material: {background: 'rgb(173, 51, 64)', color: CREAME_COLOR},
    },
    {
        id: OBJECT_APP_FRIEND,
        xTarget: 1 / 4,
        yTarget: 3 / 4,
        material: {background: 'rgb(245, 199, 101)', color: DARK_BLUE_COLOR},
    },
    {
        id: OBJECT_APP_TRAINING,
        xTarget: 3 / 4,
        yTarget: 3 / 4,
        material: {background: 'rgb(2, 126, 78)', color: CREAME_COLOR},
    }
];