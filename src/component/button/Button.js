import React from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import {
    CREAM_COLOR,
    GREEN_COLOR,
    LIGHT_BLUE_COLOR,
    maybeDisabledClassName,
    ORANGE_COLOR,
    RED_COLOR
} from "../../util/style/constant";


export const BUTTON_MATERIAL_ACCEPT = {
    background: GREEN_COLOR,
    boxShadow: '0 0 4px',
    color: CREAM_COLOR
};
export const BUTTON_MATERIAL_DANGER = {
    background: RED_COLOR,
    boxShadow: '0 0 4px',
    color: CREAM_COLOR
};
export const BUTTON_MATERIAL_NORMAL = {
    background: LIGHT_BLUE_COLOR,
    boxShadow: '0 0 4px',
    color: CREAM_COLOR
};
export const BUTTON_MATERIAL_WARNING = {
    background: ORANGE_COLOR,
    boxShadow: '0 0 4px',
    color: CREAM_COLOR
};
export const BUTTON_MATERIAL_BOX_SHADOW = {
    boxShadow: '0 0 4px',
    color: CREAM_COLOR
};

export class Button extends React.PureComponent {

    static propTypes = {
        material: PropTypes.object,
        onClick: PropTypes.func,
        style: PropTypes.object,
        icon: PropTypes.node,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        padding: PropTypes.bool,
        iconMarginLeft: PropTypes.bool,
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    };

    static defaultProps = {
        material: BUTTON_MATERIAL_ACCEPT,
        disabled: false,
        className: '',
        padding: true,
        iconMarginLeft: true,
        onClick: _.noop,
    };

    render() {
        const {onClick, children, icon, style, material, className, disabled, padding, iconMarginLeft} = this.props;
        return <div
            className={`${maybeDisabledClassName(disabled)} button borderRadiusRem ${padding ? 'paddingRem' : ''} inlineBlock pointer ${className}`}
            onClick={disabled ? _.noop : onClick}
            style={{...material, ...style}}>
            <div className='content flex'>{children}{icon &&
            <div className={`icon ${iconMarginLeft ? 'marginLeftRem' : ''} justifyCenter flexColumn`}>{icon}</div>}</div>
        </div>
    }
}