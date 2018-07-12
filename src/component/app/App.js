import React from 'react';
import styles from './app.css';
import Tile from "../tile/Tile";
import {connect} from 'react-redux';
import {MEDIUM_PADDING, TOP_BAR_HEIGHT} from "../../util/style/constant";
import {TILE_MATERIALS} from "../tile/tileHelper";

class App extends React.PureComponent {

    tileDimension(factor = 1) {
        const {height, contentWidth, isSmall} = this.props.screen;
        factor /= isSmall ? 4 : 8;
        const dimension = Math.min(factor * contentWidth, factor * height);
        return {width: dimension, height: dimension};
    }

    render() {
        const {height, contentWidth} = this.props.screen;
        return <div className={styles.app}>
            <div className={styles.topBar} style={{height: TOP_BAR_HEIGHT}}>
                <div className={styles.topBarContent} style={{width: contentWidth}}>
                    <span style={{lineHeight: TOP_BAR_HEIGHT + 'px', padding: MEDIUM_PADDING}}>Wisdom War</span>
                </div>
            </div>
            <div className={styles.tiles}
                 style={{width: contentWidth, height: height - TOP_BAR_HEIGHT}}>
                <div className={styles.tilesGroup} style={{padding: MEDIUM_PADDING}}>
                    <Tile style={{...this.tileDimension(1), ...TILE_MATERIALS[1]}}>Battle NOW!</Tile>
                    <Tile style={{...this.tileDimension(0.8), ...TILE_MATERIALS[9]}}>History</Tile>
                </div>
                <div className={styles.tilesGroup} style={{padding: MEDIUM_PADDING}}>
                    <Tile style={{...this.tileDimension(0.8), ...TILE_MATERIALS[12]}}>Friends</Tile>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen
    }),
    (dispatch) => ({})
)(App);
