export const SOCKET_CHANGED = 'socket/socket/changed';
export const OPEN_CHANGED = 'socket/open/changed';

const initialState = {
    socket: undefined,
    open: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SOCKET_CHANGED:
            return {...state, socket: action.socket};
        case OPEN_CHANGED:
            return {...state, open: action.open};
        default:
            return state
    }
}

export const socketChanged = (socket) => {
    return {type: SOCKET_CHANGED, socket}
};

export const openChanged = (open) => {
    return {type: OPEN_CHANGED, open}
};
