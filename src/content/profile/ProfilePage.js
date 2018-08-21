import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import ProfilePageBook from "./ProfilePageBook";
import ProfilePageResource from "./ProfilePageResource";

class ProfilePage extends React.PureComponent {

    renderContent() {
        return <div>
            <ProfilePageResource/>
            <ProfilePageBook/>
        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className='page profilePage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <div className='pageBackground'/>
            <div className='pageContent'>
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
