/*

primitive vs reference types
primitive types: number, string, boolean, null, undefined, symbol    (copy by value)
reference types: object, array, function                             (copy by reference)

*/
// primitive (pass by value)
let a = 10; 
let b = a; 
b = 20; 
console.log("a = ",a); 
console.log("b = ",b); 


// reference types (pass by reference) 
let obj1 = { name: "avinash" };
let obj2 = obj1;
obj2.name = "changed_to_sonu";
console.log("obj1.name = ",obj1.name);
console.log("obj2.name = ",obj2.name);