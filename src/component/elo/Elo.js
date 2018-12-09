import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import trophy from "../../media/image/icon/trophy.svg";

export default class Elo extends React.PureComponent {

    static propTypes = {
        elo: PropTypes.number,
        className: PropTypes.string,
        styleMargin: PropTypes.bool,
        stylePadding: PropTypes.bool,
        style: PropTypes.object,
        imgHeight: PropTypes.number
    };

    static defaultProps = {
        styleMargin: false,
        stylePadding: false,
        imgHeight: 30,
    };

    render() {
        const {styleMargin, stylePadding, className, elo, style, imgHeight} = this.props;
        const customClassName = cn('justifyCenter', {
            [className]: className,
            'marginRem': styleMargin,
            'paddingRem': stylePadding,
        });
        return <div className={customClassName}>
            <div className='justifyCenter flexColumn' style={style}>{elo}</div>
            <div className='justifyCenter flexColumn'>
                <img draggable="false" className='paddingLeftRem' alt='' src={trophy} height={imgHeight}/>
            </div>
        </div>;
    }
}