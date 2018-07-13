import { combineReducers } from 'redux'
import socket from "./reducer/socket";
import content from "./reducer/content";
import screen from "./reducer/screen";

const app = combineReducers({
    socket,
    content,
    screen,
});

export default app;