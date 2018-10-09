import React from 'react';
import './styles.css';
import connect from "react-redux/es/connect/connect";
import MeshBackground, {MESH_4} from "../background/MeshBackground";
import PropTypes from 'prop-types';

class FullScreenPage extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        contentClassName: PropTypes.string,
        children: PropTypes.node,
        customContent: PropTypes.bool
        // height: PropTypes.number,
        // width: PropTypes.number,
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
        const {className, children, customContent, screen} = this.props;
        const style = {
            height: screen.isSmallHeight ? screen.height : screen.contentHeight,
            width: screen.isSmallHeight ? screen.width : screen.contentWidth,
        };
        return <div className={`page ${className} overflowHidden`} style={style}>
            <MeshBackground mesh={MESH_4} fullScreen={screen.isSmallHeight}/>
            {customContent ? children : this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(FullScreenPage);
