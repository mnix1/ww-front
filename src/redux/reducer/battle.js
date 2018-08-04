import {
    BATTLE_STATUS_ACCEPTED_FRIEND,
    BATTLE_STATUS_INVITED_FRIEND,
    BATTLE_STATUS_REJECTED_FRIEND
} from "../../util/battleHelper";

export const CLEARED = 'battle/cleared';
export const TAG_CHANGED = 'battle/tag/changed';
export const STATUS_CHANGED = 'battle/status/changed';
export const BATTLE_INVITED = 'battle/invited';
export const BATTLE_CANCELLED = 'battle/invite-canceled';
export const BATTLE_REJECTED = 'battle/invite-rejected';
export const BATTLE_ACCEPTED = 'battle/invite-accepted';
export const BATTLE_IN_PROGRESS_CONTENT = 'battle/in-progress/content';

export const QUESTION_ID_ANSWER_ID_MAP_CHANGED = 'battle/question-id-answer-id-map/changed';
export const QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED = 'battle/question-id-skip-animation-map/changed';

// export const BATTLE_IN_PROGRESS_OPPONENT = 'battle/in-progress/opponent';
// export const BATTLE_IN_PROGRESS_QUESTION = 'battle/in-progress/question';

const initialState = {
    tag: undefined,
    status: undefined,
    invitedBy: undefined,
    content: undefined,
    questionIdAnswerIdMap: {},
    questionIdSkipAnimationMap: {},
    // opponent: undefined,
    // question: undefined,
    // score: undefined,
    // opponentScore: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case TAG_CHANGED:
            return {...state, tag: action.tag};
        case STATUS_CHANGED:
            return {...state, status: action.status};
        case BATTLE_INVITED:
            return {...state, invitedBy: action.invitedBy, status: BATTLE_STATUS_INVITED_FRIEND};
        case BATTLE_CANCELLED:
            return {...state, invitedBy: undefined, status: undefined};
        case BATTLE_REJECTED:
            return {...state, status: BATTLE_STATUS_REJECTED_FRIEND};
        case BATTLE_ACCEPTED:
            return {...state, status: BATTLE_STATUS_ACCEPTED_FRIEND};
        case BATTLE_IN_PROGRESS_CONTENT:
            return {...state, content: {...state.content, ...action.content}};
        case QUESTION_ID_ANSWER_ID_MAP_CHANGED:
            return {...state, questionIdAnswerIdMap: action.questionIdAnswerIdMap};
        case QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED:
            return {...state, questionIdSkipAnimationMap: action.questionIdSkipAnimationMap};
        // case BATTLE_IN_PROGRESS_OPPONENT:
        // return {...state, opponent: action.opponent};
        // case BATTLE_IN_PROGRESS_QUESTION:
        //     return {...state, question: action.question};
        default:
            return state
    }
}

export function battleCleared() {
    return {type: CLEARED};
}

export function tagChanged(tag) {
    return {type: TAG_CHANGED, tag};
}

export function statusChanged(status) {
    return {type: STATUS_CHANGED, status};
}

export function battleInvited(invitedBy) {
    return {type: BATTLE_INVITED, invitedBy};
}

export function battleInviteCancelled() {
    return {type: BATTLE_CANCELLED};
}

export function battleInviteRejected() {
    return {type: BATTLE_REJECTED};
}

export function battleInviteAccepted() {
    return {type: BATTLE_ACCEPTED};
}

export function battleInProgressContent(content) {
    return {type: BATTLE_IN_PROGRESS_CONTENT, content};
}

// export function battleInProgressOpponent(opponent) {
//     return {type: BATTLE_IN_PROGRESS_OPPONENT, opponent};
// }
//
// export function battleInProgressQuestion(question) {
//     return {type: BATTLE_IN_PROGRESS_QUESTION, question};
// }

export function questionIdAnswerIdMapChanged(questionIdAnswerIdMap) {
    return {type: QUESTION_ID_ANSWER_ID_MAP_CHANGED, questionIdAnswerIdMap};
}

export function questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap) {
    return {type: QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED, questionIdSkipAnimationMap};
}
