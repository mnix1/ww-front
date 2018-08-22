import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {getRouteLabel} from "../../lang";

export default class MenuItem extends React.PureComponent {

    static propTypes = {
        imgSrc: PropTypes.string,
        iconWidth: PropTypes.number,
        iconHeight: PropTypes.number,
        onClick: PropTypes.func,
    };

    render() {
         const {iconWidth, iconHeight, onClick, imgSrc, route} = this.props;
        return <div key={route} onClick={() => onClick(route)} className='menuItem flexColumn flex marginRem relative pointer'>
            <img alt='' src={imgSrc} width={iconWidth} height={iconHeight}/><span className='textAlignCenter width100'>{getRouteLabel(route)}</span>
        </div>
    }

}
