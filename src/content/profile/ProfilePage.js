import React from 'react';
import {connect} from 'react-redux';
import ProfilePageBook from "./ProfilePageBook";
import AvailableResources from "../../component/resource/AvailableResources";
import Profile from "../../component/profile/Profile";
import ScreenPage from "../../component/page/ScreenPage";

class ProfilePage extends React.PureComponent {
    render() {
        const {profile} = this.props;
        return <ScreenPage>
            <div className='justifyCenter flexColumn'>
                <div className='justifyEvenly'>
                    <div className='justifyCenter'><AvailableResources/></div>
                    <Profile renderTag className='' {...profile}/>
                </div>
                <ProfilePageBook/>
            </div>
        </ScreenPage>
    }
}

export default connect(
    (state) => ({
        profile: state.profile.profile,
    }),
)(ProfilePage);
