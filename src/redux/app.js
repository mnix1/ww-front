import { combineReducers } from 'redux';
import {reducer as fetchReducer} from 'react-redux-fetch';
import profile from "./reducer/profile";
import battle from "./reducer/battle";
import friend from "./reducer/friend";
import socket from "./reducer/socket";
import content from "./reducer/content";
import practise from "./reducer/practise";
import screen from "./reducer/screen";

const app = combineReducers({
    profile,
    battle,
    friend,
    socket,
    content,
    practise,
    screen,
    repository: fetchReducer
});

export default app;