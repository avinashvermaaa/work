let obj = 
{
    name : `avinash kumar`,
    age : 23,
    isStudent : false,
    company : `codeinsght`,
}

console.log(Object.entries(obj)); 
console.log(Object.keys(obj)); 
console.log(Object.values(obj));
// console.log(Object.keys(obj).length);

// console.log(Object.values(obj)[0]); 

obj.name = `new user`;
console.log(obj);

// accessing object properties
console.log(obj.name); // dot notation
console.log(obj['name']); // bracket notation {use when property name is dynamic or have spaces or special characters}

// adding new property to object
obj.email = `newuser@example.com`;
console.log(obj);



let user ={
  name : `avinash kumar`  ,
  age : 23,
  placed : `yes`,
  "local address" : `kharar, Mohali, Punjab`
}

console.log(`object :-${user}`);
console.log(Object.entries(user));
console.log(`object keys :- ${Object.keys(user)}`);
console.log(`object values:- ${Object.values(user)}`);

user.email = `avinash@gmail.com`;
// user.name = "new name";
console.log(user);
delete user.placed;
// after deleting values shifting to new index
// console.log(Object.keys(user)[2]); //

for(let id in user){
  console.log(`${id}:- ${user[id]}`);
}
Object.values(user).forEach((values)=>{
  console.log(`${values}`)
})


