import React from 'react';
import {isRepValueCode1} from "../util/repositoryHelper";
import {PROFILE_ROUTE, SHOP_ROUTE} from "../content/routes";
import {push} from 'connected-react-router'
import _ from 'lodash';
import {buyBookIdChanged} from "../redux/reducer/shop";
import {claimRewardBookIdChanged, startReadBookIdChanged} from "../redux/reducer/profile";
import {blockUntilRepFulfilled, logBot} from "./botHelper";


export async function manageBooks(bot) {
    logBot('start manage books');
    await maybeClaimBookReward(bot);
    bot.rootRoute();
    const isReadingBook = await maybeReadBook(bot);
    if (!isReadingBook) {
        const boughtBook = await maybeBuyBook(bot);
        if (boughtBook) {
            await maybeReadBook(bot);
        }
    }
    logBot('end manage books');
    bot.rootRoute();
}

async function maybeClaimBookReward(bot) {
    logBot('maybeClaimBookReward', 'go route /profile');
    bot.dispatch(push(PROFILE_ROUTE));
    logBot('maybeClaimBookReward', 'blockUntilRepFulfilled', 'profileListBook');
    await blockUntilRepFulfilled(() => bot.redux.repository.profileListBook);
    const profileBooks = bot.redux.repository.profileListBook.value;
    const booksForClaimReward = profileBooks.filter(e => e.canClaimReward);
    if (_.isEmpty(booksForClaimReward)) {
        logBot('maybeClaimBookReward', 'no books for reward', false);
        return false;
    }
    for (let i = 0; i < booksForClaimReward.length; i++) {
        const book = booksForClaimReward[i];
        bot.dispatch(claimRewardBookIdChanged(book.id));
        logBot('maybeClaimBookReward', 'blockUntilRepFulfilled', 'profileClaimRewardBook');
        await blockUntilRepFulfilled(() => bot.redux.repository.profileClaimRewardBook);
    }
    logBot('maybeClaimBookReward', 'claimed reward from', booksForClaimReward, true);
    return true;
}

async function maybeReadBook(bot) {
    logBot('maybeReadBook', 'go route /profile');
    bot.dispatch(push(PROFILE_ROUTE));
    logBot('maybeReadBook', 'blockUntilRepFulfilled', 'profileListBook');
    await blockUntilRepFulfilled(() => bot.redux.repository.profileListBook);
    const profileBooks = bot.redux.repository.profileListBook.value;
    logBot('maybeReadBook', 'profile books', profileBooks);
    if (_.isEmpty(profileBooks)) {
        logBot('maybeReadBook', 'no books => no read', false);
        return false;
    }
    if (isReading(bot)) {
        logBot('maybeReadBook', 'already reading', true);
        return true;
    }
    bot.dispatch(startReadBookIdChanged(_.last(profileBooks).id));
    logBot('maybeReadBook', 'blockUntilRepFulfilled', 'profileStartReadBook');
    await blockUntilRepFulfilled(() => bot.redux.repository.profileStartReadBook);
    const result = isRepValueCode1(bot.redux.repository.profileStartReadBook);
    logBot('maybeReadBook', 'reading?', result);
    return result;
}

function isReading(bot) {
    return _.some(bot.redux.repository.profileListBook.value, 'isInProgress');
}

async function maybeBuyBook(bot) {
    logBot('buyBook', 'go route /shop');
    bot.dispatch(push(SHOP_ROUTE));
    await blockUntilRepFulfilled(() => bot.redux.repository.shopListBook);
    const books = bot.redux.repository.shopListBook.value;
    const profile = bot.redux.profile.profile;
    const booksToBuy = books.filter(e => (e.canBuyByCrystal && e.crystalCost <= profile.crystal) || (e.canBuyByGold && e.goldCost <= profile.gold));
    logBot('shopBooks', books, 'booksToBuy', booksToBuy);
    if (_.isEmpty(booksToBuy)) {
        logBot('shopBooks', 'cant buy book', false);
        return false;
    }
    bot.dispatch(buyBookIdChanged(_.last(booksToBuy).id));
    await blockUntilRepFulfilled(() => bot.redux.repository.shopBuyBook);
    const result = isRepValueCode1(bot.redux.repository.shopBuyBook);
    logBot('buyBook', 'bounght?', result);
    return result;
}

