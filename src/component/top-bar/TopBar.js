import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import {getText, TEXT_APP_NAME} from "../../lang/text";
import {Anime} from "../../component/anime/Anime";
import {push} from "connected-react-router";
import {APP_ROUTE} from "../../content/routes";

class TopBar extends React.PureComponent {

    renderLogo() {
        const {screen, onAppNameClick} = this.props;
        const {contentWidth, height} = screen;
        const fontSize = Math.min(contentWidth / 14, height / 14);
        return <div className='topBarContent'>
            <Anime from={{opacity: 0, fontSize: 0}}
                   to={{opacity: 1, fontSize}}
                   config={{duration: 200}}>
                <span onClick={onAppNameClick} className='topBarContentValue'>{getText(TEXT_APP_NAME)}</span>
            </Anime>
        </div>
    }

    render() {
        return <div className='topBar'>
            {this.renderLogo()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
    }),
    (dispatch) => ({
        onAppNameClick: () => {
            dispatch(push(APP_ROUTE));
        }
    })
)(TopBar);
