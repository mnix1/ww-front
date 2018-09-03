import {connect} from "react-redux";
import React from "react";
import PropTypes from 'prop-types';
import mesh3 from '../../media/image/background/mesh3.svg';
import mesh4 from '../../media/image/background/mesh4.svg';
import mesh10 from '../../media/image/background/mesh10.svg';
import mesh7 from '../../media/image/background/mesh7.svg';

export const MESH_1 = 'MESH_1';
export const MESH_2 = 'MESH_2';
export const MESH_3 = 'MESH_3';
export const MESH_4 = 'MESH_4';

const MESHES = {
    [MESH_1]: mesh3,
    [MESH_2]: mesh4,
    [MESH_3]: mesh10,
    [MESH_4]: mesh7,
};

class MeshBackground extends React.PureComponent {

    static propTypes = {
        mesh: PropTypes.string,
        screen: PropTypes.object,
    };
    static defaultProps = {
        mesh: MESH_2,
    };

    render() {
        const {screen, mesh} = this.props;
        return <div className='absoluteBackgroundMix' style={{opacity: 1}}>
            <img className='borderRadiusRem' style={{objectFit: 'cover'}} src={MESHES[mesh]} height={screen.contentHeight}
                 width={screen.contentWidth}/>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(MeshBackground);
