export const READ_ID_CHANGED = 'mail/read-id/changed';
export const DELETE_ID_CHANGED = 'mail/delete-id/changed';
export const CLAIM_REWARD_ID_CHANGED = 'mail/claim-reward-id/changed';

const initialState = {
    claimRewardId: undefined,
    readId: undefined,
    deleteId: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case READ_ID_CHANGED:
            return {...state, readId: action.readId};
        case CLAIM_REWARD_ID_CHANGED:
            return {...state, claimRewardId: action.claimRewardId};
        case DELETE_ID_CHANGED:
            return {...state, deleteId: action.deleteId};
        default:
            return state
    }
}


export const readIdChanged = (readId) => {
    return {type: READ_ID_CHANGED, readId}
};

export const claimRewardIdChanged = (claimRewardId) => {
    return {type: CLAIM_REWARD_ID_CHANGED, claimRewardId}
};

export const deleteIdChanged = (deleteId) => {
    return {type: DELETE_ID_CHANGED, deleteId}
};
