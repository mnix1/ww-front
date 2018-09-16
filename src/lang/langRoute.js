import React from 'react';
import {
    BATTLE_FAST_ROUTE, BATTLE_RANKING_ROUTE,
    BATTLE_ROUTE, CAMPAIGN_ROUTE, CAMPAIGN_WAR_ROUTE,
    CHALLENGE_HISTORY_ROUTE,
    CHALLENGE_LIST_ROUTE,
    FRIEND_ROUTE,
    HISTORY_ROUTE, PLAY_BATTLE_ROUTE, PLAY_CHALLENGE_ROUTE,
    PLAY_ROUTE, PLAY_WAR_ROUTE,
    PROFILE_ROUTE, CLASSIFICATION_WAR_ROUTE,
    SHOP_ROUTE,
    TRAINING_ROUTE, WAR_FAST_ROUTE, WAR_RANKING_ROUTE,
    WISIES_ROUTE, CLASSIFICATION_BATTLE_ROUTE
} from "../content/routes";
import {ENGLISH, POLISH} from "../redux/reducer/language";
import {getActiveLang} from "../index";

export function getRouteLabel(id) {
    return ROUTE_LABELS[getActiveLang()][id];
}

const ROUTE_LABELS = {
    [POLISH]: {
        [PLAY_ROUTE]: 'Graj',
        [PLAY_WAR_ROUTE]: 'Wojna',
        [PLAY_BATTLE_ROUTE]: 'Bitwa',
        [PLAY_CHALLENGE_ROUTE]: 'Wyzwanie',
        [BATTLE_ROUTE]: 'Bitwa',
        [TRAINING_ROUTE]: 'Trening',
        [CAMPAIGN_ROUTE]: 'Kampania',
        [CAMPAIGN_WAR_ROUTE]: 'Kampania',
        [HISTORY_ROUTE]: 'Historia',
        [SHOP_ROUTE]: 'Sklep',
        [WISIES_ROUTE]: 'Wiedzaki',
        [FRIEND_ROUTE]: 'Znajomi',
        [PROFILE_ROUTE]: 'Profil',
        [BATTLE_FAST_ROUTE]: <span>Szybka<br/>bitwa</span>,
        [BATTLE_RANKING_ROUTE]: <span>Bitwa<br/>rankingowa</span>,
        [WAR_FAST_ROUTE]: <span>Szybka<br/>wojna</span>,
        [WAR_RANKING_ROUTE]: <span>Wojna<br/>rankingowa</span>,
        [CHALLENGE_LIST_ROUTE]: <span>Aktywne<br/>wyzwania</span>,
        [CHALLENGE_HISTORY_ROUTE]: <span>Historia<br/>wyzwań</span>,
        [CLASSIFICATION_WAR_ROUTE]: 'Klasyfikacja',
        [CLASSIFICATION_BATTLE_ROUTE]: 'Klasyfikacja',
    },
    [ENGLISH]: {
        [PLAY_ROUTE]: 'Play',
        [PLAY_WAR_ROUTE]: 'War',
        [PLAY_BATTLE_ROUTE]: 'Battle',
        [PLAY_CHALLENGE_ROUTE]: 'Challenge',
        [BATTLE_ROUTE]: 'Battle',
        [TRAINING_ROUTE]: 'Training',
        [CAMPAIGN_ROUTE]: 'Campaign',
        [CAMPAIGN_WAR_ROUTE]: 'Campaign',
        [HISTORY_ROUTE]: 'History',
        [SHOP_ROUTE]: 'Shop',
        [WISIES_ROUTE]: 'Wisies',
        [FRIEND_ROUTE]: 'Friends',
        [PROFILE_ROUTE]: 'Profile',
        [BATTLE_FAST_ROUTE]: <span>Fast<br/>battle</span>,
        [BATTLE_RANKING_ROUTE]: <span>Ranking<br/>battle</span>,
        [WAR_FAST_ROUTE]: <span>Fast<br/>war</span>,
        [WAR_RANKING_ROUTE]: <span>Ranking<br/>war</span>,
        [CHALLENGE_LIST_ROUTE]: <span>Active<br/>challenge</span>,
        [CHALLENGE_HISTORY_ROUTE]: <span>Challenge<br/>history</span>,
        [CLASSIFICATION_WAR_ROUTE]: 'Classification',
        [CLASSIFICATION_BATTLE_ROUTE]: 'Classification',
    }
};