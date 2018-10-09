import React from 'react';
import './styles.css';
import './commonStyles.css';
import '../../component/page/styles.css';
import {connect} from 'react-redux';
import FriendListFetch from "../friend/fetch/FriendListFetch";
import ChallengeFetchContainer from "../challenge/fetch/ChallengeFetchContainer";
import ShopFetchContainer from "../shop/fetch/ShopFetchContainer";
import ProfileFetchContainer from "../profile/fetch/ProfileFetchContainer";
import ProfileFetch from "./fetch/ProfileFetch";
import WisieFetchContainer from "../wisie/fetch/WisieFetchContainer";
import RivalFetchContainer from "../rival/fetch/RivalFetchContainer";
import SettingsFetchContainer from "../settings/fetch/SettingsFetchContainer";
import CampaignFetchContainer from "../campaign/fetch/CampaignFetchContainer";
import TestSignInFetch from "./fetch/TestSignInFetch";

class AppFetch extends React.PureComponent {

    render() {
        // console.log('AppFetch render');
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
