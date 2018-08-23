import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import FaTimesCircle from "react-icons/lib/fa/times-circle";

export default class Modal extends React.PureComponent {

    static propTypes = {
        shouldRender: PropTypes.bool,
        content: PropTypes.node,
        children: PropTypes.node,
        onExitClick: PropTypes.func,
        renderExit: PropTypes.bool,
    };

    static defaultProps = {
        shouldRender: true,
        renderExit: true,
    };

    render() {
        const {shouldRender, content, children, onExitClick, renderExit} = this.props;
        if (!shouldRender) {
            return null;
        }
        return <div className='modalContainer'>
            <div onClick={onExitClick} className='modalBackground'/>
            <div className='modal'>
                {renderExit &&
                <div className='right pointer'><FaTimesCircle onClick={onExitClick} size={30}/></div>}
                <div className='modalContent'>
                    {content}
                    {children}
                </div>
            </div>
        </div>
    }
}
