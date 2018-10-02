import React from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';
import _ from 'lodash';

export const SKILL_VERY_SMALL = 'resourceVerySmall';
export const SKILL_SMALL = 'resourceSmall';
export const SKILL_BIG = 'resourceBig';

export const IMG_HEIGHT = {
    [SKILL_VERY_SMALL]: 15,
    [SKILL_SMALL]: 30,
    [SKILL_BIG]: 50,
};

export default class Skill extends React.PureComponent {

    static propTypes = {
        children: PropTypes.node,
        size: PropTypes.string,
        imgSrc: PropTypes.string,
        column: PropTypes.bool,
        margin: PropTypes.bool,
        onClick: PropTypes.func,
        className: PropTypes.string,
    };

    static defaultProps = {
        size: SKILL_SMALL,
        onClick: _.noop,
        column: true,
        margin: true,
    };

    renderColumn() {
        const {children, imgSrc, size} = this.props;
        return <div className='justifyCenter flexColumn'>
            <img alt='' src={imgSrc} height={IMG_HEIGHT[size]}/>
            <div className='justifyCenter'>{children}</div>
        </div>
    }

    renderRow() {
        const {children, imgSrc, size} = this.props;
        return <div className='justifyCenter'>
            <div className='justifyCenter flexColumn'>{children}</div>
            <div className='justifyCenter flexColumn'><img alt='' src={imgSrc} height={IMG_HEIGHT[size]}/></div>
        </div>
    }

    render() {
        const {size, column, margin, className, onClick} = this.props;
        const customClassName = cn('inlineBlock fontSize08Rem relative pointer', {
            [className]: className,
            'marginRem': margin,
            [size]: size
        });
        return <div className={customClassName} onClick={onClick}>
            <div className='justifyCenter'>
                {column ? this.renderColumn() : this.renderRow()}
            </div>
        </div>
    }
}
