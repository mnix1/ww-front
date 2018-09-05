const CAMPAIGN_INIT_CHANGED = 'campaign/init/changed';
const CAMPAIGN_TYPE_CHANGED = 'campaign/type/changed';
const CAMPAIGN_DESTINATION_CHANGED = 'campaign/destination/changed';

const initialState = {
    campaignInit: undefined,
    campaignType: undefined,
    campaignDestination: undefined,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CAMPAIGN_INIT_CHANGED:
            return {...state, campaignInit: action.campaignInit};
        case CAMPAIGN_TYPE_CHANGED:
            return {...state, campaignType: action.campaignType};
        case CAMPAIGN_DESTINATION_CHANGED:
            return {...state, campaignDestination: action.campaignDestination};
        default:
            return state
    }
}

export const campaignInitChanged = (campaignInit) => {
    return {type: CAMPAIGN_INIT_CHANGED, campaignInit}
};
export const campaignTypeChanged = (campaignType) => {
    return {type: CAMPAIGN_TYPE_CHANGED, campaignType}
};
export const campaignDestinationChanged = (campaignDestination) => {
    return {type: CAMPAIGN_DESTINATION_CHANGED, campaignDestination}
};
