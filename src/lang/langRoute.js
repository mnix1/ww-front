import React from 'react';
import {
    BATTLE_FAST_ROUTE,
    BATTLE_ROUTE,
    CHALLENGE_FAST_ROUTE,
    CHALLENGE_HISTORY_ROUTE,
    CHALLENGE_LIST_ROUTE,
    FRIEND_ROUTE,
    HISTORY_ROUTE, PLAY_BATTLE_ROUTE, PLAY_CHALLENGE_ROUTE,
    PLAY_ROUTE, PLAY_WAR_ROUTE,
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
        [PLAY_WAR_ROUTE]: 'Wojna',
        [PLAY_BATTLE_ROUTE]: 'Bitwa',
        [PLAY_CHALLENGE_ROUTE]: 'Wyzwanie',
        [BATTLE_ROUTE]: 'Bitwa',
        [TRAINING_ROUTE]: 'Trening',
        [HISTORY_ROUTE]: 'Historia',
        [SHOP_ROUTE]: 'Sklep',
        [WISIES_ROUTE]: 'Wiedzaki',
        [FRIEND_ROUTE]: 'Znajomi',
        [PROFILE_ROUTE]: 'Profil',
        [BATTLE_FAST_ROUTE]: <span>Losowy<br/>przeciwnik</span>,
        [WAR_FAST_ROUTE]: <span>Losowy<br/>przeciwnik</span>,
        [CHALLENGE_FAST_ROUTE]: <span>Losowy<br/>przeciwnik</span>,
        [CHALLENGE_LIST_ROUTE]: <span>Aktywne<br/>wyzwania</span>,
        [CHALLENGE_HISTORY_ROUTE]: <span>Historia<br/>wyzwań</span>,
    },
    [ENGLISH]: {
        [PLAY_ROUTE]: 'Play',
        [PLAY_WAR_ROUTE]: 'War',
        [PLAY_BATTLE_ROUTE]: 'Battle',
        [PLAY_CHALLENGE_ROUTE]: 'Challenge',
        [BATTLE_ROUTE]: 'Battle',
        [TRAINING_ROUTE]: 'Training',
        [HISTORY_ROUTE]: 'History',
        [SHOP_ROUTE]: 'Shop',
        [WISIES_ROUTE]: 'Wisies',
        [FRIEND_ROUTE]: 'Friends',
        [PROFILE_ROUTE]: 'Profile',
        [BATTLE_FAST_ROUTE]: <span>Random<br/>opponent</span>,
        [WAR_FAST_ROUTE]: <span>Random<br/>opponent</span>,
        [CHALLENGE_FAST_ROUTE]: <span>Random<br/>opponent</span>,
        [CHALLENGE_LIST_ROUTE]: <span>Active<br/>challenge</span>,
        [CHALLENGE_HISTORY_ROUTE]: <span>Challenge<br/>history</span>,
    }
};