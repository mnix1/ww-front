const firstLevelNextLevelExperience = 5;

export function getNextLevelExperience(level) {
    return firstLevelNextLevelExperience * Math.pow(2, level - 1);
}