import React from 'react';
import {connect} from "react-redux";
import {isCode1, isRepValueCode1, repFulfilled} from "../util/repositoryHelper";
import {APP_ROUTE, PROFILE_ROUTE, SHOP_ROUTE} from "../content/routes";
import {push} from 'connected-react-router'
import _ from 'lodash';
import {buyBookIdChanged} from "../redux/reducer/shop";
import {claimRewardBookIdChanged, startReadBookIdChanged} from "../redux/reducer/profile";

function log() {
    console.log('Bot', ...arguments);
}

function blockUntilRepFulfilled(repGetter) {
    log('blockUntilRepFulfilled', 'init', repGetter());
    let time = 0;
    const timeout = 5000;
    const interval = 500;
    const invokeIfFulfilled = (resolve, reject, func) => {
        setTimeout(() => {
            time += interval;
            if (time > timeout) {
                log('blockUntilRepFulfilled', 'reject');
                reject();
                return;
            }
            if (repFulfilled(repGetter())) {
                log('blockUntilRepFulfilled', 'resolve', repGetter());
                resolve();
            } else {
                if (time <= interval) {
                    log('blockUntilRepFulfilled', 'wait', repGetter());
                }
                func(resolve, reject, func);
            }
        }, interval);
    };
    return new Promise(function (resolve, reject) {
        invokeIfFulfilled(resolve, reject, invokeIfFulfilled);
    });
}

class Bot extends React.Component {
    componentDidMount() {
        setTimeout(() => this.start(), 1000);
    }

    shouldComponentUpdate() {
        return false;
    }

    get dispatch() {
        return this.props.dispatch;
    }

    get redux() {
        return this.props.redux;
    }

    async start() {
        this.auth();
        this.manageBooks();
    }

    rootRoute() {
        log('go route /');
        this.dispatch(push(APP_ROUTE));
    }

    async auth() {
        if (!_.isNil(this.redux.profile.profile)) {
            log('auth', 'auth done');
            return Promise.resolve();
        }
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + Buffer.from(this.props.user + ":" + this.props.pass).toString('base64'));
        const result = await fetch('/bot/auth', {
            method: 'GET',
            headers: headers,
        }).then(response => response.json());
        if (isCode1(result)) {
            window.location.reload(true);
        } else {
            log('auth', 'auth failed');
        }
    }

    async manageBooks() {
        await this.maybeClaimBookReward();
        this.rootRoute();
        const isReadingBook = await this.maybeReadBook();
        if (!isReadingBook) {
            const boughtBook = await this.maybeBuyBook();
            if (boughtBook) {
                await this.maybeReadBook();
            }
        }
        log('end manage books')
        this.rootRoute();
    }

    async maybeClaimBookReward() {
        log('maybeClaimBookReward', 'go route /profile');
        this.dispatch(push(PROFILE_ROUTE));
        log('maybeClaimBookReward', 'blockUntilRepFulfilled', 'profileListBook');
        await blockUntilRepFulfilled(() => this.redux.repository.profileListBook);
        const profileBooks = this.redux.repository.profileListBook.value;
        const booksForClaimReward = profileBooks.filter(e => e.canClaimReward);
        if (_.isEmpty(booksForClaimReward)) {
            log('maybeClaimBookReward', 'no books for reward', false);
            return false;
        }
        for (let i = 0; i < booksForClaimReward.length; i++) {
            const book = booksForClaimReward[i];
            this.dispatch(claimRewardBookIdChanged(book.id));
            log('maybeClaimBookReward', 'blockUntilRepFulfilled', 'profileClaimRewardBook');
            await blockUntilRepFulfilled(() => this.redux.repository.profileClaimRewardBook);
        }
        log('maybeClaimBookReward', 'claimed reward from', booksForClaimReward, true);
        return true;
    }

    async maybeReadBook() {
        log('maybeReadBook', 'go route /profile');
        this.dispatch(push(PROFILE_ROUTE));
        log('maybeReadBook', 'blockUntilRepFulfilled', 'profileListBook');
        await blockUntilRepFulfilled(() => this.redux.repository.profileListBook);
        const profileBooks = this.redux.repository.profileListBook.value;
        log('maybeReadBook', 'profile books', profileBooks);
        if (_.isEmpty(profileBooks)) {
            log('maybeReadBook', 'no books => no read', false);
            return false;
        }
        if (this.isReading()) {
            log('maybeReadBook', 'already reading', true);
            return true;
        }
        this.dispatch(startReadBookIdChanged(_.last(profileBooks).id));
        log('maybeReadBook', 'blockUntilRepFulfilled', 'profileStartReadBook');
        await blockUntilRepFulfilled(() => this.redux.repository.profileStartReadBook);
        const result = isRepValueCode1(this.redux.repository.profileStartReadBook);
        log('maybeReadBook', 'reading?', result);
        return result;
    }

    isReading() {
        return _.some(this.redux.repository.profileListBook.value, 'isInProgress');
    }

    async maybeBuyBook() {
        log('buyBook', 'go route /shop');
        this.dispatch(push(SHOP_ROUTE));
        await blockUntilRepFulfilled(() => this.redux.repository.shopListBook);
        const books = this.redux.repository.shopListBook.value;
        const profile = this.redux.profile.profile;
        const booksToBuy = books.filter(e => (e.canBuyByCrystal && e.crystalCost <= profile.crystal) || (e.canBuyByGold && e.goldCost <= profile.gold));
        console.log('shopBooks', books, 'booksToBuy', booksToBuy);
        if (_.isEmpty(booksToBuy)) {
            console.log('shopBooks', 'cant buy book', false);
            return false;
        }
        this.dispatch(buyBookIdChanged(_.last(booksToBuy).id));
        await blockUntilRepFulfilled(() => this.redux.repository.shopBuyBook);
        const result = isRepValueCode1(this.redux.repository.shopBuyBook);
        log('buyBook', 'bounght?', result);
        return result;
    }

    render() {
        return null;
    }
}

export default connect(
    (state) => ({
        redux: state,
    }),
    (dispatch) => ({
        dispatch,
    })
)(Bot);
