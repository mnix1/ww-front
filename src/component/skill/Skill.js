import React from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';
import _ from 'lodash';
import {ORANGE_COLOR} from "../../util/style/constant";

export default class Skill extends React.PureComponent {

    static propTypes = {
        children: PropTypes.node,
        imgSrc: PropTypes.string,
        imgHeight: PropTypes.number,
        column: PropTypes.bool,
        margin: PropTypes.bool,
        onClick: PropTypes.func,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        used: PropTypes.bool,
    };

    static defaultProps = {
        onClick: _.noop,
        disabled: false,
        used: false,
        column: true,
        margin: true,
    };

    get childrenStyle() {
        const {used} = this.props;
        return used ? {color: ORANGE_COLOR} : undefined;
    }

    renderColumn() {
        const {children, imgSrc, imgHeight} = this.props;
        return <div className='justifyCenter flexColumn'>
            <img alt='' src={imgSrc} height={imgHeight}/>
            <div className='justifyCenter' style={this.childrenStyle}>{children}</div>
        </div>
    }

    renderRow() {
        const {children, imgSrc, imgHeight} = this.props;
        return <div className='justifyCenter'>
            <div className='justifyCenter flexColumn' style={this.childrenStyle}>{children}</div>
            <div className='justifyCenter flexColumn'><img alt='' src={imgSrc} height={imgHeight}/></div>
        </div>
    }

    render() {
        const {size, column, margin, className, onClick, disabled} = this.props;
        const customClassName = cn('inlineBlock fontSize08Rem relative pointer', {
            [className]: className,
            'marginLeftRem marginRightRem': margin,
            [size]: size,
            disabled,
        });
        return <div className={customClassName} onClick={disabled ? _.noop : onClick}>
            <div className='justifyCenter'>
                {column ? this.renderColumn() : this.renderRow()}
            </div>
        </div>
    }
}
