import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';
import Login from "./component/auth/Login";
import {Provider} from 'react-redux'
import app from './redux/app';
import {screenResized} from "./redux/reducer/screen";
import App from "./content/app/App";
import {getText, POLISH, TEXT_APP_NAME} from "./lang";
import {applyMiddleware, compose, createStore} from 'redux'
import {middleware as fetchMiddleware} from 'react-redux-fetch'
import {profileChanged} from "./redux/reducer/profile";
import {createBrowserHistory} from 'history'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {Route, Switch} from 'react-router' // react-router v4

const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(app), // new root reducer with router state
    compose(applyMiddleware(fetchMiddleware),
        applyMiddleware(routerMiddleware(history)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : a => a)
);

window.activeLang = POLISH;
document.title = getText(TEXT_APP_NAME);

const originalFetch = fetch;
fetch = function (url, opts) {
    console.log('fetch', url, opts);
    return originalFetch(url, {...opts, credentials: 'include'});
};

window.addEventListener('resize', () => {
    store.dispatch(screenResized());
});

fetch('/profile', {credentials: 'include'})
    .then(res => res.json())
    .then(json => {
        store.dispatch(profileChanged(json.profile));
        const tag = json.profile.tag;
        if (_.isNil(tag)) {
            return ReactDOM.render(<Login/>, document.getElementById('root'));
        }
        ReactDOM.render(<Provider store={store}>
                <App history={history}/>
        </Provider>, document.getElementById('root'));
    })
    .catch(e => {
        console.error(e);
        ReactDOM.render(<div>Error</div>, document.getElementById('root'));
    });


ReactDOM.render(<div>Loading</div>, document.getElementById('root'));
