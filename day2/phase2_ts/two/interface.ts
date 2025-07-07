interface User {
  id: number;
  username: string;
  isAdmin?: boolean; // Optional property
}

let user1: User = { id: 1, username: "Avinash" };
console.log(user1);
console.log(user1.isAdmin);