import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {getText, TEXT_POINTS} from "../../lang/langText";
import trophy from "../../media/image/icon/trophy.svg";

export default class Elo extends React.PureComponent {

    static propTypes = {
        elo: PropTypes.number,
        className: PropTypes.string,
        styleMargin: PropTypes.bool,
        stylePadding: PropTypes.bool,
        style: PropTypes.object
    };

    static defaultProps = {
        styleMargin: false,
        stylePadding: false,
    };

    render() {
        const {styleMargin, stylePadding, className, elo, style} = this.props;
        const customClassName = cn('justifyCenter', {
            [className]: className,
            'marginRem': styleMargin,
            'paddingRem': stylePadding,
        });
        return <div className={customClassName}>
            <div className='justifyCenter flexColumn' style={style}>{elo}</div>
            <div className='justifyCenter flexColumn'>
                <img className='paddingLeftRem' alt={getText(TEXT_POINTS)} src={trophy} height={30}/>
            </div>
        </div>;
    }
}