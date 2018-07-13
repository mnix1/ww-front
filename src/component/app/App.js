import React from 'react';
import styles from './app.css';
import {connect} from 'react-redux';
import {MEDIUM_PADDING, TOP_BAR_HEIGHT} from "../../util/style/constant";
import TileGroup from "../tileGroup/TileGroup";
import {
    TILE_MATERIALS,
    TILE_TYPE_BATTLE,
    TILE_TYPE_FRIEND,
    TILE_TYPE_HISTORY,
    TILE_TYPE_TRAINING,
    tileDimension
} from "../tile/tileHelper";
import {APP_NAME, TILE_LABELS} from "../../lang";

class App extends React.PureComponent {

    get tiles() {
        return [
            {
                id: TILE_TYPE_BATTLE,
                tx: -1 / 4,
                ty: -1 / 4,
                material: TILE_MATERIALS[1],
                a: tileDimension(this.props.screen, 1)
            },
            {
                id: TILE_TYPE_HISTORY,
                tx: 1 / 4,
                ty: -1 / 4,
                material: TILE_MATERIALS[21],
                a: tileDimension(this.props.screen, 0.8)
            },
            {
                id: TILE_TYPE_FRIEND,
                tx: -1 / 4,
                ty: 1 / 4,
                material: TILE_MATERIALS[12],
                a: tileDimension(this.props.screen, 0.9)
            },
            {
                id: TILE_TYPE_TRAINING,
                tx: 1 / 4,
                ty: 1 / 4,
                material: TILE_MATERIALS[6],
                a: tileDimension(this.props.screen, 1.1)
            }
        ].map(e => ({...e, label: TILE_LABELS[window.activeLang][e.id]}));
    }

    render() {
        const {height, contentWidth} = this.props.screen;
        return <div className={styles.app}>
            <div className={styles.topBar} style={{height: TOP_BAR_HEIGHT}}>
                <div className={styles.topBarContent} style={{width: contentWidth}}>
                    <span style={{
                        lineHeight: TOP_BAR_HEIGHT + 'px',
                        padding: MEDIUM_PADDING
                    }}>{APP_NAME[window.activeLang]}</span>
                </div>
            </div>
            <TileGroup
                style={{background: '#4ea5c5', margin: 'auto'}}
                width={contentWidth}
                height={height - TOP_BAR_HEIGHT}
                tiles={this.tiles}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen
    }),
    (dispatch) => ({})
)(App);
