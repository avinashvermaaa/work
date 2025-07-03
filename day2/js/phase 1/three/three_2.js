let even = [2,4,6,8,10];
let odd = [1,3,5,7,9];

console.log(`${even}`);

console.log(even[0]);

// modifying from backend
even.push(12);
console.log(even);
even.pop();
console.log(even);

// modifying from frontend
even.unshift(0);
console.log(even);
even.shift();
console.log(even);

// check for includes and indexOf
console.log(even.includes(8));
console.log(even.indexOf(8));
// string to array conversion
const evens = even.join("-");
console.log(evens);

// reverse array
const rev_even = even;
even.reverse();
console.log(even);

even.reverse();
// slice {start from a index to b index} {default all array}
console.log(even.slice(2,3));

// splice   {start from a to n number} {default none}
console.log(even.splice(2,2));
console.log(even);

odd.forEach((item)=>{
  console.log(`${item}`,);
});

// item is index 
let result = "";
for(let index in odd){
  process.stdout.write(odd[index] + " ");
  // console.log(`${odd[index]}`);
  // or use trim method
  result += odd[index] + " ";
}
console.log();
console.log(result.trim());
console.log(typeof result);
console.log(typeof even); 

let array = {
    name : "avinsh kumar",
    age : 23
};
array = [1,2,3,4,5,6,7,8,9,10];
console.log(array);
console.log(typeof array);
console.log(Object.prototype.toString.call(even)); // internal class of the value [object Array]

console.log(Array.isArray(array));

// sorting array
let sh = [8,4,1,5,6];
sh.sort((a, b) => b - a); // descending order
console.log(sh);
sh.sort((a, b) => a - b); // ascending order
console.log(sh);