
console.log("First");

setTimeout(() => {
  console.log("seven");
}, 0);
setTimeout(() => {
  console.log("Second");
}, 0);

Promise.resolve().then(() => {
  console.log("Third");
});

async function asyncFn() {
  console.log("Fourth");
  await null;
  console.log("Fifth");
  await null;
 setTimeout(() => {
  console.log("eight");
}, 0);
}

asyncFn();

console.log("Sixth");
console.log(`nine`);