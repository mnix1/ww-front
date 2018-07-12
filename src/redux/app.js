import { combineReducers } from 'redux'
import socket from "./reducer/socket";
import screen from "./reducer/screen";

const app = combineReducers({
    socket,
    screen,
});

export default app;