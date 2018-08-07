import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {SHOP_ROUTE} from "../../routes";

class ShopListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearShopListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, dispatchShopListGet} = this.props;
        if (path === SHOP_ROUTE && prevProps.path !== path) {
            dispatchShopListGet();
        }
    }

    render() {
        return null;
    }
}

export function clearShopListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'shopList'}});
}

export default connect([{
    resource: 'shopList',
    request: () => ({
        url: `/shop/list`,
    })
}])(ShopListFetch);