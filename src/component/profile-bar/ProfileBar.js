import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import Profile from "../profile/Profile";
import Gold from "../resource/Gold";
import Diamond from "../resource/Diamond";

class ProfileBar extends React.PureComponent {

    renderProfile() {
        const {profile} = this.props;
        return <div className='profileBarProfile'>
            <div className='profileBarBackground'/>
            <Profile {...profile} imgHeight={35}/>
        </div>
    }

    renderResources() {
        const {profile} = this.props;
        return <div className='profileBarResources'>
            <div className='profileBarBackground'/>
            <Gold>{profile.gold}</Gold>
            <Diamond>{profile.diamond}</Diamond>
        </div>
    }


    render() {
        const {screen} = this.props;
        return <div className='profileBar' style={{width: screen.contentWidth, height: 50}}>
            <div className='profileBarContent'>
                {this.renderResources()}
                {this.renderProfile()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(ProfileBar);
