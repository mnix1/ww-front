import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {FaTimesCircle} from "react-icons/fa";

export default class Modal extends React.PureComponent {

    static propTypes = {
        shouldRender: PropTypes.bool,
        content: PropTypes.node,
        children: PropTypes.node,
        header: PropTypes.node,
        onExitClick: PropTypes.func,
        renderExit: PropTypes.bool,
        className: PropTypes.string,
        exitClassName: PropTypes.string,
    };

    static defaultProps = {
        shouldRender: true,
        renderExit: true,
        className: '',
        exitClassName: '',
    };

    render() {
        const {shouldRender, content, children, onExitClick, header, renderExit, className, exitClassName} = this.props;
        if (!shouldRender) {
            return null;
        }
        return <div className='modalContainer'>
            <div onClick={onExitClick} className='modalBackground'/>
            <div className={`modal ${className}`}>
                {header}
                {renderExit &&
                <div className={`right pointer ${exitClassName}`}><FaTimesCircle onClick={onExitClick} size={30}/></div>}
                <div className='modalContent'>
                    {content}
                    {children}
                </div>
            </div>
        </div>
    }
}
