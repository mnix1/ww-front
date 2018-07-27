import React from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import './styles.css';
import {CREAME_COLOR, GREEN_COLOR} from "../../util/style/constant";

export class Button extends React.PureComponent {

    static propTypes = {
        material: PropTypes.object,
        onClick: PropTypes.func,
        style: PropTypes.object,
        icon: PropTypes.node,
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    };

    static defaultProps = {
        material: BUTTON_MATERIAL_ACCEPT,
        onClick: _.noop,
    };

    render() {
        const {onClick, children, icon, style, material} = this.props;
        return <div className='button pointer' onClick={onClick} style={{...material, ...style}}>
            <div className='content'>{children}{icon && <div className='icon'>{icon}</div>}</div>

        </div>
    }
}

export const BUTTON_MATERIAL_ACCEPT = {
    background: GREEN_COLOR,
    boxShadow: '0 0 4px',
    color: CREAME_COLOR
};
export const BUTTON_MATERIAL_BOX_SHADOW = {
    boxShadow: '0 0 4px',
    color: CREAME_COLOR
};