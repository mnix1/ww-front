import {combineReducers} from 'redux';
import {container, reducer as fetchReducer} from 'react-redux-fetch';
import profile from "./reducer/profile";
import rival from "./reducer/rival";
import challenge from "./reducer/challenge";
import friend from "./reducer/friend";
import socket from "./reducer/socket";
import practise from "./reducer/practise";
import shop from "./reducer/shop";
import screen from "./reducer/screen";
import wisie from "./reducer/wisie";
import option from "./reducer/option";
import campaign from "./reducer/campaign";
import settings from "./reducer/settings";
import language from "./reducer/language";
import intro from "./reducer/intro";
import mail from "./reducer/mail";
import login from "./reducer/login";
import {connectRouter} from 'connected-react-router';
import {csrf} from "../util/fetchHelper";

const csrfSecurity = csrf();
if (csrfSecurity.token) {
    container.registerRequestHeader(csrfSecurity.header, csrfSecurity.token);
}
const app = (history) => combineReducers({
    router: connectRouter(history),
    login,
    intro,
    language,
    profile,
    rival,
    challenge,
    shop,
    friend,
    socket,
    wisie,
    practise,
    screen,
    option,
    settings,
    campaign,
    mail,
    repository: fetchReducer
});

export default app;