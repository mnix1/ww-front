export const CHOSEN_WISOR_CHANGED = 'settings/chosen-wisor/changed';
export const CHOSEN_NICK_CHANGED = 'settings/chosen-nick/changed';
export const CHOSEN_NICK_ACCEPT_CHANGED = 'settings/chosen-nick-accept/changed';

const initialState = {
    chosenWisor: undefined,
    chosenNick: undefined,
    chosenNickAccept: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHOSEN_WISOR_CHANGED:
            return {...state, chosenWisor: action.chosenWisor};
        case CHOSEN_NICK_CHANGED:
            return {...state, chosenNick: action.chosenNick};
        case CHOSEN_NICK_ACCEPT_CHANGED:
            return {...state, chosenNickAccept: action.chosenNickAccept};
        default:
            return state
    }
}

export const chosenWisorChanged = (chosenWisor) => {
    return {type: CHOSEN_WISOR_CHANGED, chosenWisor}
};

export const chosenNickChanged = (chosenNick) => {
    return {type: CHOSEN_NICK_CHANGED, chosenNick}
};

export const chosenNickAcceptChanged = (chosenNickAccept) => {
    return {type: CHOSEN_NICK_ACCEPT_CHANGED, chosenNickAccept}
};
