function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait5() {
  console.log('Start wait5');
  console.time("wait5");
  await wait(5000);
  console.timeEnd("wait5");
  console.log('End wait5');
}

async function wait10() {
  
  console.log('Start wait10');
  console.time("wait10");
  await wait(10000);
  console.timeEnd("wait10");

  console.log('End wait10');
}

async function main() {
  console.time("user");
  
  console.log('Main start');
   await wait10();
   wait5();
  console.log('Main end');
  
  console.timeEnd("user");
  
}

main();
console.log("asd")