async function first() {
  console.log("1");
  await second();
  console.log("2");
  setTimeout(() => {
    console.log("3");
  }, 0);
}

async function second() {
  console.log("4");
  setTimeout(() => {
    console.log("5");
  }, 0);
}

console.log("6");
setTimeout(() => {
  console.log("7");
}, 0);
first();
console.log("8");
