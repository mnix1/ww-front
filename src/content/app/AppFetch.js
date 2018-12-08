import React from 'react';
import './styles.css';
import './commonStyles.css';
import '../../component/page/styles.css';
import {connect} from 'react-redux';
import FriendListFetch from "../friend/fetch/FriendListFetch";
import ChallengeFetchContainer from "../challenge/fetch/ChallengeFetchContainer";
import ProfileFetch from "./fetch/ProfileFetch";
import RivalFetchContainer from "../rival/fetch/RivalFetchContainer";
import TestSignInFetch from "./fetch/TestSignInFetch";
import MailListFetch from "../mail/fetch/MailListFetch";
import WisieFetchContainer from "../wisie/fetch/WisieFetchContainer";
import CampaignFetchContainer from "../campaign/fetch/CampaignFetchContainer";
import {LOGIN_ROUTE} from "../routes";

class AppFetch extends React.PureComponent {

    render() {
        // console.log('AppFetch render');
        const {friendListRep, path, signedIn, socket} = this.props;
        return <div>
            {signedIn && socket && <div>
                <FriendListFetch path={path} friendListRep={friendListRep}/>
                <RivalFetchContainer/>
                <ChallengeFetchContainer/>
                <CampaignFetchContainer/>
                <MailListFetch path={path}/>
                <WisieFetchContainer/>
            </div>}
            {signedIn && <ProfileFetch path={path}/>}
            {!signedIn && path !== LOGIN_ROUTE && <TestSignInFetch path={path}/>}
        </div>
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        signedIn: state.profile.signedIn,
        socket: state.socket.socket,
        friendListRep: state.repository.friendList,
    }),
    (dispatch) => ({})
)(AppFetch);
