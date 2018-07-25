export const PROFILE_CHANGED = 'profile/changed';

const initialState = {
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PROFILE_CHANGED:
            return {...state, profile: action.profile};
        default:
            return state
    }
}

export function profileChanged(profile) {
    return {type: PROFILE_CHANGED, profile};
}

