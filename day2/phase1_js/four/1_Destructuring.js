// destructuring is a pass by value process / technique
// array destructuring
let arr = [1,2,3,4,5];
let [a,b,c] = arr;
a = 6;
console.log(a, b, c); 
console.log(arr);

// object destruturing
let obj = {
    name: "Avinash",
    age: 23,
    isStudent: false
};
let {name, age} = obj;
console.log(name, age);

let{isStudent : status} = obj;
status = true;
console.log(status); 
console.log(obj);               //  original object remains unchanged 