import React from 'react';
import './styles.css';
import './commonStyles.css';
import './pageStyles.css';
import {connect} from 'react-redux';
import InvitedToBattleBy from "../rival/invite/InvitedToRivalBy";
import InviteToBattle from "../rival/invite/InviteToRival";
import background from '../../media/image/background/backgroundWithWisiesProd3.jpg';
import WakeLock from "../../component/wake-lock/WakeLock";
import Option from "../../component/option/Option";
import Intro from "../intro/Intro";
import IntroUpdate from "../intro/IntroUpdate";
import Connecting from "./connection/Connecting";
import ConnectionProblem from "./connection/ConnectionProblem";
import Page from "../../component/page/Page";
import ShowOption from "../../component/page/ShowOption";
import AppFetch from "./AppFetch";
import AppRedirect from "./AppRedirect";

class App extends React.PureComponent {

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
            <Option/>
            <InvitedToBattleBy/>
            <InviteToBattle/>
        </div>;
    }

    render() {
        // console.log('App render');
        const {enable, signedIn, history, screen} = this.props;
        return <div className='app'>
            {this.renderBackground()}
            {this.renderConnected()}
            <Page history={history}/>
            <Connecting/>
            <ConnectionProblem/>
            <AppFetch/>
            <AppRedirect/>
            {screen.isMobile && <WakeLock/>}
            {signedIn && enable && <div>
                <IntroUpdate/>
                <Intro/>
            </div>}
            {window.auto && React.createElement(window.auto, {
                ...window.prepareAuto()
            })}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        signedIn: state.profile.signedIn,
        socketOpen: state.socket.open,
        enable: state.intro.enable,
    }),
    (dispatch) => ({})
)(App);
