import React from 'react';
import './styles.css';
import './commonStyles.css';
import './pageStyles.css';
import {connect} from 'react-redux';
import CommunicationWebSocket from "./CommunicationWebSocket";
import {push} from 'connected-react-router'
import {LOGIN_ROUTE} from "../routes";
import RivalCommunication from "../rival/RivalCommunication";
import {
    RIVAL_STATUS_CLOSED,
    RIVAL_STATUS_IN_PROGRESS,
    RIVAL_TYPE_ROUTE,
    ROUTE_RIVAL_TYPE
} from "../../util/rivalHelper";
import _ from 'lodash';
import {socketChanged} from "../../redux/reducer/socket";
import {isRepFulfilled, isRepRejected} from "../../util/repositoryHelper";
import {statusChanged} from "../../redux/reducer/rival";

class AppRedirect extends React.PureComponent {

    componentDidMount() {
        if (this.maybeRedirectToLogin()) {
            return;
        }
        this.maybeInitSocket();
    }

    componentDidUpdate(prevProps) {
        if (this.maybeRedirectToLogin()) {
            return;
        }
        this.maybeInitSocket();
        const {path, rivalStatus, rivalType, onRouteChange, onRivalStatusClear, signedIn} = this.props;
        if (_.isNil(rivalStatus) || !signedIn) {
            return;
        }
        const routeFromRivalType = RIVAL_TYPE_ROUTE[rivalType];
        if (rivalStatus === RIVAL_STATUS_IN_PROGRESS && path !== routeFromRivalType) {
            onRouteChange(routeFromRivalType);
        }
        if (rivalStatus === RIVAL_STATUS_CLOSED && path !== prevProps.path && ROUTE_RIVAL_TYPE[prevProps.path]) {
            onRivalStatusClear();
        }
    }

    maybeInitSocket() {
        const {onInit, socket, profileRep} = this.props;
        if (_.isNil(socket) && isRepFulfilled(profileRep)) {
            const socket = new CommunicationWebSocket();
            const rivalCommunication = new RivalCommunication(socket, this);
            onInit(socket, rivalCommunication);
        }
    }

    maybeRedirectToLogin() {
        const {onRouteChange, path, testSignInRep} = this.props;
        if (path !== LOGIN_ROUTE && isRepRejected(testSignInRep)) {
            onRouteChange(LOGIN_ROUTE);
            return true;
        }
        return false;
    }

    render() {
        // console.log('AppRedirect render');
        return null;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        signedIn: state.profile.signedIn,
        socket: state.socket.socket,
        rivalStatus: state.rival.status,
        rivalType: state.rival.rivalType,

        testSignInRep: state.repository.testSignIn,
        profileRep: state.repository.profile,
    }),
    (dispatch) => ({
        onRouteChange: (e) => {
            dispatch(push(e));
        },
        onRivalStatusClear: () => {
            dispatch(statusChanged(undefined));
        },
        onInit: (socket, rivalCommunication) => {
            socket.setDispatch(dispatch);
            dispatch(socketChanged(socket, rivalCommunication));
        },
    })
)(AppRedirect);
