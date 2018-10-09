export function calculateObjectDimension({dim, count = 2, max = 3000, min = 0}) {
    return Math.min(Math.max(dim / (count + 1), min), max);
}