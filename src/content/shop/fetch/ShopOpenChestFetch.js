import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {SHOP_ROUTE} from "../../routes";
import _ from 'lodash';

class ShopOpenChestFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearShopOpenChestFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, openChestId, dispatchShopOpenChestPost} = this.props;
        if (path === SHOP_ROUTE
            && !_.isNil(openChestId)
            && (prevProps.path !== path || prevProps.openChestId !== openChestId)) {
            dispatchShopOpenChestPost(openChestId);
        }
    }

    render() {
        return null;
    }
}

export function clearShopOpenChestFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'shopOpenChest'}});
}

export default connect([{
    method: 'post',
    resource: 'shopOpenChest',
    request: (id) => ({
        url: `/shop/open`,
        body: {id}
    })
}])(ShopOpenChestFetch);