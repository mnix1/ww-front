import React from 'react';
import styles from './styles.css';
import _ from 'lodash';
import {connect} from 'react-redux';
import TileGroup from "../../component/tile-group/TileGroup";
import {
    TIME,
    CATEGORY_CHOOSE_LABEL,
    CORRECT_ANSWER,
    PLAY_AGAIN,
    TILE_LABELS,
    WRONG_ANSWER
} from "../../lang";
import {answerIdChanged, categoryChanged, skipAnimationChanged} from "../../redux/reducer/rival";
import {tileDimension, tileFontSize} from "../../component/tile/tileHelper";
import {TILES_CATEGORY} from "../../component/tile/tileCategoryHelper";
import {randomTileMaterial} from "../../component/tile/tileMaterialHelper";
import Rival from "../../component/rival/Rival";
import PractiseRivalStartFetch, {clearPractiseRivalStartFetch} from "./fetch/PractiseRivalStartFetch";
import PractiseRivalEndFetch, {clearPractiseRivalEndFetch} from "./fetch/PractiseRivalEndFetch";
import {randomHero} from "../../util/media/HeroHelper";

class PractisePage extends React.PureComponent {

    randomHero = randomHero();

    componentDidUpdate() {

    }

    renderContentTiles(tiles) {
        const {contentHeight, contentWidth, isSmall} = this.props.screen;
        const {category, onCategoryChange} = this.props;
        return <TileGroup
            id={category}
            onClick={onCategoryChange}
            width={contentWidth}
            height={contentHeight}
            defaultFontSize={tileFontSize(isSmall)}
            forceCollideStrengthFactor={0.6}
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
            <div className="contentHeader" style={{width}}>{CATEGORY_CHOOSE_LABEL[window.activeLang]}</div>
            {this.renderContentTiles(TILES_CATEGORY)}
        </div>;
    }

    renderRival() {
        const {rivalStart, rivalEnd, answerId, onAnswer} = this.props;
        const correctAnswerId = _.get(rivalEnd, 'value.correctAnswerId');
        return <div>
            {answerId && correctAnswerId && [this.renderResult(), this.renderPlayAgain()]}
            <Rival key='rival'
                   pending={_.get(rivalStart, 'pending')}
                   rejected={_.get(rivalStart, 'rejected')}
                   fulfilled={_.get(rivalStart, 'fulfilled')}
                   question={_.get(rivalStart, 'value.practise.question')}
                   answers={_.get(rivalStart, 'value.practise.question.answers')}
                   correctAnswerId={_.get(rivalEnd, 'value.correctAnswerId')}
                   answerId={answerId}
                   onAnswer={onAnswer}/>
        </div>
    }

    renderResult() {
        const {answerId, rivalEnd} = this.props;
        const correctAnswerId = _.get(rivalEnd, 'value.correctAnswerId');
        if (!correctAnswerId) {
            return null;
        }
        const answerInterval = _.get(rivalEnd, 'value.answerInterval');
        const answerIntervalMessage = `${TIME[window.activeLang]}${(answerInterval / 1000).toFixed(1)} s`;
        const resultMessage = correctAnswerId === answerId ? CORRECT_ANSWER[window.activeLang] : WRONG_ANSWER[window.activeLang];
        return <div key='result' className="contentHeader">
            <span className={styles.resultMessage}>{resultMessage}</span>
            <br/>
            <span className={styles.resultMessage}>{answerIntervalMessage}</span>
        </div>;
    }

    renderPlayAgain() {
        const {onPlayAgain} = this.props;
        const style = {cursor: 'pointer', marginRight: 4};
        return <div key='playAgain' className={`contentHeader ${styles.playAgain}`}>
            <div><span onClick={onPlayAgain} style={style}>{PLAY_AGAIN[window.activeLang]}</span></div>
            <img onClick={onPlayAgain} src={this.randomHero} style={style} height={80}/>
        </div>;
    }

    render() {
        const {category, answerId, rivalStart} = this.props;
        return <div>
            {this.renderContent()}
            <PractiseRivalStartFetch category={category} rivalStart={rivalStart}/>
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
        onPlayAgain: () => {
            dispatch(answerIdChanged(undefined));
            dispatch(skipAnimationChanged(false));
            clearPractiseRivalStartFetch(dispatch);
            clearPractiseRivalEndFetch(dispatch);
        }
    })
)(PractisePage);
