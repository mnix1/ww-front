import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {datePartFormatter} from "../../util/dateHelper";

export default class DigitalClock extends React.PureComponent {
    static propTypes = {
        fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        time: PropTypes.string,
        date: PropTypes.object,
    };

    static defaultProps = {
        fontSize: '1.7rem'
    };

    convertDateToTime(date) {
        return `${datePartFormatter(date.getHours())}:${datePartFormatter(date.getMinutes())}:${datePartFormatter(date.getSeconds())}`;
    }

    render() {
        const {time, date, fontSize} = this.props;
        return (
            <div className="outer" style={{fontSize}}>
                <div className="inner justifyCenter flexColumn">
                    <div className="most-inner">
                        <span className='time'>{time || this.convertDateToTime(date)}</span>
                    </div>
                </div>
            </div>
        );
    }
}

