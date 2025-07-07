const fakeDb ={
  1 : { name : `avinash`, age : 23 },
  2 : { name : `vriddhi`, age : 22 },
  3 : { name : `diksha`, age : 23 }
};

console.log(`${fakeDb[1]?.name}`);
const fetchUserId = (id)=>{
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
        console.time("user");
        if(fakeDb[id]){
            resolve(`User found: ${fakeDb[id].name}, Age : ${fakeDb[id].age}`);
        }
        else{
            reject(`User with : ${id} notfound`);
        }   
        console.timeEnd("user");
    },1000);
  
  });
};

fetchUserId(1)
.then((data) =>{
  console.log(`${data}`);
})
.catch((error)=>{
  console.error(`${error}`);
})

fetchUserId(2)
.then((data) =>{
  console.log(`${data}`);
})
.catch((error)=>{
  console.error(`${error}`);
})

async function getUserInfo(id) {
    try {
      const result = await fetchUserId(id);
        console.log(`${result}`);
    } catch (error) {
        console.log(`${error}`);
    }
};

getUserInfo(3);
getUserInfo(5);



