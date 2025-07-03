/*
 const ,let ,var 
 const & let are block scoped
 var is function scoped
 const cannot be reassigned
  let can be reassigned, var can be reassigned
*/

const constant = 3.14;
let name = "avinash";
var year = 2025;

console.log(constant);
console.log(name);
console.log(year);

console.log();
{
  const constant = 4.56;
  let name = "kumar";
  var year = 2024;

  console.log(constant);
  console.log(name);
}
console.log(year ,"->error due to js");


console.log(`${a}`);
let a = 5;