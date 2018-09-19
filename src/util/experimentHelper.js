export function experimentCost(profile, wisiesCount) {
    const experimentCostImpact = wisiesCount <= 5 ? 0 : (wisiesCount - 5) * 10;
    const crystal = 30 + experimentCostImpact;
    const wisdom = 20 + experimentCostImpact;
    const elixir = 10 + experimentCostImpact;
    return {
        isEnoughResource: profile.crystal >= crystal && profile.wisdom >= wisdom && profile.elixir >= elixir,
        crystal,
        wisdom,
        elixir
    }
}