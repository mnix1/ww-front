import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getContent, TILE_LABELS} from "../../lang";
import styles from './styles.css';
import {randomTileMaterial, TILE_MATERIALS} from "../tile/tileMaterialHelper";
import {TOP_BAR_HEIGHT} from "../../util/style/constant";
import {tileDimension, tileFontSize} from "../tile/tileHelper";
import TileGroup from "../tile-group/TileGroup";

class Rival extends React.PureComponent {

    renderQuestion() {
        const {question} = this.props.value;
        return <div className={styles.question}>
            {getContent(question)}
        </div>
    }

    renderAnswers() {
        const {answers} = this.props.value.question;
        return <div className={styles.answers}>
            {answers.map(ans => <div className={styles.answer}>{getContent(ans)}</div>)}
        </div>
    }

    renderContent() {
        const {height, contentWidth, isSmall} = this.props.screen;
        const {question} = this.props.value;
        const answersLength = question.answers.length;
        return <TileGroup
            id={'rival'}
            onClick={_.noop}
            width={contentWidth}
            height={height - TOP_BAR_HEIGHT}
            defaultFontSize={tileFontSize(this.props.screen)}
            tiles={[
                {
                    label: getContent(question),
                    a: isSmall ? 50 : 200,
                    h: isSmall ? 50 : 100,
                    w: isSmall ? 200 : 400,
                    material: TILE_MATERIALS[1],
                    yTarget: -1 / 3,
                    xTarget: 0
                },
            ].concat(question.answers.map((ans, i) => ({
                label: getContent(ans),
                a: isSmall ? 50 : 100,
                material: randomTileMaterial(),
                yTarget: 1 / 3,
                xTarget: (2 * i / (answersLength - 1) - 1) / 2
            })))}/>
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
                {/*{this.renderQuestion()}*/}
                {/*{this.renderAnswers()}*/}
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
