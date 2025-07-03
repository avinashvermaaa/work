let username = undefined //`avinash`;
let displayName = username ?? "Guest";

console.log(displayName); // avinash
// Explanation:
// The nullish coalescing operator (??) checks if the left-hand side is null or undefined.
// If it is, it returns the right-hand side value ("Guest").