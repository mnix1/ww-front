import React from 'react';
import {connect} from "react-redux";
import {ConnectedRouter, push} from "connected-react-router";
import TopBar from "../top-bar/TopBar";
import {
    APP_ROUTE,
    BATTLE_FAST_ROUTE,
    BATTLE_RANKING_ROUTE,
    BATTLE_ROUTE,
    CAMPAIGN_ROUTE,
    CAMPAIGN_WAR_ROUTE,
    CHALLENGE_FRIEND_INIT_ROUTE,
    CHALLENGE_HISTORY_ROUTE,
    CHALLENGE_LIST_ROUTE,
    CHALLENGE_ROUTE,
    CHALLENGE_SUMMARY_ROUTE,
    CLASSIFICATION_BATTLE_ROUTE,
    CLASSIFICATION_WAR_ROUTE,
    FRIEND_ROUTE,
    LOGIN_ROUTE,
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
} from "../../content/routes";
import {repPending} from "../../util/repositoryHelper";
import {INTRO_STEP_GO_TO_PROFILE, INTRO_STEP_GO_TO_WISIES} from "../../content/intro/introHelper";
import MenuItem from "../menu/MenuItem";
import Menu from "../menu/Menu";
import {Loading} from "../loading/Loading";
import {Route, Switch} from "react-router";
import PlayPage from "../../content/play/PlayPage";
import FriendPage from "../../content/friend/FriendPage";
import ProfilePage from "../../content/profile/ProfilePage";
import WisiePage from "../../content/wisie/WisiePage";
import ShopPage from "../../content/shop/ShopPage";
import PlayWarPage from "../../content/play/PlayWarPage";
import PlayBattlePage from "../../content/play/PlayBattlePage";
import PlayChallengePage from "../../content/play/PlayChallengePage";
import RivalPage from "../../content/rival/war/page/RivalPage";
import RivalSearchOpponentPage from "../../content/rival/RivalSearchOpponentPage";
import PractisePage from "../../content/practise/PractisePage";
import CampaignPage from "../../content/campaign/CampaignPage";
import ChallengeFriendInit from "../../content/challenge/create/ChallengeFriendInit";
import ChallengeSummaryPage from "../../content/challenge/list/ChallengeSummaryPage";
import ChallengeListPage from "../../content/challenge/list/ChallengeListPage";
import ChallengeHistoryPage from "../../content/challenge/list/ChallengeHistoryPage";
import ClassificationPage from "../../content/rival/classification/ClassificationPage";
import SettingsPage from "../../content/settings/SettingsPage";
import LoginPage from "../auth/LoginPage";
import {RIVAL_STATUS_CLOSED, RIVAL_STATUS_IN_PROGRESS} from "../../util/rivalHelper";
import play from '../../media/image/menu/swordShield.svg';
import friend from '../../media/image/menu/friend.svg';
import shop from '../../media/image/menu/shop.png';
import wisie from '../../media/image/menu/robot.svg';
import owl from '../../media/image/menu/owl.svg';

class Page extends React.PureComponent {

    renderMenuItem(route, imgSrc, className) {
        const {screen, lang, onRouteChange} = this.props;
        const iconHeight = screen.wisieImgHeight + 10;
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
        const {history, testSignInRep, communication} = this.props;
        if (repPending(testSignInRep)) {
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

                <Route exact path={PLAY_WAR_ROUTE} render={() => <PlayWarPage/>}/>
                <Route exact path={PLAY_BATTLE_ROUTE} render={() => <PlayBattlePage/>}/>
                <Route exact path={PLAY_CHALLENGE_ROUTE} render={() => <PlayChallengePage/>}/>

                <Route exact path={WAR_ROUTE} render={() => <RivalPage communication={communication}/>}/>
                <Route exact path={WAR_FAST_ROUTE} render={() => <RivalSearchOpponentPage/>}/>
                <Route exact path={WAR_RANKING_ROUTE} render={() => <RivalSearchOpponentPage/>}/>

                <Route exact path={BATTLE_ROUTE} render={() => <RivalPage communication={communication}/>}/>
                <Route exact path={BATTLE_FAST_ROUTE} render={() => <RivalSearchOpponentPage/>}/>
                <Route exact path={BATTLE_RANKING_ROUTE} render={() => <RivalSearchOpponentPage/>}/>

                <Route exact path={CAMPAIGN_WAR_ROUTE} render={() => <RivalPage communication={communication}/>}/>
                <Route path={CAMPAIGN_ROUTE} render={() => <CampaignPage/>}/>

                <Route path={TRAINING_ROUTE} render={() => <PractisePage/>}/>

                <Route exact path={CHALLENGE_FRIEND_INIT_ROUTE} render={() => <ChallengeFriendInit/>}/>
                <Route exact path={CHALLENGE_ROUTE} render={() => <RivalPage communication={communication}/>}/>

                <Route exact path={CHALLENGE_SUMMARY_ROUTE} render={() => <ChallengeSummaryPage/>}/>
                <Route exact path={CHALLENGE_LIST_ROUTE} render={() => <ChallengeListPage/>}/>
                <Route exact path={CHALLENGE_HISTORY_ROUTE} render={() => <ChallengeHistoryPage/>}/>

                <Route exact path={CLASSIFICATION_WAR_ROUTE} render={() => <ClassificationPage/>}/>
                <Route exact path={CLASSIFICATION_BATTLE_ROUTE} render={() => <ClassificationPage/>}/>

                <Route path={SETTINGS_ROUTE} render={() => <SettingsPage/>}/>

                <Route path={LOGIN_ROUTE} render={() => <LoginPage/>}/>
            </Switch>
        </ConnectedRouter>;
    }

    render() {
        const {screen, rivalStatus} = this.props;
        const {height, width: screenWidth, contentWidth} = screen;
        const fullScreen = (rivalStatus === RIVAL_STATUS_IN_PROGRESS || rivalStatus === RIVAL_STATUS_CLOSED) && screen.isSmallHeight;
        const width = fullScreen
            ? screenWidth
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
        profile: state.profile.profile,
        lang: state.language.lang,
        rivalStatus: state.rival.status,
    }),
    (dispatch) => ({
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(Page);


