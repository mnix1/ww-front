import React from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import './styles.css';

export class Button extends React.PureComponent {

    static propTypes = {
        onClick: PropTypes.func,
        style: PropTypes.object,
        icon: PropTypes.node,
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    };

    static defaultProps = {
        onClick: _.noop,
    };

    render() {
        const {onClick, children, icon, style} = this.props;
        return <div className='button pointer' onClick={onClick} style={style}>
            <div className='content'>{children}</div>
            {icon && <div className='icon'>{icon}</div>}
        </div>
    }
}
