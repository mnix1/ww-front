import {
    RIVAL_STATUS_ACCEPTED_FRIEND,
    RIVAL_STATUS_IN_PROGRESS,
    RIVAL_STATUS_INVITED_FRIEND,
    RIVAL_STATUS_REJECTED_FRIEND,
    RIVAL_STATUS_START_RANDOM_OPPONENT
} from "../../util/rivalHelper";
import {clearRivalStartRandomOpponentFetch} from "../../content/rival/fetch/RivalStartRandomOpponentFetch";

export const CLEARED = 'rival/cleared';
export const TAG_CHANGED = 'rival/tag/changed';
export const RIVAL_TYPE_CHANGED = 'rival/type/changed';
export const RIVAL_IMPORTANCE_CHANGED = 'rival/importance/changed';
export const STATUS_CHANGED = 'rival/status/changed';
export const RIVAL_INVITED = 'rival/invited';
export const RIVAL_CANCELLED = 'rival/invite-canceled';
export const RIVAL_REJECTED = 'rival/invite-rejected';
export const RIVAL_ACCEPTED = 'rival/invite-accepted';

export const RIVAL_IN_PROGRESS_CONTENT = 'rival/in-progress/content';
export const QUESTION_ID_ANSWER_ID_MAP_CHANGED = 'rival/question-id-answer-id-map/changed';
export const QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED = 'rival/question-id-skip-animation-map/changed';

const initialState = {
    tag: undefined,
    rivalType: undefined,
    rivalImportance: undefined,
    status: undefined,
    invitedBy: undefined,
    content: undefined,
    questionIdAnswerIdMap: {},
    questionIdSkipAnimationMap: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case TAG_CHANGED:
            return {...state, tag: action.tag};
        case RIVAL_TYPE_CHANGED:
            return {...state, rivalType: action.rivalType};
        case RIVAL_IMPORTANCE_CHANGED:
            return {...state, rivalImportance: action.rivalImportance};
        case STATUS_CHANGED:
            return {...state, status: action.status};
        case RIVAL_INVITED:
            return {...state, invitedBy: action.invitedBy, status: RIVAL_STATUS_INVITED_FRIEND};
        case RIVAL_CANCELLED:
            return {...state, invitedBy: undefined, status: undefined};
        case RIVAL_REJECTED:
            return {...state, status: RIVAL_STATUS_REJECTED_FRIEND};
        case RIVAL_ACCEPTED:
            return {...state, status: RIVAL_STATUS_ACCEPTED_FRIEND};
        case RIVAL_IN_PROGRESS_CONTENT:
            return {...state, content: {...state.content, ...action.content}, status: RIVAL_STATUS_IN_PROGRESS};
        case QUESTION_ID_ANSWER_ID_MAP_CHANGED:
            return {...state, questionIdAnswerIdMap: action.questionIdAnswerIdMap};
        case QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED:
            return {...state, questionIdSkipAnimationMap: action.questionIdSkipAnimationMap};
        default:
            return state
    }
}

export function rivalCleared() {
    return {type: CLEARED};
}

export function tagChanged(tag) {
    return {type: TAG_CHANGED, tag};
}

export function rivalTypeChanged(rivalType) {
    return {type: RIVAL_TYPE_CHANGED, rivalType};
}

export function rivalImportanceChanged(rivalImportance) {
    return {type: RIVAL_IMPORTANCE_CHANGED, rivalImportance};
}

export function statusChanged(status) {
    return {type: STATUS_CHANGED, status};
}

export function rivalInvited(invitedBy) {
    return {type: RIVAL_INVITED, invitedBy};
}

export function rivalInviteCancelled() {
    return {type: RIVAL_CANCELLED};
}

export function rivalInviteRejected() {
    return {type: RIVAL_REJECTED};
}

export function rivalInviteAccepted() {
    return {type: RIVAL_ACCEPTED};
}

export function rivalInProgressContent(content) {
    return {type: RIVAL_IN_PROGRESS_CONTENT, content};
}

export function questionIdAnswerIdMapChanged(questionIdAnswerIdMap) {
    return {type: QUESTION_ID_ANSWER_ID_MAP_CHANGED, questionIdAnswerIdMap};
}

export function questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap) {
    return {type: QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED, questionIdSkipAnimationMap};
}

export function startRandomOpponent(dispatch, type, importance) {
    clearRivalStartRandomOpponentFetch(dispatch);
    dispatch(rivalCleared());
    dispatch(rivalTypeChanged(type));
    dispatch(rivalImportanceChanged(importance));
    dispatch(statusChanged(RIVAL_STATUS_START_RANDOM_OPPONENT));
}