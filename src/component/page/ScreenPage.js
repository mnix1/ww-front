import React from 'react';
import './styles.css';
import connect from "react-redux/es/connect/connect";
import MeshBackground from "../background/MeshBackground";
import PropTypes from 'prop-types';

class ScreenPage extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        contentClassName: PropTypes.string,
        children: PropTypes.node,
        customContent: PropTypes.bool,
        mesh: PropTypes.string
    };

    static defaultProps = {
        className: '',
        contentClassName: ''
    };

    renderContent() {
        const {contentClassName, children} = this.props;
        return <div className={`pageContent overflowAuto ${contentClassName}`}>
            {children}
        </div>;
    }

    render() {
        const {className, children, customContent, screen, mesh} = this.props;
        return <div className={`page ${className}`} style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <MeshBackground mesh={mesh}/>
            {customContent ? children : this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(ScreenPage);
