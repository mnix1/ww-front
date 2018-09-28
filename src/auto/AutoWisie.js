import {blockUntilRepFulfilled, logAuto} from "./autoHelper";
import {push} from 'connected-react-router'
import _ from 'lodash';
import {WISIES_ROUTE} from "../content/routes";
import {upgradePropsChanged, wisieDetailsChanged} from "../redux/reducer/wisie";
import {WISIE_ATTRIBUTES} from "../util/wisieAttributeHelper";
import {isRepValueCode1} from "../util/repositoryHelper";

function getWisdom(auto) {
    return auto.redux.profile.profile.wisdom;
}

export async function manageWisies(auto) {
    logAuto('start manage wisies');
    const wisdom = getWisdom(auto);
    if (wisdom <= 1) {
        logAuto('manageWisies', 'wisdom <= 1', false);
        return false;
    }
    auto.dispatch(push(WISIES_ROUTE));
    logAuto('manageWisies', 'blockUntilRepFulfilled', 'profileWisieList');
    await blockUntilRepFulfilled(() => auto.redux.repository.profileWisieList);
    const teamWisies = auto.redux.repository.profileWisieList.value.filter(e => e.inTeam);
    while (getWisdom(auto) >= 2) {
        const wisie = _.shuffle(teamWisies)[0];
        await upgradeWisie(auto, wisie);
    }

    logAuto('end manage wisies');
}


async function upgradeWisie(auto, wisie) {
    logAuto('upgradeWisie', 'wisdom', getWisdom(auto), wisie);
    auto.dispatch(wisieDetailsChanged(wisie));
    auto.dispatch(upgradePropsChanged({id: wisie.id, attribute: _.shuffle(WISIE_ATTRIBUTES)[0]}));
    logAuto('upgradeWisie', 'blockUntilRepFulfilled', 'profileWisieList');
    await blockUntilRepFulfilled(() => auto.redux.repository.wisieUpgradeAttribute);
    const result = isRepValueCode1(auto.redux.repository.wisieUpgradeAttribute);
    logAuto('upgradeWisie', 'upgraded?', result);
    return result;
}
