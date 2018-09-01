import { combineReducers } from 'redux';
import {reducer as fetchReducer} from 'react-redux-fetch';
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
import settings from "./reducer/settings";

const app = combineReducers({
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
    repository: fetchReducer
});

export default app;