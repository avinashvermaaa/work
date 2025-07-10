function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}


const nums = getFirstElement<number>([10, 20, 30]);   // number
const names = getFirstElement<string>(["Alice", "Bob"]); // string

console.log(nums);
console.log(names);

function output<T>(value: T): void {
  console.log(value);
}

output<string>("Hello");
output<number>(123);
