import {
    TEXT_INVITE_TO_BATTLE,
    TEXT_INVITE_TO_WAR,
    TEXT_INVITED_TO_BATTLE_BY,
    TEXT_INVITED_TO_WAR_BY
} from "../lang/langText";

export const RIVAL_STATUS_WAITING_FRIEND = 'WAITING_FRIEND';
export const RIVAL_STATUS_START_FRIEND = 'START_FRIEND';
export const RIVAL_STATUS_CANCELED_FRIEND = 'CANCELED_FRIEND';
export const RIVAL_STATUS_ACCEPTED_FRIEND = 'ACCEPTED_FRIEND';
export const RIVAL_STATUS_REJECTED_FRIEND = 'REJECTED_FRIEND';
export const RIVAL_STATUS_READY_TO_BEGIN_FRIEND = 'READY_TO_BEGIN_FRIEND';
export const RIVAL_STATUS_ERROR_FRIEND = 'ERROR_FRIEND';
export const RIVAL_STATUS_INVITED_FRIEND = 'INVITED_FRIEND';

export const RIVAL_STATUS_WAITING_RANDOM_OPPONENT = 'WAITING_RANDOM_OPPONENT';
export const RIVAL_STATUS_START_RANDOM_OPPONENT = 'START_RANDOM_OPPONENT';
export const RIVAL_STATUS_CANCELED_RANDOM_OPPONENT = 'CANCELED_RANDOM_OPPONENT';
export const RIVAL_STATUS_ERROR_RANDOM_OPPONENT = 'ERROR_RANDOM_OPPONENT';
export const RIVAL_STATUS_IN_PROGRESS = 'IN_PROGRESS';
export const RIVAL_STATUS_CLOSED = 'CLOSED';

export const RIVAL_TYPE_BATTLE = 'BATTLE';
export const RIVAL_TYPE_WAR = 'WAR';
export const RIVAL_TYPE_CAMPAIGN = 'CAMPAIGN';

export const RIVAL_IMPORTANCE_FAST = 'FAST';
export const RIVAL_IMPORTANCE_RANKING = 'RANKING';

export const RIVAL_TYPE_INVITE_TEXT = {
    [RIVAL_TYPE_BATTLE]: TEXT_INVITE_TO_BATTLE,
    [RIVAL_TYPE_WAR]: TEXT_INVITE_TO_WAR,
};
export const RIVAL_TYPE_INVITED_TO_BY_TEXT = {
    [RIVAL_TYPE_BATTLE]: TEXT_INVITED_TO_BATTLE_BY,
    [RIVAL_TYPE_WAR]: TEXT_INVITED_TO_WAR_BY,
};

export function renderBattleElo({importance, type}) {
    return importance === RIVAL_IMPORTANCE_RANKING && type === RIVAL_TYPE_BATTLE;
}

export function renderWarElo({importance, type}) {
    return importance === RIVAL_IMPORTANCE_RANKING && type === RIVAL_TYPE_WAR;
}

export function getElo(profile, type) {
    return profile[getEloProp(type)];
}

export function getEloProp(type) {
    if (type === RIVAL_TYPE_BATTLE) {
        return 'battleElo';
    } else if (type === RIVAL_TYPE_WAR) {
        return 'warElo';
    }
}

export function isRanking({importance}){
    return importance === RIVAL_IMPORTANCE_RANKING;
}