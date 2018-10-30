import React from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import {Line} from "rc-progress";
import './styles.css';
import Clock from 'react-clock';
import DigitalClock from "../digital-clock/DigitalClock";
import {datePartFormatter} from "../../util/dateHelper";

export default class Timer extends React.PureComponent {

    state = {

    };

    static propTypes = {
        children: PropTypes.node,
        work: PropTypes.bool,
        from: PropTypes.number,
        to: PropTypes.number,
        lineWidth: PropTypes.number,
        down: PropTypes.bool,
        showNumber: PropTypes.bool,
        showChart: PropTypes.bool,
        showAnalog: PropTypes.bool,
        showDigital: PropTypes.bool,
        numberFillHours0: PropTypes.bool,
        numberSeconds: PropTypes.bool,
        numberMinutes: PropTypes.bool,
        numberAutoHide0: PropTypes.bool,
        className: PropTypes.string,
        onDone: PropTypes.func
    };

    static defaultProps = {
        work: true,
        down: true,
        to: 0,
        numberAutoHide0: false,
        lineWidth: 50,
        numberFillHours0: true,
        numberSeconds: true,
        numberMinutes: true,
        showNumber: false,
        showChart: true,
        showAnalog: false,
        showDigital: false,
        className: '',
        onDone: _.noop,
        onTick: _.noop
    };

    init(props) {
        const valueSeconds = props.down ? Math.ceil(props.from / 1000) : Math.floor(props.from / 1000);
        const hours = Math.floor(valueSeconds / 3600);
        const minutes = Math.floor((valueSeconds - hours * 3600) / 60);
        const seconds = Math.floor(valueSeconds - hours * 3600 - minutes * 60);
        this.setState({
            hours,
            minutes,
            seconds,
            valueSeconds,
            value: props.from,
            elapsed: 0,
            lastTimestamp: undefined
        });
    }

    componentDidMount() {
        this.init(this.props);
        this.start();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.from !== this.props.from) {
            this.stop();
            this.init(this.props);
            this.start();
        }
    }

    componentWillUnmount() {
        this.stop();
    }

    start = () => {
        this.frameId = requestAnimationFrame(this.tick);
    };

    tick = (timestamp) => {
        const {elapsed, lastTimestamp, value} = this.state;
        const {to, down, work, onDone, onTick} = this.props;
        if (!work) {
            return this.stop();
        }
        const delta = timestamp - _.defaultTo(lastTimestamp, timestamp);
        let newValue = down ? value - delta : value + delta;
        if ((down && value <= to) || (!down && value >= to)) {
            newValue = to;
            onDone();
            this.stop();
            return;
        }
        const valueSeconds = down ? Math.ceil(value / 1000) : Math.floor(value / 1000);
        const hours = Math.floor(valueSeconds / 3600);
        const minutes = Math.floor((valueSeconds - hours * 3600) / 60);
        const seconds = Math.floor(valueSeconds - hours * 3600 - minutes * 60);
        const state = {
            hours,
            minutes,
            seconds,
            valueSeconds,
            value: newValue,
            elapsed: delta + elapsed,
            lastTimestamp: timestamp
        };
        this.setState(state,
            () => this.frameId = requestAnimationFrame(this.tick)
        );
        onTick(state);
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
    };

    renderNumber() {
        const {numberMinutes, numberSeconds, numberFillHours0, numberAutoHide0} = this.props;
        const {hours, minutes, seconds} = this.state;
        let h, m, s;
        if (numberAutoHide0) {
            h = hours > 0 && <span>{hours}h</span>;
            m = h ? <span>{datePartFormatter(minutes)}m</span> : minutes > 0 && <span>{minutes}m</span>;
            s = m ? <span>{datePartFormatter(seconds)}s</span> : seconds > 0 && <span>{seconds}s</span>;
        } else {
            h = <span>{numberFillHours0 ? datePartFormatter(hours) : hours}h</span>;
            m = numberMinutes && <span>{datePartFormatter(minutes)}m</span>;
            s = numberSeconds && <span>{datePartFormatter(seconds)}s</span>;
        }
        return <span>{h} {m} {s}</span>
    }

    renderDigital() {
        const {hours, minutes, seconds} = this.state;
        const time = `${datePartFormatter(hours)}:${datePartFormatter(minutes)}:${datePartFormatter(seconds)}`;
        return <DigitalClock fontSize='0.8rem' time={time}/>
    }

    renderAnalog() {
        const {value} = this.state;
        return <Clock size={100} value={new Date(value)}/>;
    }

    renderChart() {
        const {to, from, lineWidth} = this.props;
        const {value} = this.state;
        const percent = value / (from - to) * 100;
        return <Line style={{width: lineWidth}} percent={percent} strokeWidth="8" strokeColor="#FFFFFF"/>
    }

    render() {
        const {children, showNumber, showDigital, showChart, showAnalog, className} = this.props;
        const cn = `timer ${className}`;
        return <div className={cn}>
            <div className='timerContent'>
                {showAnalog && this.renderAnalog()}
                {showNumber && this.renderNumber()}
                {showDigital && this.renderDigital()}
                {showChart && this.renderChart()}
            </div>
            {children}
        </div>
    }
}
