let username = undefined // or null or `avinash`;
let displayName = username ?? `Guest`;

console.log(displayName); // Guest
// Explanation:
// The nullish coalescing operator (??) checks if the left-hand side is null or undefined.
// If it is, it returns the right-hand side value ("Guest").