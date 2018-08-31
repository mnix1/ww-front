import { combineReducers } from 'redux';
import {reducer as fetchReducer} from 'react-redux-fetch';
import profile from "./reducer/profile";
import rival from "./reducer/rival";
import battle from "./reducer/battle";
import war from "./reducer/war";
import challenge from "./reducer/challenge";
import friend from "./reducer/friend";
import socket from "./reducer/socket";
import practise from "./reducer/practise";
import shop from "./reducer/shop";
import screen from "./reducer/screen";
import hero from "./reducer/hero";

const app = combineReducers({
    profile,
    rival,
    battle,
    war,
    challenge,
    shop,
    friend,
    socket,
    hero,
    practise,
    screen,
    repository: fetchReducer
});

export default app;