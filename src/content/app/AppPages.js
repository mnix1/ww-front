import React from 'react';
import {connect} from "react-redux";
import {ConnectedRouter, push} from "connected-react-router";
import TopBar from "../../component/top-bar/TopBar";
import {
    APP_ROUTE,
    BATTLE_FAST_ROUTE,
    BATTLE_RANKING_ROUTE,
    BATTLE_ROUTE,
    CAMPAIGN_ROUTE,
    CAMPAIGN_WAR_ROUTE,
    CHALLENGE_ACTIVE_ROUTE,
    CHALLENGE_CREATE_ROUTE,
    CHALLENGE_FRIEND_INIT_ROUTE,
    CHALLENGE_GLOBAL_ROUTE,
    CHALLENGE_HISTORY_ROUTE,
    CHALLENGE_PRIVATE_ROUTE,
    CHALLENGE_ROUTE,
    CHALLENGE_SUMMARY_ROUTE,
    CLASSIFICATION_BATTLE_ROUTE,
    CLASSIFICATION_WAR_ROUTE,
    FRIEND_ROUTE,
    LOGIN_ROUTE, MAIL_ROUTE,
    PLAY_BATTLE_ROUTE,
    PLAY_CHALLENGE_ROUTE,
    PLAY_ROUTE,
    PLAY_WAR_ROUTE,
    PROFILE_ROUTE,
    SETTINGS_ROUTE,
    SHOP_ROUTE,
    TRAINING_ROUTE,
    WAR_FAST_ROUTE,
    WAR_RANKING_ROUTE,
    WAR_ROUTE,
    WISIES_ROUTE
} from "../routes";
import {isRepPending} from "../../util/repositoryHelper";
import {INTRO_STEP_GO_TO_PROFILE, INTRO_STEP_GO_TO_WISIES} from "../intro/introHelper";
import MenuItem from "../../component/menu/MenuItem";
import Menu from "../../component/menu/Menu";
import {Loading} from "../../component/loading/Loading";
import {Route, Switch} from "react-router";
import PlayPage from "../play/PlayPage";
import FriendPage from "../friend/FriendPage";
import ProfilePage from "../profile/ProfilePage";
import WisiePage from "../wisie/WisiePage";
import ShopPage from "../shop/ShopPage";
import PlayWarPage from "../play/PlayWarPage";
import PlayBattlePage from "../play/PlayBattlePage";
import PlayChallengePage from "../play/PlayChallengePage";
import RivalPage from "../rival/page/RivalPage";
import RivalSearchOpponentPage from "../rival/RivalSearchOpponentPage";
import PractisePage from "../practise/PractisePage";
import CampaignPage from "../campaign/CampaignPage";
import ChallengeFriendInit from "../challenge/create/ChallengeFriendInit";
import ChallengeSummaryPage from "../challenge/list/ChallengeSummaryPage";
import ChallengePrivatePage from "../challenge/list/ChallengePrivatePage";
import ChallengeHistoryPage from "../challenge/list/ChallengeHistoryPage";
import ClassificationPage from "../rival/classification/ClassificationPage";
import SettingsPage from "../settings/SettingsPage";
import LoginPage from "../../component/auth/LoginPage";
import play from '../../media/image/menu/swordShield.svg';
import friend from '../../media/image/menu/friend.svg';
import shop from '../../media/image/menu/shop.png';
import wisie from '../../media/image/menu/robot.svg';
import owl from '../../media/image/menu/owl.svg';
import {isFullScreen, menuItemHeight} from "../../util/screenHelper";
import ChallengeGlobalPage from "../challenge/list/ChallengeGlobalPage";
import ChallengeCreatePage from "../challenge/list/ChallengeCreatePage";
import ChallengeActivePage from "../challenge/list/ChallengeActivePage";
import MailPage from "../mail/MailPage";

class AppPages extends React.PureComponent {

    renderMenuItem(route, imgSrc, className) {
        const {screen, lang, onRouteChange} = this.props;
        const iconHeight = menuItemHeight(screen);
        return <MenuItem className={className} onClick={onRouteChange} lang={lang} imgSrc={imgSrc}
                         iconHeight={iconHeight} route={route}/>
    }

