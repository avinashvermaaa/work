// js stores function call stack in memory and executes them in the order they are called
// LIFO

/*
call stack -> a() -> b()
microtask -> Promise
macrotask -> setTimeout

await (send everything to microtask queue)-> microtask queue sends event to the event loop
Event loop -> checks microtask queue first, then macrotask queue

after await use c/mi/ma structure inside mi. and ma.

*/
function a(){
    b();
}

function b(){
    console.log(`hi`);
}

// a();
// [global]
// [a]
// [b]

console.log("Start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

async function test() {
  console.log("Inside async");
  await null;
  console.log("After await");
}
test();

console.log("End");
