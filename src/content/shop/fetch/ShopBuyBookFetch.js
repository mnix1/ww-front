import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {SHOP_ROUTE} from "../../routes";
import _ from 'lodash';
import {buyBookIdChanged} from "../../../redux/reducer/shop";

class ShopBuyBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {shopBuyBookFetch, dispatch, bookId} = this.props;
        if (shopBuyBookFetch.fulfilled && bookId !== undefined) {
            dispatch(buyBookIdChanged(undefined));
        }
    }

    componentWillUnmount() {
        clearShopBuyBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, bookId, dispatchShopBuyBookPost} = this.props;
        if (path === SHOP_ROUTE
            && !_.isNil(bookId)
            && (prevProps.path !== path || prevProps.bookId !== bookId)) {
            dispatchShopBuyBookPost(bookId);
        }
    }

    render() {
        return null;
    }
}

export function clearShopBuyBookFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'shopBuyBook'}});
}

export default connect([{
    method: 'post',
    resource: 'shopBuyBook',
    request: (id) => ({
        url: `/shop/buyBook`,
        body: {id}
    })
}])(ShopBuyBookFetch);