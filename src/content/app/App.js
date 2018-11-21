import React from 'react';
import './styles.css';
import './commonStyles.css';
import {connect} from 'react-redux';
import InvitedToBattleBy from "../rival/invite/InvitedToRivalBy";
import InviteToBattle from "../rival/invite/InviteToRival";
import WakeLock from "../../component/wake-lock/WakeLock";
import Option from "../../component/option/Option";
import Intro from "../intro/Intro";
import IntroUpdate from "../intro/IntroUpdate";
import Connecting from "./connection/Connecting";
import ConnectionProblem from "./connection/ConnectionProblem";
import Page from "./AppPages";
import ShowOption from "./ShowOption";
import AppFetch from "./AppFetch";
import AppRedirect from "./AppRedirect";
import bg4000x2000 from '../../media/image/background/bg4000x2000.jpg';
import bg2000x1000 from '../../media/image/background/bg2000x1000.jpg';

let pwaPrompt = undefined;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    pwaPrompt = e;
});

class App extends React.PureComponent {

    componentDidUpdate() {
        this.promptForPwa();
    }

    renderBackground() {
        const {screen} = this.props;
        let bg = bg2000x1000;
        if (screen.height > 1000 || screen.width > 2000) {
            bg = bg4000x2000;
        }
        return <img alt='' src={bg} height={screen.height} width={screen.width}
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

    promptForPwa() {
        const {signedIn, screen} = this.props;
        if (signedIn && screen.isMobile && pwaPrompt !== undefined) {
            pwaPrompt.prompt();
        }
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
            {/*<div className='absolute right0 bottom0 blackBackground'>{JSON.stringify(screen)}</div>*/}
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
