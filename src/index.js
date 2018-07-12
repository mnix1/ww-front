import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';
import Login from "./component/auth/Login";
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import app from './redux/app';
import {screenResized} from "./redux/reducer/screen";
import App from "./component/app/App";

const store = createStore(app);

window.addEventListener('resize', () => {
    store.dispatch(screenResized());
});

// window.addEventListener('orientationchange', () => {
//     store.dispatch(screenResized(window.outerHeight, window.outerWidth));
// });

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
