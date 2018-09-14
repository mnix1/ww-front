import React from 'react';
import {connect} from "react-redux";
import {isCode1} from "../util/repositoryHelper";
import {APP_ROUTE} from "../content/routes";
import {push} from 'connected-react-router'
import _ from 'lodash';
import {manageBooks} from "./BotBook";
import {logBot} from "./botHelper";

class Bot extends React.Component {
    componentDidMount() {
        setTimeout(() => this.start(), 1000);
    }

    shouldComponentUpdate() {
        return false;
    }

    get dispatch() {
        return this.props.dispatch;
    }

    get redux() {
        return this.props.redux;
    }

    async start() {
        this.auth();
        manageBooks(this);
    }

    rootRoute() {
        logBot('go route /');
        this.dispatch(push(APP_ROUTE));
    }

    async auth() {
        if (!_.isNil(this.redux.profile.profile)) {
            logBot('auth', 'auth done');
            return Promise.resolve();
        }
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + Buffer.from(this.props.user + ":" + this.props.pass).toString('base64'));
        const result = await fetch('/bot/auth', {
            method: 'GET',
            headers: headers,
        }).then(response => response.json());
        if (isCode1(result)) {
            window.location.reload(true);
        } else {
            logBot('auth', 'auth failed');
        }
    }

    render() {
        return null;
    }
}

export default connect(
    (state) => ({
        redux: state,
    }),
    (dispatch) => ({
        dispatch,
    })
)(Bot);
