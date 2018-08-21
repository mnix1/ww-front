import React from 'react';
import {connect} from 'react-redux';
import ShopListBookFetch from "./ShopListBookFetch";
import ShopBuyBookFetch from "./ShopBuyBookFetch";

class ShopFetchContainer extends React.PureComponent {
    componentDidUpdate() {
    }

    render() {
        const {path, buyBookId} = this.props;
        return <div>
            <ShopListBookFetch path={path}/>
            <ShopBuyBookFetch path={path} bookId={buyBookId}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        buyBookId: state.shop.buyBookId,
        shopListRep: state.repository.shopList,
    }),
    (dispatch) => ({})
)(ShopFetchContainer);
