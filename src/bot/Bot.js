import React from 'react';
import {connect} from "react-redux";
import {isCode1} from "../util/repositoryHelper";
import {APP_ROUTE} from "../content/routes";
import {push} from 'connected-react-router'
import _ from 'lodash';
import {manageBooks} from "./BotBook";
import {logBot} from "./botHelper";
import {manageWisies} from "./BotWisie";
import {manageWar} from "./BotWar";

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

    get communication() {
        return this.props.communication;
    }

    async start() {
        await this.round();
    }

    async round() {
        logBot('START ROUND');
        await manageWar(this);
        await manageBooks(this);
        await manageWisies(this);
        logBot('END ROUND');
        setTimeout(() => {
            this.round();
        }, Math.random()* 60000);
    }

    rootRoute() {
        logBot('go route /');
        this.dispatch(push(APP_ROUTE));
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
