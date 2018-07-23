import React from 'react';
import {connect} from 'react-redux';
import styles from './styles.css';
import {randomTileMaterial} from "../tile/tileMaterialHelper";
import TileGroup from "../tile-group/TileGroup";
import PropTypes from "prop-types";
import {prepareAnimationTiles, prepareAnswerTiles, prepareQuestionTiles} from "./rivalTiles";
import {TEXT_ANIMATION_TASK_RENDERER} from "../../util/taskRenderer";
import {skipAnimationChanged} from "../../redux/reducer/rival";
import {getText, TEXT_CLICK_ON_ANY, TEXT_QUESTION, TEXT_REMEMBER_DETAILS} from "../../lang";

class Rival extends React.PureComponent {

    static propTypes = {
        screen: PropTypes.object,
        pending: PropTypes.bool,
        rejected: PropTypes.bool,
        fulfilled: PropTypes.bool,
        question: PropTypes.object,
        answers: PropTypes.array,
        answerId: PropTypes.number,
        correctAnswerId: PropTypes.number,
        onAnswer: PropTypes.func,
        skipAnimation: PropTypes.bool,
        onSkipAnimationChange: PropTypes.func,
    };

    questionMaterial = randomTileMaterial();

    renderTask() {
        const {contentHeight, contentWidth} = this.props.screen;
        const {onAnswer, correctAnswerId, answerId} = this.props;
        return <div>
            {!answerId && <div className="contentHeader">{getText(TEXT_QUESTION)}</div>}
            <TileGroup
                id={'task' + correctAnswerId}
                forceXYStrength={0.1}
                onClick={(id) => id && !answerId && onAnswer(id)}
                width={contentWidth}
                height={contentHeight}
                tiles={prepareQuestionTiles(this).concat(prepareAnswerTiles(this))}/>
        </div>
    }

    renderAnimation() {
        const {contentHeight, contentWidth} = this.props.screen;
        const {onSkipAnimationChange} = this.props;
        return <div>
            <div className="contentHeader">
                {getText(TEXT_REMEMBER_DETAILS)}
                <br/>
                {getText(TEXT_CLICK_ON_ANY)}
            </div>
            <TileGroup
                id={'animation'}
                onClick={() => onSkipAnimationChange(true)}
                forceCollideStrengthFactor={0.76}
                width={contentWidth}
                height={contentHeight}
                tiles={prepareAnimationTiles(this)}/>
        </div>
    }

    shouldShowAnimation() {
        const {question, skipAnimation} = this.props;
        return question.taskRenderer === TEXT_ANIMATION_TASK_RENDERER && !skipAnimation;
    }

    renderContent() {
        if (this.shouldShowAnimation()) {
            return this.renderAnimation();
        }
        return this.renderTask();
    }

    render() {
        const {pending, rejected, fulfilled, answerId} = this.props;
        if (pending) {
            return 'LOADING';
        }
        if (rejected) {
            return 'REJECTED';
        }
        if (fulfilled) {
            return <div className={styles.rival}>
                {this.renderContent()}
            </div>
        }
        return null;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        skipAnimation: state.rival.skipAnimation
    }),
    (dispatch) => ({
        onSkipAnimationChange: skipAnimation => dispatch(skipAnimationChanged(skipAnimation))
    })
)(Rival);
