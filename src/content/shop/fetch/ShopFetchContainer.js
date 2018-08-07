import React from 'react';
import {connect} from 'react-redux';
import ShopListFetch from "./ShopListFetch";
import ShopOpenChestFetch from "./ShopOpenChestFetch";

class ShopFetchContainer extends React.PureComponent {
    componentDidUpdate() {
    }

    render() {
        const {path, openChestId} = this.props;
        return <div>
            <ShopListFetch path={path}/>
            <ShopOpenChestFetch path={path} openChestId={openChestId}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        openChestId: state.shop.openChestId,
        path: state.router.location.pathname,
        shopListRep: state.repository.shopList,
    }),
    (dispatch) => ({})
)(ShopFetchContainer);
