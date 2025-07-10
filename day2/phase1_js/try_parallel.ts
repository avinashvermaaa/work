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
  
  console.log('Main start');
  const p1 = wait5();
  const p2 = wait10();
  await p1;
  await p2;
  console.log('Main end');
  
  console.timeEnd("user");
  
}

console.time("user");
main();
