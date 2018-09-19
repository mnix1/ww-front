export const EXPERIMENT_COST = 100;

export function enoughResources(profile) {
    return profile.crystal >= EXPERIMENT_COST && profile.wisdom >= EXPERIMENT_COST && profile.elixir >= EXPERIMENT_COST;
}