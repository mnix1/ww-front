import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {getRouteLabel} from "../../lang/langRoute";

export default class MenuItem extends React.PureComponent {

    static propTypes = {
        imgSrc: PropTypes.string,
        iconWidth: PropTypes.number,
        iconHeight: PropTypes.number,
        onClick: PropTypes.func,
        className: PropTypes.string,
        route: PropTypes.string,
        lang: PropTypes.string,
    };

    static defaultProps = {
        className: ''
    };

    render() {
        const {iconWidth, iconHeight, onClick, imgSrc, route, className} = this.props;
        return <div key={route} onClick={() => onClick(route)}
                    className={`menuItem flexColumn flex marginRem relative pointer ${className}`}
                    style={{fontSize: '0.9rem'}}>
            <img className='marginWidthAuto' alt='' src={imgSrc} width={iconWidth} height={iconHeight}/>
            <div className='justifyCenter flexColumn marginAuto'>
                <span className='textAlignCenter width100'>{getRouteLabel(route)}</span>
            </div>
        </div>
    }

}
