import React from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {TOP_BAR_HEIGHT} from "../../util/style/constant";
import TileGroup from "../../component/tile-group/TileGroup";
import {CATEGORY_CHOOSE_LABEL, TILE_LABELS} from "../../lang";
import {categoryChanged} from "../../redux/reducer/rival";
import {tileDimension, tileFontSize} from "../../component/tile/tileHelper";
import {TILES_CATEGORY} from "../../component/tile/tileCategoryHelper";
import {randomTileMaterial} from "../../component/tile/tileMaterialHelper";
import PractiseRivalFetch from "./fetch/PractiseRivalFetch";
import Rival from "../../component/rival/Rival";

class PractisePage extends React.PureComponent {

    renderContentTiles(tiles) {
        const {height, contentWidth} = this.props.screen;
        const {category, onCategoryChange} = this.props;
        return <TileGroup
            id={category}
            onClick={onCategoryChange}
            width={contentWidth}
            height={height - TOP_BAR_HEIGHT}
            defaultFontSize={tileFontSize(this.props.screen)}
            tiles={tiles.map(e => ({
                ...e,
                material: e.material || randomTileMaterial(),
                label: TILE_LABELS[window.activeLang][e.id],
                a: tileDimension(this.props.screen, e.aFactor)
            }))}/>
    }

    renderContent() {
        const {category} = this.props;
        if (category === undefined) {
            return this.renderChooseCategory();
        }
        return this.renderRival();
    }

    renderChooseCategory() {
        const {width} = this.props;
        return <div>
            <div className={styles.contentHeader} style={{width}}>{CATEGORY_CHOOSE_LABEL[window.activeLang]}</div>
            {this.renderContentTiles(TILES_CATEGORY)}
        </div>;
    }

    renderRival() {
        const {rival} = this.props;
        return <Rival {...rival}/>
    }

    render() {
        const {category} = this.props;
        return <div>
            {this.renderContent()}
            <PractiseRivalFetch category={category}/>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        category: state.rival.category,
        rival: state.repository.practise
    }),
    (dispatch) => ({onCategoryChange: (id) => dispatch(categoryChanged(id))})
)(PractisePage);