    renderMenu() {
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(PLAY_ROUTE, play)}
                    {this.renderMenuItem(FRIEND_ROUTE, friend)}
                    {this.renderMenuItem(PROFILE_ROUTE, wisie, INTRO_STEP_GO_TO_PROFILE)}
                </div>
            </Menu>
            <Menu className='menuRight'>
                <div className='menuItems'>
                    {this.renderMenuItem(WISIES_ROUTE, owl, INTRO_STEP_GO_TO_WISIES)}
                    {this.renderMenuItem(SHOP_ROUTE, shop)}
                </div>
            </Menu>
        </div>;
    }

    renderContent() {
        const {history, testSignInRep} = this.props;
        if (isRepPending(testSignInRep)) {
            return <Loading/>;
        }
        return <ConnectedRouter history={history}>
            <Switch>
                <Route exact path={APP_ROUTE} render={() => this.renderMenu()}/>
                <Route exact path={PLAY_ROUTE} render={() => <PlayPage/>}/>
                <Route exact path={FRIEND_ROUTE} render={() => <FriendPage/>}/>
                <Route exact path={PROFILE_ROUTE} render={() => <ProfilePage/>}/>
                <Route path={WISIES_ROUTE} render={() => <WisiePage/>}/>
                <Route exact path={SHOP_ROUTE} render={() => <ShopPage/>}/>

                <Route exact path={MAIL_ROUTE} render={() => <MailPage/>}/>

                <Route exact path={PLAY_WAR_ROUTE} render={() => <PlayWarPage/>}/>
                <Route exact path={PLAY_BATTLE_ROUTE} render={() => <PlayBattlePage/>}/>
                <Route exact path={PLAY_CHALLENGE_ROUTE} render={() => <PlayChallengePage/>}/>

                <Route exact path={WAR_ROUTE} render={() => <RivalPage/>}/>
                <Route exact path={WAR_FAST_ROUTE} render={() => <RivalSearchOpponentPage/>}/>
                <Route exact path={WAR_RANKING_ROUTE} render={() => <RivalSearchOpponentPage/>}/>

                <Route exact path={BATTLE_ROUTE} render={() => <RivalPage/>}/>
                <Route exact path={BATTLE_FAST_ROUTE} render={() => <RivalSearchOpponentPage/>}/>
                <Route exact path={BATTLE_RANKING_ROUTE} render={() => <RivalSearchOpponentPage/>}/>

                <Route exact path={CAMPAIGN_WAR_ROUTE} render={() => <RivalPage/>}/>
                <Route path={CAMPAIGN_ROUTE} render={() => <CampaignPage/>}/>

                <Route path={TRAINING_ROUTE} render={() => <PractisePage/>}/>

                <Route exact path={CHALLENGE_FRIEND_INIT_ROUTE} render={() => <ChallengeFriendInit/>}/>
                <Route exact path={CHALLENGE_ROUTE} render={() => <RivalPage/>}/>

                <Route exact path={CHALLENGE_CREATE_ROUTE} render={() => <ChallengeCreatePage/>}/>
                <Route exact path={CHALLENGE_GLOBAL_ROUTE} render={() => <ChallengeGlobalPage/>}/>
                <Route exact path={CHALLENGE_PRIVATE_ROUTE} render={() => <ChallengePrivatePage/>}/>
                <Route exact path={CHALLENGE_SUMMARY_ROUTE} render={() => <ChallengeSummaryPage/>}/>
                <Route exact path={CHALLENGE_ACTIVE_ROUTE} render={() => <ChallengeActivePage/>}/>
                <Route exact path={CHALLENGE_HISTORY_ROUTE} render={() => <ChallengeHistoryPage/>}/>

                <Route exact path={CLASSIFICATION_WAR_ROUTE} render={() => <ClassificationPage/>}/>
                <Route exact path={CLASSIFICATION_BATTLE_ROUTE} render={() => <ClassificationPage/>}/>

                <Route path={SETTINGS_ROUTE} render={() => <SettingsPage/>}/>

                <Route path={LOGIN_ROUTE} render={() => <LoginPage/>}/>
            </Switch>
        </ConnectedRouter>;
    }

    render() {
        // console.log('AppPages render');
        const {screen, rivalStatus} = this.props;
        const {height, width: fullWidth, contentWidth} = screen;
        const fullScreen = isFullScreen(rivalStatus, screen);
        const width = fullScreen
            ? fullWidth
            : contentWidth;
        return <div style={{height, width}} className='content'>
            {!fullScreen && <TopBar/>}
            {this.renderContent()}
        </div>
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        screen: state.screen,
        lang: state.language.lang,
        rivalStatus: state.rival.status,
    }),
    (dispatch) => ({
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(AppPages);


