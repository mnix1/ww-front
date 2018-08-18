import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {
    NAME_TO_DIFFICULT_LEVEL,
    DIFFICULT_LEVEL_TO_NAME,
    EXTREMELY_EASY,
    EXTREMELY_HARD
} from "../../util/taskDifficultyLevel";
import DifficultLevelStars from "./DifficultLevelStars";
import Slider from 'rc-slider';
import {connect} from "react-redux";
import {difficultLevelChanged} from "../../redux/reducer/battle";
import _ from 'lodash';
import 'rc-slider/assets/index.css';

export class ChooseDifficultLevelStarsComponent extends React.PureComponent {

    static propTypes = {
        style: PropTypes.object,
        difficultyLevel: PropTypes.string,
        onDifficultLevelChange: PropTypes.func,
    };

    static defaultProps = {};

    render() {
        const {style, difficultyLevel, onDifficultLevelChange} = this.props;
        return <div className='chooseDifficultLevelStars'>
            <div className='chooseDifficultLevelStarsContent '>
            <DifficultLevelStars selectedId={difficultyLevel}/>
                <Slider value={NAME_TO_DIFFICULT_LEVEL[difficultyLevel]}
                        min={NAME_TO_DIFFICULT_LEVEL[EXTREMELY_EASY]}
                        max={NAME_TO_DIFFICULT_LEVEL[EXTREMELY_HARD]}
                        onChange={onDifficultLevelChange}/>
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        difficultyLevel: state.battle.difficultyLevel,
    }),
    (dispatch) => ({
        onDifficultLevelChange: (id) => dispatch(difficultLevelChanged(DIFFICULT_LEVEL_TO_NAME[id]))
    })
)(ChooseDifficultLevelStarsComponent);
