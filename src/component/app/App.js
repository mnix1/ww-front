import React from 'react';
import styles from './app.css';
import {connect} from 'react-redux';
import {MEDIUM_PADDING, TOP_BAR_HEIGHT} from "../../util/style/constant";
import TileGroup from "../tileGroup/TileGroup";
import {APP_NAME, TILE_LABELS} from "../../lang";
import {idChanged} from "../../redux/reducer/content";
import {tileDimension, TILES} from "../tile/tileHelper";

class App extends React.PureComponent {

    renderTopBar() {
        const {contentWidth} = this.props.screen;
        return <div className={styles.topBar} style={{height: TOP_BAR_HEIGHT}}>
            <div className={styles.topBarContent} style={{width: contentWidth}}>
                    <span style={{
                        lineHeight: TOP_BAR_HEIGHT + 'px',
                        padding: MEDIUM_PADDING
                    }}>{APP_NAME[window.activeLang]}</span>
            </div>
        </div>
    }

    renderContent() {

    }

    render() {
        const {height, contentWidth} = this.props.screen;
        const {onIdChange} = this.props;
        return <div className={styles.app}>
            {this.renderTopBar()}
            <TileGroup
                onClick={onIdChange}
                style={{background: '#4ea5c5', margin: 'auto'}}
                width={contentWidth}
                height={height - TOP_BAR_HEIGHT}
                tiles={TILES.map(e => ({...e,  label: TILE_LABELS[window.activeLang][e.id], a: tileDimension(this.props.screen, e.aFactor)}))}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        id: state.content.id
    }),
    (dispatch) => ({onIdChange: (id) => dispatch(idChanged(id))})
)(App);
