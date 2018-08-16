import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {renderDifficultyLevelStars} from "../../util/taskDifficultyLevel";

export default class DifficultLevelStars extends React.PureComponent {

    static propTypes = {
        style: PropTypes.object,
        selectedId: PropTypes.string
    };

    static defaultProps = {};

    render() {
        const {style, selectedId} = this.props;
        return <div className='difficultLevelStars' style={style}>{renderDifficultyLevelStars(selectedId)}</div>;
    }
}