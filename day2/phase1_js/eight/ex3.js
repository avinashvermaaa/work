async function task1() {
  console.log("A");
  await task2();
  console.log("B");
  setTimeout(() => console.log("C"), 0);
}

async function task2() {
  console.log("D");
  setTimeout(() => console.log("E"), 0);
}

console.log("F");
task1();
console.log("G");
setTimeout(() => console.log("H"), 0);
console.log("I");
