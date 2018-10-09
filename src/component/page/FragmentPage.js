import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

export default class FragmentPage extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        contentClassName: PropTypes.string,
        children: PropTypes.node,
        customContent: PropTypes.bool
    };

    static defaultProps = {
        className: '',
        contentClassName: ''
    };

    renderContent() {
        const {contentClassName, children} = this.props;
        return <div className={`pageContent ${contentClassName}`}>
            {children}
        </div>;
    }

    render() {
        const {className, children, customContent} = this.props;
        return <div className={`page ${className}`}>
            <div className='pageBackground absoluteBackgroundMix'/>
            {customContent ? children : this.renderContent()}
        </div>;
    }
}