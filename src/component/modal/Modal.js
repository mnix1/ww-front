import React from 'react';
import './styles.css';
import PropTypes from "prop-types";

export default class Modal extends React.PureComponent {

    static propTypes = {
        shouldRender: PropTypes.bool,
        content: PropTypes.node,
    };

    static defaultProps = {
        shouldRender: true
    };

    render() {
        const {shouldRender, content} = this.props;
        if (!shouldRender) {
            return null;
        }
        return <div className='modalContainer'>
            <div className='modalBackground'/>
            <div className='modal'>
                {content}
            </div>
        </div>
    }
}
