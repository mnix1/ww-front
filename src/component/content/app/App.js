import React from 'react';
import styles from './app.css';
import {connect} from 'react-redux';
import {MEDIUM_PADDING, TOP_BAR_HEIGHT} from "../../../util/style/constant";
import TileGroup from "../../tileGroup/TileGroup";
import {APP_NAME, CATEGORY_CHOOSE_LABEL, TILE_LABELS} from "../../../lang";
import {idChanged} from "../../../redux/reducer/content";
import {TILE_APP_TRAINING, TILES_APP} from "../../tile/tileAppHelper";
import {tileDimension} from "../../tile/tileHelper";
import {TILES_CATEGORY} from "../../tile/tileCategoryHelper";
import {randomTileMaterial} from "../../tile/tileMaterialHelper";
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import FetchPractise from "../../fetch/FetchPractise";

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

    renderBack() {
        const {contentId, onContentIdChange} = this.props;
        if (contentId === undefined) {
            return null;
        }
        const {contentWidth, width} = this.props.screen;
        return <div className={styles.back} onClick={() => onContentIdChange(undefined)}
                    style={{left: (width - contentWidth) / 2}}>
            <MdArrowBack color="#fffdf1" size={30}/>
        </div>;
    }

    renderContentTiles(tiles) {
        const {height, contentWidth} = this.props.screen;
        const {contentId, onContentIdChange} = this.props;
        return <TileGroup
            id={contentId}
            onClick={onContentIdChange}
            style={{background: '#4ea5c5', margin: 'auto'}}
            width={contentWidth}
            height={height - TOP_BAR_HEIGHT}
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
        const {width} = this.props.screen;
        if (contentId === TILE_APP_TRAINING) {
            return <div>
                <div className={styles.contentHeader} style={{width}}>{CATEGORY_CHOOSE_LABEL[window.activeLang]}</div>
                {this.renderContentTiles(TILES_CATEGORY)}
            </div>;
        }
    }

    render() {
        return <div className={styles.app}>
            {this.renderTopBar()}
            {this.renderBack()}
            {this.renderContent()}
            <FetchPractise contentId={this.props.contentId}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        contentId: state.content.id,

    }),
    (dispatch) => ({onContentIdChange: (id) => dispatch(idChanged(id))})
)(App);
