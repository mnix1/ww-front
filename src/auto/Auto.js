import React from 'react';
import {connect} from "react-redux";
import {APP_ROUTE} from "../content/routes";
import {push} from 'connected-react-router'
import {manageBooks} from "./AutoBook";
import {logAuto} from "./autoHelper";
import {manageWisies} from "./AutoWisie";
import {manageWar} from "./AutoWar";

class Auto extends React.Component {
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
        return this.props.redux.socket.rivalCommunication;
    }

    async start() {
        await this.round();
    }

    async round() {
        logAuto('START ROUND');
        await manageWar(this);
        await manageBooks(this);
        await manageWisies(this);
        logAuto('END ROUND');
        setTimeout(() => {
            this.round();
        }, Math.random()* 60000);
    }

    rootRoute() {
        logAuto('go route /');
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
)(Auto);
