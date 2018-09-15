import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import app from './redux/app';
import {screenResized} from "./redux/reducer/screen";
import App from "./content/app/App";
import {getText, TEXT_APP_NAME} from "./lang/langText";
import {applyMiddleware, compose, createStore} from 'redux'
import {middleware as fetchMiddleware} from 'react-redux-fetch'
import {createBrowserHistory} from 'history'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import './util/rdHelper';

const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(app), // new root reducer with router state
    compose(applyMiddleware(fetchMiddleware),
        applyMiddleware(routerMiddleware(history)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : a => a)
);
document.title = getText(TEXT_APP_NAME);

window.addEventListener('resize', () => {
    store.dispatch(screenResized());
});

export function getActiveLang() {
    return store.getState().language.lang;
}

ReactDOM.render(<Provider store={store}>
    <App history={history}/>
</Provider>, document.getElementById('root'));
