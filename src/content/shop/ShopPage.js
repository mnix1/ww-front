import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import AvailableResources from "../../component/resource/AvailableResources";
import ShopPageBook from "./ShopPageBook";

class ShopPage extends React.PureComponent {

    renderContent() {
        return <div>
            <AvailableResources/>
            <ShopPageBook/>
        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className='page shopPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <div className='pageBackground absoluteBackgroundMix'/>
            <div className='pageContent overflowAuto'>
                {this.renderContent()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({})
)(ShopPage);
