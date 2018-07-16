import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getContent} from "../../lang";
import styles from './styles.css';
import {randomTileMaterial} from "../tile/tileMaterialHelper";
import {TOP_BAR_HEIGHT} from "../../util/style/constant";
import {tileFontSize} from "../tile/tileHelper";
import TileGroup from "../tile-group/TileGroup";
import {wordsByLength} from "../../util/textHelper";

class Rival extends React.PureComponent {

    prepareQuestionTile() {
        const {isSmall} = this.props.screen;
        const {question} = this.props.value;
        return {
            label: wordsByLength(getContent(question), 30),
            a: isSmall ? 50 : 200,
            h: isSmall ? 50 : 100,
            w: isSmall ? 200 : 300,
            material: randomTileMaterial(),
            yTarget: -1 / 3,
            xTarget: 0
        };
    }

    prepareAnswerTiles() {
        const {isSmall} = this.props.screen;
        const {question} = this.props.value;
        return question.answers.map((ans, i) => ({
            label: getContent(ans),
            a: isSmall ? 50 : 100,
            material: randomTileMaterial(),
            yTarget: 1 / 3,
            xTarget: (2 * i / (question.answers.length - 1) - 1) / 2
        }));
    }

    renderContent() {
        const {height, contentWidth} = this.props.screen;
        return <TileGroup
            id={'rival'}
            onClick={_.noop}
            width={contentWidth}
            height={height - TOP_BAR_HEIGHT}
            defaultFontSize={tileFontSize(this.props.screen)}
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
