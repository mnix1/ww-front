import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import {getText, TEXT_APP_NAME} from "../../lang";
import {Anime} from "../../component/anime/Anime";

class TopBar extends React.PureComponent {

    renderProfile() {
        const {profile} = this.props;
        const style = {marginLeft: 4};
        return <div className='topBarProfile'>
            <div>{profile.name}</div>
            <div style={style}>#{profile.tag}</div>
            {/*<a href='/logout'><FaSignOut style={{...style, color: CREAM_COLOR}}/></a>*/}
        </div>
    }

    renderLogo() {
        const {screen} = this.props;
        const {contentWidth, height} = screen;
        const fontSize = Math.min(contentWidth / 14, height / 14);
        return <div className='topBarContent'>
            <Anime from={{opacity: 0, fontSize: 0}}
                   to={{opacity: 1, fontSize}}
                   config={{duration: 200}}>
                <div className='topBarContentValue'>{getText(TEXT_APP_NAME)}</div>
            </Anime>
        </div>
    }

    render() {
        return <div className='topBar'>
            {this.renderProfile()}
            {this.renderLogo()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(TopBar);
