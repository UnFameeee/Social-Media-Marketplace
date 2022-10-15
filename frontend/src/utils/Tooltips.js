export function randomUnique() {
    let nums = new Set();
    while (nums.size < 1) {
        nums.add(Math.floor(Math.random() * (99999999 - 1 + 1) + 1));
    }
    return [...nums];
}