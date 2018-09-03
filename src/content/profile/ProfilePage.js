import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import ProfilePageBook from "./ProfilePageBook";
import AvailableResources from "../../component/resource/AvailableResources";
import MeshBackground from "../../component/background/MeshBackground";
import Profile from "../../component/profile/Profile";

class ProfilePage extends React.PureComponent {

    renderContent() {
        const {profile} = this.props;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyBetween'>
                <div className='justifyCenter'><AvailableResources/></div>
                <Profile renderTag className='' {...profile}/>
            </div>
            <ProfilePageBook/>
        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className='page profilePage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            {/*<div className='pageBackground absoluteBackgroundMix'/>*/}
            <MeshBackground/>
            <div className='pageContent overflowAuto'>
                {this.renderContent()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({})
)(ProfilePage);
