import React from 'react';
import PropTypes from "prop-types";
import {ORANGE_COLOR} from "../../util/style/constant";
import cn from 'classnames';

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
        imgSrc: PropTypes.string,
        notEnough: PropTypes.bool,
        column: PropTypes.bool,
        margin: PropTypes.bool,
        stylePadding: PropTypes.bool,
        className: PropTypes.string,
        styleBoxShadow: PropTypes.bool
    };

    static defaultProps = {
        size: RESOURCE_SMALL,
        notEnough: false,
        column: true,
        margin: true,
        stylePadding: true,
        styleBoxShadow: true,
    };

    renderColumn(style) {
        const {children, imgSrc, size} = this.props;
        return <div className='justifyCenter flexColumn' style={style}>
            <img alt='' src={imgSrc} height={IMG_HEIGHT[size]}/>
            <div className='justifyCenter'>{children}</div>
        </div>
    }

    renderRow(style) {
        const {children, imgSrc, size} = this.props;
        return <div className='justifyCenter' style={style}>
            <div className='justifyCenter flexColumn'>{children}</div>
            <div className='justifyCenter flexColumn'><img alt='' src={imgSrc} height={IMG_HEIGHT[size]}/></div>
        </div>
    }

    render() {
        const {notEnough, size, column, styleBoxShadow, margin, stylePadding, className} = this.props;
        const customClassName = cn('inlineBlock fontSize08Rem relative', {
            [className]: className,
            'marginRem': margin,
            'paddingRem': stylePadding,
            'boxShadow': styleBoxShadow,
            [size]: size
        });
        const style = notEnough ? {color: ORANGE_COLOR} : undefined;
        return <div className={customClassName}>
            <div className='justifyCenter'>
                {column ? this.renderColumn(style) : this.renderRow(style)}
            </div>
        </div>
    }
}
