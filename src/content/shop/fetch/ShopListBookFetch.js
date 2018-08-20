import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {SHOP_ROUTE} from "../../routes";

class ShopListBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearShopListBooksFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, dispatchShopListBookGet} = this.props;
        if (path === SHOP_ROUTE && prevProps.path !== path) {
            dispatchShopListBookGet();
        }
    }

    render() {
        return null;
    }
}

export function clearShopListBooksFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'shopListBook'}});
}

export default connect([{
    resource: 'shopListBook',
    request: () => ({
        url: `/shop/listBook`,
    })
}])(ShopListBookFetch);