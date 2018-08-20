import React from 'react';
import {connect} from 'react-redux';
import ShopListBooksFetch from "./ShopListBookFetch";

class ShopFetchContainer extends React.PureComponent {
    componentDidUpdate() {
    }

    render() {
        const {path} = this.props;
        return <div>
            <ShopListBooksFetch path={path}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        shopListRep: state.repository.shopList,
    }),
    (dispatch) => ({})
)(ShopFetchContainer);
