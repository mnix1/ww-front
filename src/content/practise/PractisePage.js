import React from 'react';
import styles from './styles.css';
import _ from 'lodash';
import {connect} from 'react-redux';
import {TOP_BAR_HEIGHT} from "../../util/style/constant";
import TileGroup from "../../component/tile-group/TileGroup";
import {CATEGORY_CHOOSE_LABEL, TILE_LABELS} from "../../lang";
import {answerIdChanged, categoryChanged} from "../../redux/reducer/rival";
import {tileDimension, tileFontSize} from "../../component/tile/tileHelper";
import {TILES_CATEGORY} from "../../component/tile/tileCategoryHelper";
import {randomTileMaterial} from "../../component/tile/tileMaterialHelper";
import Rival from "../../component/rival/Rival";
import PractiseRivalStartFetch from "./fetch/PractiseRivalStartFetch";
import PractiseRivalEndFetch from "./fetch/PractiseRivalEndFetch";

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
            forceCollideStrengthFactor={0.4}
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
        return this.renderRivalStart();
    }

    renderChooseCategory() {
        const {width} = this.props;
        return <div>
            <div className={styles.contentHeader} style={{width}}>{CATEGORY_CHOOSE_LABEL[window.activeLang]}</div>
            {this.renderContentTiles(TILES_CATEGORY)}
        </div>;
    }

    renderRivalStart() {
        const {rivalStart, rivalEnd, onAnswer} = this.props;
        return <Rival
            pending={_.get(rivalStart, 'pending')}
            rejected={_.get(rivalStart, 'rejected')}
            fulfilled={_.get(rivalStart, 'fulfilled')}
            question={_.get(rivalStart, 'value.practise.question')}
            answers={_.get(rivalStart, 'value.practise.question.answers')}
            correctAnswerId={_.get(rivalEnd, 'value.correctAnswerId')}
            onAnswer={onAnswer}/>
    }

    render() {
        const {category, answerId, rivalStart} = this.props;
        return <div>
            {this.renderContent()}
            <PractiseRivalStartFetch category={category}/>
            <PractiseRivalEndFetch answerId={answerId} rivalStart={rivalStart}/>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        category: state.rival.category,
        answerId: state.rival.answerId,
        rivalStart: state.repository.practiseRivalStart,
        rivalEnd: state.repository.practiseRivalEnd,
    }),
    (dispatch) => ({
        onCategoryChange: (id) => dispatch(categoryChanged(id)),
        onAnswer: (id) => dispatch(answerIdChanged(id)),
    })
)(PractisePage);
