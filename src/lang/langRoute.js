import React from 'react';
import {
    BATTLE_FAST_ROUTE,
    BATTLE_ROUTE,
    CHALLENGE_FAST_ROUTE,
    CHALLENGE_HISTORY_ROUTE,
    CHALLENGE_LIST_ROUTE,
    FRIEND_ROUTE,
    HISTORY_ROUTE,
    PLAY_ROUTE,
    PROFILE_ROUTE,
    SHOP_ROUTE,
    TRAINING_ROUTE, WAR_FAST_ROUTE,
    WISIES_ROUTE
} from "../content/routes";
import {ENGLISH, POLISH} from "./langText";

export function getRouteLabel(id) {
    return ROUTE_LABELS[window.activeLang][id];
}

const ROUTE_LABELS = {
    [POLISH]: {
        [PLAY_ROUTE]: 'Graj',
        [BATTLE_ROUTE]: 'Bitwa',
        [TRAINING_ROUTE]: 'Trening',
        [HISTORY_ROUTE]: 'Historia',
        [SHOP_ROUTE]: 'Sklep',
        [WISIES_ROUTE]: 'Wiedzaki',
        [FRIEND_ROUTE]: 'Znajomi',
        [PROFILE_ROUTE]: 'Profil',
        [BATTLE_FAST_ROUTE]: <span>Szybka<br/>bitwa</span>,
        [WAR_FAST_ROUTE]: <span>Szybka<br/>wojna</span>,
        [CHALLENGE_FAST_ROUTE]: <span>Szybkie<br/>wyzwanie</span>,
        [CHALLENGE_LIST_ROUTE]: <span>Aktywne<br/>wyzwania</span>,
        [CHALLENGE_HISTORY_ROUTE]: <span>Historia<br/>wyzwań</span>,
    },
    [ENGLISH]: {
        [PLAY_ROUTE]: 'Play',
        [BATTLE_ROUTE]: 'Battle',
        [TRAINING_ROUTE]: 'Training',
        [HISTORY_ROUTE]: 'History',
        [SHOP_ROUTE]: 'Shop',
        [WISIES_ROUTE]: 'Wisies',
        [FRIEND_ROUTE]: 'Friends',
        [PROFILE_ROUTE]: 'Profile',
        [BATTLE_FAST_ROUTE]: <span>Fast<br/>battle</span>,
        [WAR_FAST_ROUTE]: <span>Fast<br/>war</span>,
        [CHALLENGE_FAST_ROUTE]: <span>Fast<br/>challenge</span>,
        [CHALLENGE_LIST_ROUTE]: <span>Active<br/>challenge</span>,
        [CHALLENGE_HISTORY_ROUTE]: <span>Challenge<br/>history</span>,
    }
};