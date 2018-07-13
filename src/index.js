import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';
import Login from "./component/auth/Login";
import {Provider} from 'react-redux'
import app from './redux/app';
import {screenResized} from "./redux/reducer/screen";
import App from "./component/content/app/App";
import {APP_NAME, POLISH} from "./lang";
import {applyMiddleware, compose, createStore} from 'redux'
import {middleware as fetchMiddleware} from 'react-redux-fetch'

const store = createStore(
    app,
    compose(applyMiddleware(fetchMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

window.activeLang = POLISH;
document.title = APP_NAME[window.activeLang];

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
        const profileId = json.profileId;
        if (_.isNil(profileId)) {
            return ReactDOM.render(<Login/>, document.getElementById('root'));
        }
        ReactDOM.render(<Provider store={store}>
            <App/>
        </Provider>, document.getElementById('root'));
    })
    .catch(e => {
        console.error(e);
        ReactDOM.render(<div>Error</div>, document.getElementById('root'));
    });


ReactDOM.render(<div>Loading</div>, document.getElementById('root'));
