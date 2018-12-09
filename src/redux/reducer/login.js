export const USERNAME_CHANGED = 'login/login/changed';
export const PASSWORD_CHANGED = 'login/password/changed';
export const EMAIL_CHANGED = 'login/email/changed';
export const MESSAGE_CHANGED = 'login/message/changed';
export const CLEARED = 'login/cleared';
export const LOADING_CHANGED = 'login/loading/changed';

const initialState = {
    username: '',
    password: '',
    email: '',
    message: undefined,
    loading: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case USERNAME_CHANGED:
            return {...state, username: action.username};
        case PASSWORD_CHANGED:
            return {...state, password: action.password};
        case EMAIL_CHANGED:
            return {...state, email: action.email};
        case MESSAGE_CHANGED:
            return {...state, message: action.message};
        case CLEARED:
            return {...state, ...initialState};
        case LOADING_CHANGED:
            return {...state, loading: action.loading};
        default:
            return state
    }
}

export const usernameChanged = (username) => {
    return {type: USERNAME_CHANGED, username}
};

export const passwordChanged = (password) => {
    return {type: PASSWORD_CHANGED, password}
};

export const emailChanged = (email) => {
    return {type: EMAIL_CHANGED, email}
};

export const messageChanged = (id, type) => {
    return {type: MESSAGE_CHANGED, message: {id, type}}
};

export const loadingChanged = (loading) => {
    return {type: LOADING_CHANGED, loading}
};

export const cleared = () => {
    return {type: CLEARED}
};
