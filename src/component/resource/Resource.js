import React from 'react';
import './styles.css';
import PropTypes from "prop-types";

export const RESOURCE_SMALL = 'resourceSmall';
export const RESOURCE_BIG = 'resourceBig';

export const IMG_HEIGHT = {
    [RESOURCE_SMALL]: 30,
    [RESOURCE_BIG]: 50,
};

export default class Resource extends React.PureComponent {

    static propTypes = {
        children: PropTypes.node,
        size: PropTypes.string,
    };

    static defaultProps = {
        size: RESOURCE_SMALL,
    };

    render() {
        const {children, imgSrc, size} = this.props;
        const className = `resource ${size}`;
        return <div className={className}>
            <div className='pageCenterHorizontal'>
                <div className='pageCenterVertical'>
                    <img alt='' src={imgSrc} height={IMG_HEIGHT[size]}/>
                    {children}
                </div>
            </div>
        </div>
    }
}
