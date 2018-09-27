import {connect} from "react-redux";
import React from "react";
import PropTypes from 'prop-types';
import mesh4 from '../../media/image/background/mesh4.svg';
import mesh7 from '../../media/image/background/mesh7.svg';

export const MESH_2 = 'MESH_2';
export const MESH_4 = 'MESH_4';

const MESHES = {
    [MESH_2]: mesh4,
    [MESH_4]: mesh7,
};

class MeshBackground extends React.PureComponent {

    static propTypes = {
        mesh: PropTypes.string,
        screen: PropTypes.object,
        fullScreen: PropTypes.bool,
    };
    static defaultProps = {
        mesh: MESH_2,
        fullScreen: false,
    };

    render() {
        const {screen, mesh, fullScreen} = this.props;
        const style = {
            objectFit: 'cover',
            height: fullScreen ? screen.height : screen.contentHeight,
            width: fullScreen ? screen.width : screen.contentWidth
        };
        return <div className='absoluteBackgroundMix' style={{opacity: 1}}>
            <img alt='' className={fullScreen ? '' : 'borderRadiusRem'}
                 style={style}
                 src={MESHES[mesh]}
            />
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(MeshBackground);
