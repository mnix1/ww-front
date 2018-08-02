import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {getText, TEXT_APP_NAME} from "../../lang";
import robo from '../../media/image/hero/robo.svg';
import {Anime} from "../../component/anime/Anime";
import {checkNotBitHeight, checkSmallHeight} from "../../redux/reducer/screen";

class TopBar extends React.PureComponent {

    renderProfile() {
        const {profile} = this.props;
        const style = {marginLeft: 4};
        return <div className={styles.topBarProfile}>
            <div>{profile.name}</div>
            <div style={style}>#{profile.tag}</div>
            {/*<a href='/logout'><FaSignOut style={{...style, color: CREAM_COLOR}}/></a>*/}
        </div>
    }

    renderLogo(){
        const {screen} = this.props;
        const {contentWidth, height, contentHeight} = screen;
        const fontSize = Math.min(contentWidth / 14, height / 14 * 9 / 16);
        return <div className={styles.topBarContent}>
            <Anime from={{opacity: 0, fontSize: 0}}
                   to={{opacity: 1, fontSize}}
                   config={{duration: 200}}>
                <div className={styles.topBarContentValue}>{getText(TEXT_APP_NAME)}</div>
            </Anime>
            <Anime from={{opacity: 0, height: 0}}
                   to={{opacity: 1, height: height - contentHeight - fontSize * 1.25 - 16}}
                   config={{duration: 100, delay: 100}}>
                {/*{_.map(HEROES).map(e => <img alt='' src={e}/>)}*/}
                <img alt='' src={robo}/>
            </Anime>
        </div>
    }

    render() {
        const {screen} = this.props;
        if (checkNotBitHeight(screen.resolution)) {
            return this.renderProfile();
        }
        return <div className={styles.topBar}>
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
