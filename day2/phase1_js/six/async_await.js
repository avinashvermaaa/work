function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ name: "Avinash", age: 23 }), 1500);
  });
}

async function showUser() {
  try {
    const user = await getUser();
    console.log("User:", user);
  } catch (err) {
    console.error("Error:", err);
  }
}

showUser();



// Sequential   ( use when next one depends on the previous one )
const a1 = await getUser();     // waits for 1.5 sec
const b1 = await getUser();    // waits for another 1.5 sec

// Parallel     (use when tasks are independent)
const [a2, b2] = await Promise.all([getUser(), getUser()]);  // waits for 1.5 sec for both




async function runTest() {
  console.time("Sequential");
  const userA = await getUser("A");
  const userB = await getUser("B");
  console.log(userA, userB);
  console.timeEnd("Sequential");

  console.time("Parallel");
  const [userX, userY] = await Promise.all([getUser("X"), getUser("Y")]);
  console.log(userX, userY);
  console.timeEnd("Parallel");
}

runTest();
