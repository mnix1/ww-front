import {OBJECT_MATERIALS} from "../../component/object-group/objectMaterialHelper";

export const OBJECT_APP_CHALLENGE = 'challenge';
export const OBJECT_APP_TRAINING = 'training';
export const OBJECT_APP_HISTORY = 'history';
export const OBJECT_APP_FRIEND = 'friend';

export const OBJECTS_APP = [
    {
        id: OBJECT_APP_CHALLENGE,
        xTarget: 1 / 4,
        yTarget: 1 / 4,
        material: OBJECT_MATERIALS[1],
    },
    {
        id: OBJECT_APP_HISTORY,
        xTarget: 3 / 4,
        yTarget: 1 / 4,
        material: OBJECT_MATERIALS[21],
    },
    {
        id: OBJECT_APP_FRIEND,
        xTarget: 1 / 4,
        yTarget: 3 / 4,
        material: OBJECT_MATERIALS[12],
    },
    {
        id: OBJECT_APP_TRAINING,
        xTarget: 3 / 4,
        yTarget: 3 / 4,
        material: OBJECT_MATERIALS[6],
    }
];
