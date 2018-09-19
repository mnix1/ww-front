import {isRepValueCode1} from "../util/repositoryHelper";
import {PROFILE_ROUTE, SHOP_ROUTE} from "../content/routes";
import {push} from 'connected-react-router'
import _ from 'lodash';
import {buyBookIdChanged} from "../redux/reducer/shop";
import {claimRewardBookIdChanged, startReadBookIdChanged} from "../redux/reducer/profile";
import {blockUntilRepFulfilled, logAuto} from "./autoHelper";


export async function manageBooks(auto) {
    logAuto('start manage books');
    await maybeClaimBookReward(auto);
    auto.rootRoute();
    const isReadingBook = await maybeReadBook(auto);
    if (!isReadingBook) {
        const boughtBook = await maybeBuyBook(auto);
        if (boughtBook) {
            await maybeReadBook(auto);
        }
    }
    logAuto('end manage books');
    auto.rootRoute();
}

async function maybeClaimBookReward(auto) {
    logAuto('maybeClaimBookReward', 'go route /profile');
    auto.dispatch(push(PROFILE_ROUTE));
    logAuto('maybeClaimBookReward', 'blockUntilRepFulfilled', 'profileListBook');
    await blockUntilRepFulfilled(() => auto.redux.repository.profileListBook);
    const profileBooks = auto.redux.repository.profileListBook.value;
    const booksForClaimReward = profileBooks.filter(e => e.canClaimReward);
    if (_.isEmpty(booksForClaimReward)) {
        logAuto('maybeClaimBookReward', 'no books for reward', false);
        return false;
    }
    for (let i = 0; i < booksForClaimReward.length; i++) {
        const book = booksForClaimReward[i];
        auto.dispatch(claimRewardBookIdChanged(book.id));
        logAuto('maybeClaimBookReward', 'blockUntilRepFulfilled', 'profileClaimRewardBook');
        await blockUntilRepFulfilled(() => auto.redux.repository.profileClaimRewardBook);
    }
    logAuto('maybeClaimBookReward', 'claimed reward from', booksForClaimReward, true);
    return true;
}

async function maybeReadBook(auto) {
    logAuto('maybeReadBook', 'go route /profile');
    auto.dispatch(push(PROFILE_ROUTE));
    logAuto('maybeReadBook', 'blockUntilRepFulfilled', 'profileListBook');
    await blockUntilRepFulfilled(() => auto.redux.repository.profileListBook);
    const profileBooks = auto.redux.repository.profileListBook.value;
    logAuto('maybeReadBook', 'profile books', profileBooks);
    if (_.isEmpty(profileBooks)) {
        logAuto('maybeReadBook', 'no books => no read', false);
        return false;
    }
    if (isReading(auto)) {
        logAuto('maybeReadBook', 'already reading', true);
        return true;
    }
    auto.dispatch(startReadBookIdChanged(_.last(profileBooks).id));
    logAuto('maybeReadBook', 'blockUntilRepFulfilled', 'profileStartReadBook');
    await blockUntilRepFulfilled(() => auto.redux.repository.profileStartReadBook);
    const result = isRepValueCode1(auto.redux.repository.profileStartReadBook);
    logAuto('maybeReadBook', 'reading?', result);
    return result;
}

function isReading(auto) {
    return _.some(auto.redux.repository.profileListBook.value, 'isInProgress');
}

async function maybeBuyBook(auto) {
    logAuto('buyBook', 'go route /shop');
    auto.dispatch(push(SHOP_ROUTE));
    await blockUntilRepFulfilled(() => auto.redux.repository.shopListBook);
    const books = auto.redux.repository.shopListBook.value;
    const profile = auto.redux.profile.profile;
    const booksToBuy = books.filter(e => (e.canBuyByCrystal && e.crystalCost <= profile.crystal) || (e.canBuyByGold && e.goldCost <= profile.gold));
    logAuto('shopBooks', books, 'booksToBuy', booksToBuy);
    if (_.isEmpty(booksToBuy)) {
        logAuto('shopBooks', 'cant buy book', false);
        return false;
    }
    auto.dispatch(buyBookIdChanged(_.last(booksToBuy).id));
    await blockUntilRepFulfilled(() => auto.redux.repository.shopBuyBook);
    const result = isRepValueCode1(auto.redux.repository.shopBuyBook);
    logAuto('buyBook', 'bounght?', result);
    return result;
}

