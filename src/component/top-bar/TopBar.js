import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {getText, TEXT_APP_NAME} from "../../lang";
import robo from '../../media/image/hero/robo.svg';
import {Anime} from "../../component/anime/Anime";
import {checkSmallHeight} from "../../redux/reducer/screen";

class TopBar extends React.PureComponent {

    renderProfile(){
        const {profile} = this.props;
        return <div className={styles.topBarProfile}>
            {/*<div>{profile.name}</div>*/}
            <div>#{profile.tag}</div>
        </div>
    }

    render() {
        const {screen} = this.props;
        const {contentWidth, height, contentHeight} = screen;
        const fontSize = Math.min(contentWidth / 14, height / 14 * 9 / 16);
        if (checkSmallHeight(screen.resolution)) {
            return this.renderProfile();
        }
        return <div className={styles.topBar}>
            {this.renderProfile()}
            <div className={styles.topBarContent}>
                <Anime from={{opacity: 0, fontSize: 0}}
                       to={{opacity: 1, fontSize}}
                       config={{duration: 200}}>
                    <div className={styles.topBarContentValue}>{getText(TEXT_APP_NAME)}</div>
                </Anime>
                <Anime from={{opacity: 0, height: 0}}
                       to={{opacity: 1, height: height - contentHeight - fontSize * 1.25 - 16}}
                       config={{duration: 100, delay: 100}}>
                    <img src={robo}/>
                </Anime>
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
)(TopBar);
