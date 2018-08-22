import React from 'react';
import './styles.css';
import PropTypes from "prop-types";

export default class Menu extends React.PureComponent {

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
    };

    render() {
        const {children, className} = this.props;
        return  <div className={`menu inlineBlock relative ${className}`}>
            <div className='absoluteBackgroundMix menuBackground'/>
                {children}
        </div>;
    }

}
