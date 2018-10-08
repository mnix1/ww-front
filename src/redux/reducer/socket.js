export const SOCKET_CHANGED = 'socket/socket/changed';
export const OPEN_CHANGED = 'socket/open/changed';

const initialState = {
    rivalCommunication: undefined,
    socket: undefined,
    open: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SOCKET_CHANGED:
            return {...state, socket: action.socket, rivalCommunication: action.rivalCommunication};
        case OPEN_CHANGED:
            return {...state, open: action.open};
        default:
            return state
    }
}

export const socketChanged = (socket, rivalCommunication) => {
    return {type: SOCKET_CHANGED, socket, rivalCommunication}
};

export const openChanged = (open) => {
    return {type: OPEN_CHANGED, open}
};
