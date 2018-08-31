import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {NAME_TO_DIFFICULT_LEVEL} from "../../util/difficultyHelper";
import Rate from "./rate/Rate";
import _ from "lodash";

export default class Rating extends React.PureComponent {

    static propTypes = {
        style: PropTypes.object,
        valueString: PropTypes.string,
        value: PropTypes.number,
        onChange: PropTypes.func,
    };

    static defaultProps = {};

    render() {
        const {style, valueString, value, onChange} = this.props;
        const marginTop = onChange ? '-0.7rem' : '-0.2rem';
        return <Rate
            style={{...style, fontSize: onChange ? '2rem' : '1.3rem', marginTop}}
            disabled={_.isNil(onChange)}
            allowHalf={true}
            allowClear={true}
            onChange={onChange}
            value={_.defaultTo(value, NAME_TO_DIFFICULT_LEVEL[valueString])}
            count={3}/>
    }
}