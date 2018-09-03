import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import ProfilePageBook from "./ProfilePageBook";
import AvailableResources from "../../component/resource/AvailableResources";
import MeshBackground from "../../component/background/MeshBackground";

class ProfilePage extends React.PureComponent {

    renderContent() {
        return <div>
            <AvailableResources/>
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
        path: state.router.location.pathname,
    }),
    (dispatch) => ({})
)(ProfilePage);
