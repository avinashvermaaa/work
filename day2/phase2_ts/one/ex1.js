"use strict";
//  1. Variable with type string
let myName = "Avinash";
console.log("Name:", myName);
//  2. Array of numbers
let marks = [90, 85, 78];
console.log("Total subjects:", marks.length);
//  3. Tuple representing a car: [brand, year]
let car = ["Toyota", 2022];
console.log(`Car Brand: ${car[0]}, Year: ${car[1]}`);
//  4. Enum of roles
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["User"] = 1] = "User";
    Role[Role["Guest"] = 2] = "Guest";
})(Role || (Role = {}));
let currentRole = Role.User;
console.log("Current Role:", Role[currentRole]); // Output: User
//  5. Using unknown type safely
let inputValue = "TypeScript is cool!";
if (typeof inputValue === "string") {
    console.log("Uppercased:", inputValue.toUpperCase());
}
else {
    console.log("Value is not a string.");
}
