import React from 'react';
import {logBot} from "./botHelper";
import {push} from 'connected-react-router'
import {WAR_RANKING_ROUTE} from "../content/routes";
import {
    RIVAL_CONTENT_STATUS_ANSWERING, RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER,
    RIVAL_IMPORTANCE_RANKING,
    RIVAL_STATUS_IN_PROGRESS,
    RIVAL_TYPE_WAR
} from "../util/rivalHelper";
import {startRandomOpponent} from "../redux/reducer/rival";

function getStatus(bot) {
    return bot.redux.rival.status;
}

export async function manageWar(bot) {
    logBot('start manage war');
    bot.communication.onMessageEvent = (id, content) => {
        console.log(id, content);
        if (id === RIVAL_CONTENT_STATUS_ANSWERING) {

        } else if (id === RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER) {

        }
    };
    if (getStatus(bot) !== RIVAL_STATUS_IN_PROGRESS) {
        initWar(bot);
    }
    // logBot('manageWisies', 'blockUntilRepFulfilled', 'profileWisieList');
    // await blockUntilRepFulfilled(() => bot.redux.repository.profileWisieList);
    // logBot('end manage wisies');
}

function initWar(bot) {
    logBot('initWar');
    startRandomOpponent(bot.dispatch, RIVAL_TYPE_WAR, RIVAL_IMPORTANCE_RANKING);
    bot.dispatch(push(WAR_RANKING_ROUTE));
}
