import React from 'react';
import {connect} from 'react-redux';
import {getContent} from "../../lang";
import styles from './styles.css';
import {
    CORRECT_ANSWER_TILE_MATERIAL,
    randomTileMaterial,
    WRONG_ANSWER_TILE_MATERIAL,
} from "../tile/tileMaterialHelper";
import {tileFontSize} from "../tile/tileHelper";
import TileGroup from "../tile-group/TileGroup";
import {wordsByLength} from "../../util/textHelper";
import PropTypes from "prop-types";

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
    };

    questionMaterial = randomTileMaterial();

    prepareQuestionTile() {
        const {isSmall} = this.props.screen;
        const {question} = this.props;
        return {
            label: wordsByLength(getContent(question), 40),
            a: isSmall ? 100 : 200,
            h: isSmall ? 80 : 100,
            w: isSmall ? 280 : 350,
            material: this.questionMaterial,
            fontSize: tileFontSize(isSmall),
            yTarget: -1 / 3,
            xTarget: 0
        };
    }

    prepareAnswerTiles() {
        const {isSmall} = this.props.screen;
        const {answers} = this.props;
        return answers.map((ans, i) => ({
            id: ans.id,
            label: wordsByLength(getContent(ans), isSmall ? 18 : 20),
            a: isSmall ? 80 : 100,
            h: isSmall ? 60 : 80,
            w: isSmall ? 90 : 140,
            material: this.prepareAnswerMaterial(ans.id),
            fontSize: tileFontSize(isSmall, 0.8),
            yTarget: 1 / 3,
            xTarget: (2 * i / (answers.length - 1) - 1) / 2
        }));
    }

    prepareAnswerMaterial(id) {
        const {correctAnswerId} = this.props;
        if (correctAnswerId === undefined) {
            return randomTileMaterial();
        }
        return correctAnswerId === id ? CORRECT_ANSWER_TILE_MATERIAL : WRONG_ANSWER_TILE_MATERIAL;
    }

    renderContent() {
        const {contentHeight, contentWidth} = this.props.screen;
        const {onAnswer, correctAnswerId, answerId} = this.props;
        return <TileGroup
            id={'rival' + correctAnswerId}
            forceXYStrength={0.1}
            onClick={(id) => id && !answerId && onAnswer(id)}
            width={contentWidth}
            height={contentHeight}
            tiles={[this.prepareQuestionTile()].concat(this.prepareAnswerTiles())}/>
    }

    render() {
        const {pending, rejected, fulfilled} = this.props;
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
        screen: state.screen
    }),
    (dispatch) => ({})
)(Rival);
