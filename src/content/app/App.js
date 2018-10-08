import React from 'react';
import './styles.css';
import './commonStyles.css';
import './pageStyles.css';
import {connect} from 'react-redux';
import FriendListFetch from "../friend/fetch/FriendListFetch";
import CommunicationWebSocket from "./CommunicationWebSocket";
import InvitedToBattleBy from "../rival/invite/InvitedToRivalBy";
import InviteToBattle from "../rival/invite/InviteToRival";
import background from '../../media/image/background/backgroundWithWisiesProd3.jpg';
import {push} from 'connected-react-router'
import {LOGIN_ROUTE} from "../routes";
import ChallengeFetchContainer from "../challenge/fetch/ChallengeFetchContainer";
import ShopFetchContainer from "../shop/fetch/ShopFetchContainer";
import ProfileFetchContainer from "../profile/fetch/ProfileFetchContainer";
import ProfileFetch from "./ProfileFetch";
import WisieFetchContainer from "../wisie/fetch/WisieFetchContainer";
import WakeLock from "../../component/wake-lock/WakeLock";
import RivalCommunication from "../rival/RivalCommunication";
import RivalFetchContainer from "../rival/fetch/RivalFetchContainer";
import {
    RIVAL_STATUS_CLOSED,
    RIVAL_STATUS_IN_PROGRESS,
    RIVAL_TYPE_ROUTE,
    ROUTE_RIVAL_TYPE
} from "../../util/rivalHelper";
import Option from "../../component/option/Option";
import SettingsFetchContainer from "../settings/fetch/SettingsFetchContainer";
import CampaignFetchContainer from "../campaign/fetch/CampaignFetchContainer";
import _ from 'lodash';
import {socketChanged} from "../../redux/reducer/socket";
import {isRepFulfilled, isRepRejected} from "../../util/repositoryHelper";
import Intro from "../intro/Intro";
import IntroUpdate from "../intro/IntroUpdate";
import TestSignInFetch from "./TestSignInFetch";
import Connecting from "./connection/Connecting";
import ConnectionProblem from "./connection/ConnectionProblem";
import Page from "../../component/page/Page";
import ShowOption from "../../component/page/ShowOption";
import {statusChanged} from "../../redux/reducer/rival";

class App extends React.PureComponent {

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

    componentWillUnmount() {
        this.rivalCommunication.dispose();
    }

    maybeInitSocket() {
        const {onInit, socket, profileRep} = this.props;
        if (_.isNil(socket) && isRepFulfilled(profileRep)) {
            const socket = new CommunicationWebSocket(onInit);
            this.rivalCommunication = new RivalCommunication(socket, this);
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

    renderFetch() {
        const {friendListRep, path, signedIn, socket} = this.props;
        return <div>
            {signedIn && socket && <div>
                <FriendListFetch path={path} friendListRep={friendListRep}/>
                <SettingsFetchContainer/>
                <CampaignFetchContainer/>
                <RivalFetchContainer/>
                <ChallengeFetchContainer/>
                <WisieFetchContainer/>
                <ShopFetchContainer/>
                <ProfileFetchContainer/>
            </div>}
            {signedIn && <ProfileFetch path={path}/>}
            {!signedIn && <TestSignInFetch path={path}/>}
        </div>
    }

    renderBackground() {
        const {screen} = this.props;
        return <img alt='' src={background} height={screen.height} width={screen.width}
                    className="fixedBackgroundMix"/>;
    }

    renderConnected() {
        const {signedIn, socketOpen} = this.props;
        if (!signedIn || !socketOpen) {
            return null;
        }
        return <div>
            <ShowOption/>
            <Option communication={this.rivalCommunication}/>
            <InvitedToBattleBy/>
            <InviteToBattle/>
        </div>;
    }

    render() {
        console.log('App render');
        const {enable, signedIn, history} = this.props;
        return <div className='app'>
            {this.renderBackground()}
            {this.renderConnected()}
            <Page communication={this.rivalCommunication} history={history}/>
            <Connecting/>
            <ConnectionProblem/>
            {this.renderFetch()}
            <WakeLock/>
            {signedIn && enable && <div>
                <IntroUpdate/>
                <Intro/>
            </div>}
            {window.auto && React.createElement(window.auto, {
                communication: this.rivalCommunication,
                ...window.prepareAuto()
            })}
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        screen: state.screen,
        signedIn: state.profile.signedIn,
        socket: state.socket.socket,
        socketOpen: state.socket.open,
        enable: state.intro.enable,
        rivalStatus: state.rival.status,
        rivalType: state.rival.rivalType,

        friendListRep: state.repository.friendList,
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
        onInit: (socket) => {
            socket.setDispatch(dispatch);
            dispatch(socketChanged(socket));
        },
    })
)(App);
