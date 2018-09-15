import React from 'react';
import {blockUntilRepFulfilled, logBot} from "./botHelper";
import {push} from 'connected-react-router'
import _ from 'lodash';
import {WISIES_ROUTE} from "../content/routes";
import {upgradePropsChanged, wisieDetailsChanged} from "../redux/reducer/wisie";
import {WISIE_ATTRIBUTES} from "../util/wisieAttributeHelper";
import {isRepValueCode1} from "../util/repositoryHelper";

function getWisdom(bot) {
    return bot.redux.profile.profile.wisdom;
}

export async function manageWisies(bot) {
    logBot('start manage wisies');
    const wisdom = getWisdom(bot);
    if (wisdom <= 1) {
        logBot('manageWisies', 'wisdom <= 1', false);
        return false;
    }
    bot.dispatch(push(WISIES_ROUTE));
    logBot('manageWisies', 'blockUntilRepFulfilled', 'profileWisieList');
    await blockUntilRepFulfilled(() => bot.redux.repository.profileWisieList);
    const teamWisies = bot.redux.repository.profileWisieList.value.filter(e => e.inTeam);
    while (getWisdom(bot) >= 2) {
        const wisie = _.shuffle(teamWisies)[0];
        await upgradeWisie(bot, wisie);
    }

    logBot('end manage wisies');
}


async function upgradeWisie(bot, wisie) {
    logBot('upgradeWisie', 'wisdom', getWisdom(bot), wisie);
    bot.dispatch(wisieDetailsChanged(wisie));
    bot.dispatch(upgradePropsChanged({id: wisie.id, attribute: _.shuffle(WISIE_ATTRIBUTES)[0]}));
    logBot('upgradeWisie', 'blockUntilRepFulfilled', 'profileWisieList');
    await blockUntilRepFulfilled(() => bot.redux.repository.wisieUpgrade);
    const result = isRepValueCode1(bot.redux.repository.wisieUpgrade);
    logBot('upgradeWisie', 'upgraded?', result);
    return result;
}
