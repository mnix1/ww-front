export const WISIE_WISDOM_UPGRADE_COST = 1;
export const WISIE_MENTAL_UPGRADE_COST = 2;

export const RESOURCE_GOLD = 'GOLD';
export const RESOURCE_CRYSTAL = 'CRYSTAL';
export const RESOURCE_WISDOM = 'WISDOM';
export const RESOURCE_ELIXIR = 'ELIXIR';

export function wisieChangeHobbyCost(profile, wisie) {
    const hobbiesCount = wisie.hobbies.length;
    const crystal = hobbiesCount * 20;
    const elixir = hobbiesCount * 10;
    return {
        isEnoughResource: profile.resources.crystal >= crystal && profile.resources.elixir >= elixir,
        crystal,
        elixir
    }
}

export function wisieChangeSkillCost(profile) {
    const crystal = 50;
    const elixir = 25;
    return {
        isEnoughResource: profile.resources.crystal >= crystal && profile.resources.elixir >= elixir,
        crystal,
        elixir
    }
}

export function challengeCost(profile, challenge) {
    return profile.resources.gold >= challenge.cost.gold
        && profile.resources.crystal >= challenge.cost.crystal
        && profile.resources.wisdom >= challenge.cost.wisdom
        && profile.resources.elixir >= challenge.cost.elixir;
}

export function experimentCost(profile, wisiesCount) {
    const experimentCostImpact = wisiesCount <= 5 ? 0 : (wisiesCount - 5) * 10;
    const crystal = 30 + experimentCostImpact;
    const wisdom = 20 + experimentCostImpact;
    const elixir = 10 + experimentCostImpact;
    return {
        isEnoughResource: profile.resources.crystal >= crystal && profile.resources.wisdom >= wisdom && profile.resources.elixir >= elixir,
        crystal,
        wisdom,
        elixir
    }
}