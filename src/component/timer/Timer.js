import React from 'react';
import styles from './styles.css';
import _ from 'lodash';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

class Timer extends React.PureComponent {

    static propTypes = {
        work: PropTypes.bool,
        from: PropTypes.number,
        to: PropTypes.number,
        down: PropTypes.bool,
    };

    static defaultProps = {
        work: true,
        down: true,
        to: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.from,
            elapsed: 0,
            lastTimestamp: undefined
        };
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        this.stop();
    }

    start = () => {
        this.frameId = requestAnimationFrame(this.tick);
    };

    tick = (timestamp) => {
        const {elapsed, lastTimestamp, value} = this.state;
        const {to, down, work} = this.props;
        if (!work) {
            return this.stop();
        }
        const delta = timestamp - _.defaultTo(lastTimestamp, timestamp);
        let newValue = down ? value - delta : value + delta;
        if ((down && value < to) || (!down && value > to)) {
            newValue = to;
            this.stop();
        }
        this.setState(
            {
                value: newValue,
                elapsed: delta + elapsed,
                lastTimestamp: timestamp
            },
            () => this.frameId = requestAnimationFrame(this.tick)
        );
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
    };


    render() {
        const {value} = this.state;
        const valueRound = Math.round(value / 100);
        const seconds = (valueRound / 10).toFixed(1);
        return <div className='timer'>
            {seconds} s
        </div>
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(Timer);
