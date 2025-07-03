// array for in loop
let even = [2,4,6,8,10];

// for(let index in even){
//     console.log(`${index}`);
// }

// array forEach loop

// even.forEach((item)=>{
//     console.log(`${item}`);
// })

console.log(Object.prototype.toString.call(even)); // [object Array]

let sq_even = even.map((item)=>{
   return item * item;
});
console.log(sq_even);

let names = [`Avinash`, `Kumar`];
let uppercased = names.map(name => name.toUpperCase());
// [`AVINASH`, `KUMAR`]

console.log(names);
console.log(uppercased);

let greater_even = even.filter((item)=>{
    return item > 5;
});
console.log(greater_even);

let sum = even.reduce((acc, num) => acc + num, 0);
console.log(sum);
let product = even.reduce((acc, num) => acc * num, 1);
console.log(product);

let max = even.find((item)=>{
    return item > 6;
});
console.log(max);
    
console.log(ans);

let books = [
  { title: `JS Basics`, price: 300 },
  { title: `React Guide`, price: 500 },
  { title: `Node Handbook`, price: 400 }
];

let book = books.filter((book)=>{
    return book.price > 400;
});

console.log(book);
