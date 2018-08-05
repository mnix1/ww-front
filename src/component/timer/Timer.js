import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Line} from "rc-progress";
import './styles.css';

class Timer extends React.PureComponent {

    static propTypes = {
        work: PropTypes.bool,
        from: PropTypes.number,
        to: PropTypes.number,
        down: PropTypes.bool,
        showSeconds: PropTypes.bool,
        showChart: PropTypes.bool
    };

    static defaultProps = {
        work: true,
        down: true,
        to: 0,
        showSeconds: false,
        showChart: true
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

    renderSeconds() {
        const {value} = this.state;
        const valueRound = Math.round(value / 100);
        const seconds = (valueRound / 10).toFixed(1);
        return <span>{seconds} s</span>
    }

    renderChart() {
        const {to, from} = this.props;
        const {value} = this.state;
        const percent = value / (from - to) * 100;
        return <Line style={{width: 80}} percent={percent} strokeWidth="8" strokeColor="#FFFFFF"/>
    }

    render() {
        const {showSeconds, showChart} = this.props;
        return <div className='timer'>
                <div className='timerContent'>
                    {showSeconds && this.renderSeconds()}
                    {showChart && this.renderChart()}
                </div>
        </div>
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(Timer);
