import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {RED_COLOR} from "../../util/style/constant";

export const RESOURCE_VERY_SMALL = 'resourceVerySmall';
export const RESOURCE_SMALL = 'resourceSmall';
export const RESOURCE_BIG = 'resourceBig';

export const IMG_HEIGHT = {
    [RESOURCE_VERY_SMALL]: 15,
    [RESOURCE_SMALL]: 30,
    [RESOURCE_BIG]: 50,
};

export default class Resource extends React.PureComponent {

    static propTypes = {
        children: PropTypes.node,
        size: PropTypes.string,
        notEnough: PropTypes.bool
    };

    static defaultProps = {
        size: RESOURCE_SMALL,
        notEnough: false,
    };

    render() {
        const {notEnough, children, imgSrc, size} = this.props;
        const className = `resource inlineBlock marginRem relative ${size}`;
        const style = notEnough ? {color: RED_COLOR} : undefined;
        return <div className={className}>
            <div className='pageCenterHorizontal'>
                <div className='pageCenterVertical' style={style}>
                    <img alt='' src={imgSrc} height={IMG_HEIGHT[size]}/>
                    {children}
                </div>
            </div>
        </div>
    }
}
