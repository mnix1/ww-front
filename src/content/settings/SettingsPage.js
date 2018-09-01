import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import ChooseWisorPage from "./ChooseWisorPage";
import {getWisor} from "../../util/wisorHelper";

class SettingsPage extends React.PureComponent {

    renderContent() {
        return <div>
            {this.renderActualWisor()}
            <ChooseWisorPage/>
        </div>
    }

    renderActualWisor() {
        const {profile, screen} = this.props;
        return <div>
            <img src={getWisor(profile.wisorType)} height={screen.wisieImgHeight * 2}/>
        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className='page settingsPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <div className='pageBackground absoluteBackgroundMix'/>
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
)(SettingsPage);
