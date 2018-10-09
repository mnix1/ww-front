import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE, SHOP_ROUTE} from "../../routes";
import _ from 'lodash';
import {buyBookIdChanged} from "../../../redux/reducer/shop";
import {clearProfileFetch} from "../../app/fetch/ProfileFetch";
import {noticeBuy} from "../../../component/notification/noticeBuy";
import {isRepValueCode1} from "../../../util/repositoryHelper";
import {push} from 'connected-react-router';

class ShopBuyBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {shopBuyBookFetch, dispatch, bookId} = this.props;
        if (!prevProps.shopBuyBookFetch.fulfilled && shopBuyBookFetch.fulfilled && bookId !== undefined) {
            dispatch(buyBookIdChanged(undefined));
            if (isRepValueCode1(shopBuyBookFetch)) {
                noticeBuy(shopBuyBookFetch.value.bookType, () => dispatch(push(PROFILE_ROUTE)));
                clearProfileFetch(dispatch);
            }
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