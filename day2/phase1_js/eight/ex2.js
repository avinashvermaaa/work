async function async1() {
  console.log("1");
  await async2();
  console.log("2");
  setTimeout(() => console.log("7"), 0);
  
}

async function async2() {
  console.log("3");
  setTimeout(() => console.log("4"), 0);
}

console.log("5");
async1();
console.log("6");
  setTimeout(() => console.log("8"), 0);
console.log("9");
