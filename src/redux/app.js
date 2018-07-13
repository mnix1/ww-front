import { combineReducers } from 'redux';
import {reducer as fetchReducer} from 'react-redux-fetch';
import socket from "./reducer/socket";
import content from "./reducer/content";
import screen from "./reducer/screen";

const app = combineReducers({
    socket,
    content,
    screen,
    repository: fetchReducer
});

export default app;