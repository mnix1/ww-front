import React from 'react';
import styles from './styles.css';
import _ from 'lodash';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

class Timer extends React.PureComponent {

    static propTypes = {
        work: PropTypes.bool,
    };

    state = {
        elapsed: 0,
        lastTimestamp: undefined
    };

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
        if (!this.props.work) {
            return this.stop();
        }
        const delta = timestamp - _.defaultTo(this.state.lastTimestamp, timestamp);
        this.setState(
            {
                elapsed: delta + this.state.elapsed,
                lastTimestamp: timestamp
            },
            () => this.frameId = requestAnimationFrame(this.tick)
        );
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
    };


    render() {
        const elapsed = Math.round(this.state.elapsed / 100);
        const seconds = (elapsed / 10).toFixed(1);
        return <div className={styles.timer}>
            {seconds} s
        </div>
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(Timer);
