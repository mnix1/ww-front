import React from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import './styles.css';
import {CREAM_COLOR, GREEN_COLOR, LIGHT_BLUE_COLOR, ORANGE_COLOR, RED_COLOR} from "../../util/style/constant";

export class Button extends React.PureComponent {

    static propTypes = {
        material: PropTypes.object,
        onClick: PropTypes.func,
        style: PropTypes.object,
        icon: PropTypes.node,
        className: PropTypes.string,
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    };

    static defaultProps = {
        material: BUTTON_MATERIAL_ACCEPT,
        onClick: _.noop,
    };

    render() {
        const {onClick, children, icon, style, material, className} = this.props;
        return <div className={`button pointer ${className}`} onClick={onClick} style={{...material, ...style}}>
            <div className='content'>{children}{icon && <div className='icon justifyCenter flexColumn'>{icon}</div>}</div>
        </div>
    }
}

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