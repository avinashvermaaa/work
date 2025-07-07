//  1. Variable with type string
let myName: string = "Avinash";
console.log("Name:", myName);

//  2. Array of numbers
let marks: number[] = [90, 85, 78];
console.log("Total subjects:", marks.length);

//  3. Tuple representing a car: [brand, year]
let car: [string, number] = ["Toyota", 2022];
console.log(`Car Brand: ${car[0]}, Year: ${car[1]}`);

//  4. Enum of roles
enum Role {
  Admin,
  User,
  Guest
}

let currentRole: Role = Role.User;
console.log("Current Role:", Role[currentRole]); // Output: User

//  5. Using unknown type safely
let inputValue: unknown = "TypeScript is cool!";

if (typeof inputValue === "string") {
  console.log("Uppercased:", inputValue.toUpperCase());
} else {
  console.log("Value is not a string.");
}
