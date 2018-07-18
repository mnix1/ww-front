import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import TileGroup from "../../component/tile-group/TileGroup";
import {TILE_LABELS} from "../../lang";
import {idChanged} from "../../redux/reducer/content";
import {TILE_APP_TRAINING, TILES_APP} from "../../component/tile/tileAppHelper";
import {tileDimension, tileFontSize} from "../../component/tile/tileHelper";
import {randomTileMaterial} from "../../component/tile/tileMaterialHelper";
import Back from "../../component/back/Back";
import PractisePage from "../practise/PractisePage";
import TopBar from "../../component/top-bar/TopBar";

class App extends React.PureComponent {

    renderContentTiles(tiles) {
        const {contentHeight, contentWidth, isSmall} = this.props.screen;
        const {contentId, onContentIdChange} = this.props;
        return <TileGroup
            id={contentId}
            onClick={onContentIdChange}
            width={contentWidth}
            height={contentHeight}
            defaultFontSize={tileFontSize(isSmall)}
            tiles={tiles.map(e => ({
                ...e,
                material: e.material || randomTileMaterial(),
                label: TILE_LABELS[window.activeLang][e.id],
                a: tileDimension(this.props.screen, e.aFactor)
            }))}/>
    }

    renderContent() {
        const {contentId} = this.props;
        if (contentId === undefined) {
            return this.renderContentTiles(TILES_APP);
        }
        if (contentId === TILE_APP_TRAINING) {
            return <PractisePage/>
        }
    }

    renderBack() {
        const {contentId} = this.props;
        if (contentId === undefined) {
            return null;
        }
        return <Back/>;
    }

    render() {
        const {screen} = this.props;
        const {height, contentWidth} = screen;
        return <div className={styles.app}>
            <div style={{height, width: contentWidth}} className={styles.content}>
                <TopBar screen={screen}/>
                {this.renderBack()}
                {this.renderContent()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        contentId: state.content.id,
    }),
    (dispatch) => ({
        onContentIdChange: (id) => dispatch(idChanged(id)),
    })
)(App);
