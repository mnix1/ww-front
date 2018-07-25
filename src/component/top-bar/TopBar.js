import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {getText, TEXT_APP_NAME} from "../../lang";
import robo from '../../media/image/heroes/robo.svg';
import {Anime} from "../../component/anime/Anime";
import {checkSmallHeight} from "../../redux/reducer/screen";

class TopBar extends React.PureComponent {

    render() {
        const {screen} = this.props;
        const {contentWidth, height, contentHeight} = screen;
        const fontSize = Math.min(contentWidth / 14, height / 14 * 9 / 16);
        if (checkSmallHeight(screen.resolution)) {
            return null;
        }
        return <div className={styles.topBar}>
            <div className={styles.topBarContent}>
                <Anime from={{opacity: 0, fontSize: 0}}
                       to={{opacity: 1, fontSize}}
                       config={{duration: 1000}}>
                    <div className={styles.topBarContentValue}>{getText(TEXT_APP_NAME)}</div>
                </Anime>
                <Anime from={{opacity: 0, height: 0}}
                       to={{opacity: 1, height: height - contentHeight - fontSize * 1.25 - 16}}
                       config={{duration: 500, delay: 500}}>
                    <img src={robo}/>
                </Anime>
            </div>
            <div style={{position: 'absolute', bottom: 0, right: 0, fontSize: 8}}>
                S {JSON.stringify(screen)}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(TopBar);
