// spread is used to expand array and objects
let nums =  [1, 2, 3, 4, 5];
let new_nums = [...nums, 6, 7, 8];
console.log(new_nums); 


// rest operator is used to collect remaining elements into an array
function sum(...args) {
    return args.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3,4,5,6)); // 21