import {
    WAR_STATUS_ACCEPTED_FRIEND,
    WAR_STATUS_IN_PROGRESS,
    WAR_STATUS_INVITED_FRIEND,
    WAR_STATUS_REJECTED_FRIEND
} from "../../util/warHelper";
import {CATEGORY_RANDOM} from "../../util/categoryHelper";
import {EXTREMELY_EASY} from "../../util/difficultyHelper";

export const CLEARED = 'war/cleared';
export const TAG_CHANGED = 'war/tag/changed';
export const STATUS_CHANGED = 'war/status/changed';
export const WAR_INVITED = 'war/invited';
export const WAR_CANCELLED = 'war/invite-canceled';
export const WAR_REJECTED = 'war/invite-rejected';
export const WAR_ACCEPTED = 'war/invite-accepted';
export const WAR_IN_PROGRESS_CONTENT = 'war/in-progress/content';

export const QUESTION_ID_ANSWER_ID_MAP_CHANGED = 'war/question-id-answer-id-map/changed';
export const QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED = 'war/question-id-skip-animation-map/changed';

export const DIFFICULT_LEVEL_CHANGED = 'war/difficult-level/changed';
export const CATEGORY_CHANGED = 'war/category/changed';

export const SHOW_OPTIONS_CHANGED = 'war/show-options/changed';

const initialState = {
    tag: undefined,
    status: undefined,
    invitedBy: undefined,
    content: undefined,
    difficultyLevel: EXTREMELY_EASY,
    category: CATEGORY_RANDOM,
    questionIdAnswerIdMap: {},
    questionIdSkipAnimationMap: {},
    showOptions: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CLEARED:
            return {...state, ...initialState};
        case TAG_CHANGED:
            return {...state, tag: action.tag};
        case STATUS_CHANGED:
            return {...state, status: action.status};
        case WAR_INVITED:
            return {...state, invitedBy: action.invitedBy, status: WAR_STATUS_INVITED_FRIEND};
        case WAR_CANCELLED:
            return {...state, invitedBy: undefined, status: undefined};
        case WAR_REJECTED:
            return {...state, status: WAR_STATUS_REJECTED_FRIEND};
        case WAR_ACCEPTED:
            return {...state, status: WAR_STATUS_ACCEPTED_FRIEND};
        case WAR_IN_PROGRESS_CONTENT:
            return {...state, content: {...state.content, ...action.content}, status: WAR_STATUS_IN_PROGRESS};
        case QUESTION_ID_ANSWER_ID_MAP_CHANGED:
            return {...state, questionIdAnswerIdMap: action.questionIdAnswerIdMap};
        case QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED:
            return {...state, questionIdSkipAnimationMap: action.questionIdSkipAnimationMap};
        case DIFFICULT_LEVEL_CHANGED:
            return {...state, difficultyLevel: action.difficultyLevel};
        case CATEGORY_CHANGED:
            return {...state, category: action.category};
        case SHOW_OPTIONS_CHANGED:
            return {...state, showOptions: action.showOptions};
        default:
            return state
    }
}

export function warCleared() {
    return {type: CLEARED};
}

export function tagChanged(tag) {
    return {type: TAG_CHANGED, tag};
}

export function statusChanged(status) {
    return {type: STATUS_CHANGED, status};
}

export function warInvited(invitedBy) {
    return {type: WAR_INVITED, invitedBy};
}

export function warInviteCancelled() {
    return {type: WAR_CANCELLED};
}

export function warInviteRejected() {
    return {type: WAR_REJECTED};
}

export function warInviteAccepted() {
    return {type: WAR_ACCEPTED};
}

export function warInProgressContent(content) {
    return {type: WAR_IN_PROGRESS_CONTENT, content};
}

// export function warInProgressOpponent(opponent) {
//     return {type: WAR_IN_PROGRESS_OPPONENT, opponent};
// }
//
// export function warInProgressQuestion(question) {
//     return {type: WAR_IN_PROGRESS_QUESTION, question};
// }

export function questionIdAnswerIdMapChanged(questionIdAnswerIdMap) {
    return {type: QUESTION_ID_ANSWER_ID_MAP_CHANGED, questionIdAnswerIdMap};
}

export function questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap) {
    return {type: QUESTION_ID_SKIP_ANIMATION_MAP_CHANGED, questionIdSkipAnimationMap};
}

export function difficultLevelChanged(difficultyLevel) {
    return {type: DIFFICULT_LEVEL_CHANGED, difficultyLevel};
}

export function categoryChanged(category) {
    return {type: CATEGORY_CHANGED, category};
}

export function showOptionsChanged(showOptions) {
    return {type: SHOW_OPTIONS_CHANGED, showOptions};
}
