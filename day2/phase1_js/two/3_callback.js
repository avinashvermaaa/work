// callback function
// a function passed as an argument

function greet(name,callback){
    console.log(`checkin as : ${name}`);
    callback();
}

function checkout() {
    console.log(`checkout!`);
}

checkout(); // simple callback of function
greet(`avinash`, checkout);

greet(`avinash`,checkout);